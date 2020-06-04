import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button";
import axios from "axios";
import {defaultErrors} from "./AddRoleValidator";

class RoleDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRequested: this.props.isRequested,
            isButtonLoading: false,
            joinRequest: this.props.joinRequest
        }
    }

    handleSubmit = (e) => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)

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
                if (response.status === 201)
                    this.setState({
                        isRequested: true,
                        joinRequest: response.data.join_request
                    })
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

    handleCancel = (e) => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)

        const url = this.state.joinRequest.links.destroy
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
                if (response.status === 200)
                    this.setState({isRequested: false})
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

    setIsButtonLoading = (isLoading) => {
        this.setState({isButtonLoading: isLoading})
    }


    render() {
        const {currentUser, role, isMember} = this.props
        const {
            isRequested,
            isButtonLoading
        } = this.state
        return (
            <div className="mb-5">
                <div className="setting__role__section ">
                    <h3>{role.title}</h3>
                </div>

                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Skills</h4>
                        <div className="d-flex flex-row">
                            {role.skill_list.map((item, index) => (
                                <div className="button--tags mt-1" key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="setting__role__section">
                    <div className="setting__role__title">
                        <h4>Description</h4>
                    </div>
                    <pre>
                        {role.description}
                    </pre>
                </div>

                <div className="setting__role__section ">
                    <div className=" d-flex flex-row, align-items-center">
                        <h4>Status:</h4>
                        <p
                            className="font-weight-bold ml-1"
                            style={{color: "#54bdc2", fontSize: "16.5px"}}
                        >
                            {role.status}
                        </p>
                    </div>
                </div>

                {isMember ? null :
                    <div className="setting__role__section setting__role__section__button ml-2 mr-2 mt-lg-3">
                        {isRequested ?
                            <Button
                                name="join-button"
                                className="button button--lg button--outline-primary mr-auto ml-auto"
                                isLoading={isButtonLoading}
                                onClick={(e) => this.handleCancel(e)}
                            >
                                Cancel request
                            </Button> :
                            <Button
                                name="cancel-button"
                                className="button button--lg button--primary mr-auto ml-auto"
                                isLoading={isButtonLoading}
                                onClick={(e) => this.handleSubmit(e)}
                            >
                                Request to join the team
                            </Button>
                        }
                    </div>
                }
            </div>
        )
    }
}

RoleDetail.propTypes = {
    authenticityToken: PropTypes.string,
    joinPath: PropTypes.string,
    user: PropTypes.object,
    role: PropTypes.object,
    isRequested: PropTypes.bool,
    isMember: PropTypes.bool
}

export default RoleDetail
