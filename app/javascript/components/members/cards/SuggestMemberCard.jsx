import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"
import portraitPlaceholder from "../../../images/portrait_placeholder.png";
import axios from "axios";

class SuggestMemberCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isInvited: false,
            joinRequest: null
        }
    }

    handleInvite = (e) => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)
        formData.append("status", 'inviting')
        formData.append("user_id", this.props.user.id)
        formData.append("project_id", this.props.project.id)

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
                        isInvited: true,
                        joinRequest: response.data.join_request
                    })
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    alert(error.response.data.message)
                } else {
                    alert(error.response.message)
                }
            })
    }

    cancelRequest = (event) => {
        const formData = new FormData()
        formData.append("project_id", this.state.request.project.id)
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
                    this.setState({
                        isInvited: false,
                        joinRequest: null
                    })
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
        const {user} = this.props
        const {isInvited} = this.state
        return (
            <div className="card-with-button">
                <a href={user.links.show} className="d-flex flex-row">
                    <div className="d-flex flex-row">
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
                    </div>
                </a>
                {isInvited ?
                    <Button name="decline-button" className="button button__decline"
                            onClick={(e) => this.cancelRequest(e)}>
                        Cancel
                    </Button> :
                    <Button name="invite-button" className="button button__accept mb-2"
                            onClick={(e) => this.handleInvite(e)}>
                        Invite
                    </Button>
                }
            </div>
        )
    }
}

SuggestMemberCard.propTypes = {
    user: PropTypes.object,
    project: PropTypes.object,
    joinPath: PropTypes.string
}
export default SuggestMemberCard
