import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button";
import axios from "axios";

class NotificationCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAccepted: false,
            isRejected: false,
        }
    }

    acceptRequest = (event) => {
        const formData = new FormData()
        formData.append("project_id", this.props.request.project.id)
        formData.append("status", "accepted")
        formData.append("authenticity_token", this.props.authenticityToken)

        const url = this.props.request.links.update
        axios({
            method: "put",
            url: url,
            responseType: "json",
            headers: {
                Accept: "application/json",
            },
            data: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({isAccepted: true})
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

    rejectRequest = (event) => {
        const formData = new FormData()
        formData.append("project_id", this.props.request.project.id)
        formData.append("authenticity_token", this.props.authenticityToken)

        const url = this.props.request.links.destroy
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
                    this.setState({isRejected: true})
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

    render() {
        const {isAccepted, isRejected} = this.state
        const {request} = this.props
        const project = request.project

        return (
            // <div className="notification__card">
            <div className="card-with-button">
                <div className="card-with-button__detail">
                    <h5> New invitation </h5>
                    <p>You are invited to join &nbsp;
                        <a href={project.links.show}><b>{project.title}</b></a>
                        &nbsp;project</p>
                </div>

                <div className="d-flex flex-column">
                    {isAccepted ?
                        <Button name="accepted-button" className="button button__accepted mb-2">
                            Accepted
                        </Button> : null
                    }
                    {isRejected ?
                        <Button name="rejected-button" className="button button__cancelled mb-2">
                            Declined
                        </Button> : null
                    }
                    {
                        isAccepted === false && isRejected === false ?
                            <>
                                <Button name="accept-button" className="button button__accept mb-2"
                                        onClick={(e) => this.acceptRequest(e)}>
                                    Accept
                                </Button>
                                <Button name="decline-button" className="button button__decline"
                                        onClick={(e) => this.rejectRequest(e)}>
                                    Decline
                                </Button>
                            </>
                            : null
                    }
                </div>
            </div>
        )
    }
}

NotificationCard.propTypes = {
    authenticityToken: PropTypes.string,
    request: PropTypes.object,
}
export default NotificationCard
