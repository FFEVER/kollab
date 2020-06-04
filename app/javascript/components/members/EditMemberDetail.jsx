import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import {
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
} from "@material-ui/core"
import Button from "../shared/form/Button"
import {FormValidator, defaultErrors} from "./EditMemberDetailValidator"

import mail from "../../images/icon/mail.png"
import phone from "../../images/icon/phone-call.png"
import facebook from "../../images/icon/facebook.png"
import github from "../../images/icon/github.png"
import medium from "../../images/icon/medium.png"
import linkedin from "../../images/icon/linkedin.png"
import instagram from "../../images/icon/instagram.png"

import anya from "../../images/anya.jpg"

const DATA_PREFIX = "member"

const dataName = (name) => {
    return DATA_PREFIX + "[" + name + "]"
}

const roleStatuses = ["Owner", "Member"]

class EditMemberDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            role: this.props.member.role ? this.props.member.role.title : "",
            contact: {},
            roleStatus: this.props.member.is_owner ? "Owner" : "Member",
            contacts: [],
            errors: defaultErrors,
            isButtonLoading: false,
            isRemoveButtonLoading: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    }

    componentDidMount() {
        const user = this.props.member.user
        let contacts = [
            {social: mail, name: user.email},
            {social: phone, name: user.phone},
            {social: facebook, name: user.facebook},
            {social: github, name: user.github},
            {social: instagram, name: user.instagram},
            {social: linkedin, name: user.linkedin},
            {social: medium, name: user.medium},
        ]

        this.setState({
            roles: this.props.allRoles,
            contacts: contacts,
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleDeleteMember = () => {
        if (confirm("Do you want to delete this member?")) {
            this.deleteMember()
        }
    }

    deleteMember = () => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)

        this.setIsRemoveButtonLoading(true)
        const url = this.props.member.links.destroy
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
    }


    handleSubmit(event) {
        event.preventDefault()
        this.setIsButtonLoading(true)

        FormValidator.validateAll(this.state)
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
            .finally(() => {
                this.setIsRemoveButtonLoading(false)
            })
    }

    createFormData() {
        let role_id = -1
        let {role, roles} = this.state
        if (role !== '') {
            role_id = roles.find((item) => item.title === role).id
        }

        const formData = new FormData()
        formData.append(dataName("role_id"), role_id)
        formData.append(
            dataName("is_owner"),
            this.state.roleStatus === "Owner" ? true : false
        )
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

    setIsButtonLoading(isLoading) {
        this.setState({isButtonLoading: isLoading})
    }

    setIsRemoveButtonLoading = (isLoading) => {
        this.setState({isRemoveButtonLoading: isLoading})
    }


    render() {
        const {role, roleStatus, roles, contacts, errors, isButtonLoading, isRemoveButtonLoading} = this.state
        const {createRolePath, currentUser, member} = this.props

        return (
            <div>
                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Status</h4>
                    </div>
                    <FormControl variant="outlined" size="small">
                        <Select
                            name="roleStatus"
                            value={roleStatus}
                            onChange={this.handleChange}
                            //   error={errors.faculty.length > 0 ? true : false}
                        >
                            <MenuItem value="">
                                <em>Select a project status</em>
                            </MenuItem>
                            {roleStatuses.map((status, key) => (
                                <MenuItem key={key} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormHelperText error={errors.roleStatus.length > 0 ? true : false}>
                        {errors.roleStatus[0]}
                    </FormHelperText>
                </div>

                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Role</h4>
                    </div>
                    <FormControl variant="outlined" size="small">
                        <Select
                            name="role"
                            value={role}
                            onChange={this.handleChange}
                            //   error={errors.faculty.length > 0 ? true : false}
                        >
                            <MenuItem value="">
                                <em>Select a member role</em>
                            </MenuItem>
                            {roles.map((role, key) => (
                                <MenuItem key={key} value={role.title}>
                                    {role.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <a href={createRolePath} className="link d-flex flex-column align-items-center">
                    Create new role
                </a>
                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Contact</h4>
                    </div>
                    {contacts.map((item, index) =>
                        item.name !== "" && item.name !== null ? (
                            <div
                                key={index}
                                className="setting__role__section setting__role__section__item"
                            >
                                <img src={item.social} height="20" width="20"/>
                                <p>{item.name}</p>
                            </div>
                        ) : (
                            <div key={index}/>
                        )
                    )}
                </div>

                <div className="setting__role__section setting__role__section__button ml-2 mr-2 mt-lg-3">
                    <Button
                        name="remove-button"
                        className="button button--lg button__decline setting__role__button mr-2 ml-auto"
                        isLoading={isRemoveButtonLoading}
                        onClick={this.handleDeleteMember}
                    >
                        {currentUser.id === member.user.id ? "Leave" : "Remove from project"}
                    </Button>
                    <Button
                        name="save-button"
                        className="button button--lg button__accept setting__role__button mr-auto"
                        isLoading={isButtonLoading}
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Save
                    </Button>
                </div>
            </div>
        )
    }
}

EditMemberDetail.propTypes = {
    authenticityToken: PropTypes.string,
    submitPath: PropTypes.string,
    currentUser: PropTypes.object,
    allRoles: PropTypes.array,
    createRolePath: PropTypes.string,
    member: PropTypes.object
}

export default EditMemberDetail
