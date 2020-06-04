import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"
import portraitPlaceholder from "../../../images/portrait_placeholder.png";
import axios from "axios";

class WaitListCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAccepted: false,
            isRejected: false
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
        const {request} = this.props
        const {isAccepted, isRejected} = this.state
        const user = request.user
        return (
            <div className="card-with-button">
                <a href={user.links.show} className="d-flex flex-row">
                    {user.profile_image_url === null ?
                        <img src={portraitPlaceholder} className="search__user__proimg"/>
                        : <img src={user.profile_image_url} className="search__user__proimg"/>
                    }
                    <div className="card-with-button__detail">
                        <h5 style={{color: "#4e4e4e"}}>{user.name}</h5>
                        <p>{user.faculty}</p>
                        <div>
                            {user.skills.map((item, index) => (
                                <a className="link mr-1" key={index}>{`#${item}`}</a>
                            ))}
                        </div>
                    </div>
                </a>
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

WaitListCard.propTypes = {
    authenticityToken: PropTypes.string,
    user: PropTypes.object,
}
export default WaitListCard
