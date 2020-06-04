import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
} from "@material-ui/core"
import Button from "../shared/form/Button"

import {EditRoleValidator, defaultErrors} from "./EditRoleValidator"
import {TagInput, tagsToArray, defaultStyles} from "../shared/form/TagInput"
import FormInput from "../shared/form/FormInput"

const DATA_PREFIX = "role"

const dataName = (name) => {
    return DATA_PREFIX + "[" + name + "]"
}

const tagStyles = {
    ...defaultStyles,
    control: (provided, state) => ({
        ...provided,
        minWidth: "100%",
        height: "56px",
        borderColor: "#c2c2c2",
        boxShadow: state.isFocused ? "0 0 3px #54bdc2" : "",
        cursor: "text",
        "&:hover": {
            borderColor: "#c2c2c2",
        },
        marginTop: "10px",
    }),
}

const tagErrorStyles = {
    ...defaultStyles,
    control: (provided, state) => ({
        ...provided,
        minWidth: "100%",
        height: "56px",
        borderColor: "red",
        boxShadow: state.isFocused ? "0 0 3px #ce7171" : "",
        cursor: "text",
        "&:hover": {
            borderColor: "red",
        },
        marginTop: "10px",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: "red",
    }),
}

const roleStatuses = ["Open", "Close"]

class EditRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.role.title,
            skills: [
                {label: "React", name: "react"},
                {label: "Developer", name: "Developer"},
            ],
            description: this.props.role.description,
            status: this.props.role.status,
            isButtonLoading: false,
            isRemoveButtonLoading: false,
            errors: defaultErrors,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSkillsChange = this.handleSkillsChange.bind(this)
        this.handleSkillsClear = this.handleSkillsClear.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    }

    componentDidMount() {
        this.setSkills(this.props.role.skill_list)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSkillsChange(value) {
        this.setState({
            skills: [...this.state.skills, ...value],
        })
    }

    setSkills = (skills) => {
        let list = []
        skills.map((item, key) => {
            let i = {label: item, value: item}
            list.push(i)
        })
        this.setState({skills: list})
    }


    handleSkillsClear(value) {
        this.setState({
            skills: value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setIsButtonLoading(true)

        EditRoleValidator.validateAll(this.state)
            .then((result) => {
                const formData = this.createFormData()
                this.submitForm(formData)
            })
            .catch((errors) => {
                this.setState({
                    errors: errors,
                })
                this.setIsButtonLoading(false)
            })
    }

    createFormData() {
        const formData = new FormData()
        formData.append(dataName("title"), this.state.name)

        formData.append(
            dataName("skill_list"),
            JSON.stringify(tagsToArray(this.state.skills))
        )

        formData.append(dataName("description"), this.state.description)
        formData.append(dataName("status"), this.state.status)

        formData.append("authenticity_token", this.props.authenticityToken)
        return formData
    }

    submitForm(formData) {
        const {submitPath} = this.props
        axios({
            method: "put",
            url: submitPath,
            responseType: "json",
            headers: {
                Accept: "application/json",
            },
            data: formData,
        })
            .then((response) => {
                if (response.status === 200)
                    window.location.href = response.headers.location
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    this.setState((state) => {
                        let error_messages = error.response.data.messages
                        let errors = defaultErrors
                        for (const [k, v] of Object.entries(error_messages)) {
                            errors[k] = v
                        }
                        return {
                            errors,
                        }
                    })
                }
            })
            .finally(() => {
                this.setIsButtonLoading(false)
            })
    }

    handleDeleteRole = () => {
        if (confirm("Do you want to delete this role?")) {
            this.deleteRole()
        }
    }

    deleteRole = () => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)

        this.setIsRemoveButtonLoading(true)
        const url = this.props.role.links.destroy
        axios({
            method: "delete",
            url: url,
            responseType: "json",
            headers: {
                Accept: "application/json",
            },
            data: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = response.headers.location
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    alert(error.response.data.message)
                } else {
                    alert(error.response.message)
                }
            })
            .finally(() => {
                this.setIsRemoveButtonLoading(false)
            })
    }


    setIsButtonLoading(isLoading) {
        this.setState({isButtonLoading: isLoading})
    }

    setIsRemoveButtonLoading = (isLoading) => {
        this.setState({isRemoveButtonLoading: isLoading})
    }

    render() {
        const {currentUser} = this.props
        const {
            name,
            skills,
            description,
            status,
            errors,
            isButtonLoading,
            isRemoveButtonLoading,
        } = this.state
        return (
            <form noValidate className="mb-5">
                <div className="setting__role__section">
                    <FormInput
                        id="name"
                        name="name"
                        label="Name"
                        placeholder="Role name"
                        type="text"
                        value={name}
                        className="form-control fix-height"
                        onChange={this.handleChange}
                        errors={errors.name}
                        isRequired={true}
                    />
                </div>

                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Skills *</h4>
                        <TagInput
                            className="mt-3"
                            value={skills}
                            onChange={this.handleSkillsClear}
                            onKeyDown={this.handleSkillsChange}
                            placeholder="Type your skill and press enter"
                            errors={errors.skills}
                            id="skills"
                            styles={tagStyles}
                            errorStyles={tagErrorStyles}
                        />
                    </div>
                </div>

                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Description</h4>
                    </div>
                    <TextField
                        name={"description"}
                        multiline
                        rows="4"
                        defaultValue={description}
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Status *</h4>
                    </div>
                    <FormControl variant="outlined" size="small">
                        <Select
                            name="status"
                            value={status}
                            onChange={this.handleChange}
                            //   error={errors.faculty.length > 0 ? true : false}
                        >
                            <MenuItem value="">
                                <em>Select a project status</em>
                            </MenuItem>
                            {roleStatuses.map((s, key) => (
                                <MenuItem key={key} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <FormHelperText error={errors.status.length > 0 ? true : false}>
            {errors.status[0]}
          </FormHelperText> */}
                </div>

                <div className="setting__role__section setting__role__section__button ml-2 mr-2 mt-lg-3">
                    <Button
                        name="remove-button"
                        className="button button--lg button__decline setting__role__button mr-2 ml-auto"
                        isLoading={isRemoveButtonLoading}
                        onClick={this.handleDeleteRole}
                    >
                        Remove
                    </Button>

                    <Button
                        name="save-button"
                        className="button button--lg button__accept setting__role__button mr-auto"
                        isLoading={isButtonLoading}
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Update Role
                    </Button>
                </div>

            </form>
        )
    }
}

EditRole.propTypes = {
    authenticityToken: PropTypes.string,
    submitPath: PropTypes.string,
    currentUser: PropTypes.object,
    role: PropTypes.object,
    project: PropTypes.object
}

export default EditRole
