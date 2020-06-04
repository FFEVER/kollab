import React from "react"
import PropTypes from "prop-types"

import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
} from "@material-ui/core"
import Button from "../shared/form/Button"

import {AddRoleValidator, defaultErrors} from "./AddRoleValidator"
import {TagInput, tagsToArray, defaultStyles} from "../shared/form/TagInput"
import FormInput from "../shared/form/FormInput"

import axios from "axios";

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

class AddRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            skills: [],
            description: "",
            status: "Open",
            isButtonLoading: false,
            errors: defaultErrors,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSkillsChange = this.handleSkillsChange.bind(this)
        this.handleSkillsClear = this.handleSkillsClear.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
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

    handleSkillsClear(value) {
        this.setState({
            skills: value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setIsButtonLoading(true)
        AddRoleValidator.validateAll(this.state)
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

    createFormData = () => {
        const formData = new FormData()
        formData.append(dataName("title"), this.state.name)

        formData.append(
            dataName("skill_list"),
            JSON.stringify(tagsToArray(this.state.skills))
        )

        formData.append(dataName("description"), this.state.description)
        formData.append(dataName("status"), this.state.status)
        formData.append(dataName("project_id"), this.props.project.id)

        formData.append("authenticity_token", this.props.authenticityToken)
        return formData
    }

    submitForm(formData) {
        const {submitPath} = this.props
        axios({
            method: "post",
            url: submitPath,
            responseType: "json",
            headers: {
                Accept: "application/json",
            },
            data: formData,
        })
            .then((response) => {
                if (response.status === 201)
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


    setIsButtonLoading(isLoading) {
        this.setState({isButtonLoading: isLoading})
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
        } = this.state
        return (
            <form onSubmit={this.handleSubmit} noValidate className="mb-5">
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
                <div className="setting__role__section">
                    <Button
                        type="submit"
                        name="submitButton"
                        isLoading={isButtonLoading}
                        className="button button--lg button--gradient-primary mt-3 ml-auto mr-auto"
                    >
                        Create a Role
                    </Button>
                </div>
            </form>
        )
    }
}

AddRole.propTypes = {
    authenticityToken: PropTypes.string,
    submitPath: PropTypes.string,
    user: PropTypes.object,
    project: PropTypes.object,
    role: PropTypes.object,
}

export default AddRole
