import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"

import {
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
} from "@material-ui/core"
import axios from "axios";
import {defaultErrors} from "../roles/AddRoleValidator";

const constProjects = [
    "Cat feeder",
    "Breathe with a better air",
    "Dating app",
    "Kollab project",
]

class InviteMemberModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            project: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            projects: this.props.projects,
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleInvite = (e) => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)
        formData.append("status", 'inviting')
        formData.append("user_id", this.props.targetUser.id)
        let project = this.state.projects.find(p => p.title === this.state.project)
        formData.append("project_id", project.id)

        const url = this.props.joinPath
        axios({
            method: "post",
            url: url,
            responseType: "json",
            headers: {
                Accept: "application/json",
            },
            data: formData,
        })
            .then((response) => {
                debugger
                if (response.status === 201)
                    alert('Request has been sent')
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    alert(`${error.response.data.message}`)
                } else {
                    alert(`Invitation fail: ${error.response.status} ${error.response.statusText}`)
                }

            })
            .finally(() => {
                this.setIsButtonLoading(false)
            })
    }


    setIsButtonLoading = (isLoading) => {
        this.setState({isButtonLoading: isLoading})
    }


    render() {
        const {targetUser} = this.props
        const {projects, project} = this.state
        return (
            <div className="d-flex flex-column">
                <div>
                    <Button
                        name="inviteMember"
                        className="button button--md"
                        type="button"
                        data-toggle="modal"
                        data-target="#inviteModal"
                    >
                        Invite to project
                    </Button>

                    <div
                        name="invite"
                        className="modal fade"
                        id="inviteModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="inviteModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="inviteModalLabel">
                                        {`Invite ${targetUser.first_name} to join a project`}
                                    </h5>
                                    <button
                                        type="button"
                                        className="button close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={this.clearExpertise}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body d-flex flex-column mx-2">
                                    {projects.length > 0 ? (
                                            <>
                                                <FormControl component="fieldset">
                                                    <h4>Owned Projects</h4>
                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="project"
                                                        value={project}
                                                        onChange={this.handleChange}
                                                    >
                                                        {projects.map((item, index) => (
                                                            <FormControlLabel
                                                                value={item.title}
                                                                control={<Radio color="default"/>}
                                                                label={item.title}
                                                                key={index}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>

                                                <div className="modal-footer justify-content-center">
                                                    <Button
                                                        name="invite"
                                                        type="button"
                                                        className="button button--lg button--gradient-primary"
                                                        data-dismiss="modal"
                                                        onClick={() => this.handleInvite()}
                                                    >
                                                        Invite
                                                    </Button>
                                                </div>
                                            </>
                                        ) :
                                        "You have no available project."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

InviteMemberModal.propTypes = {
    authenticityToken: PropTypes.string,
    targetUser: PropTypes.object,
    projects: PropTypes.array,
}
export default InviteMemberModal
