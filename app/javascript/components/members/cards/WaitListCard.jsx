import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"
import portraitPlaceholder from "../../../images/portrait_placeholder.png";
import axios from "axios";

class WaitListCard extends React.Component {

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

    render() {
        const {request} = this.props
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
                    <Button name="accept-button" className="button button__accept mb-2">
                        Accept
                    </Button>
                    <Button name="decline-button" className="button button__decline" onClick={(e) => this.rejectRequest(e)}>
                        Decline
                    </Button>
                </div>
            </div>
        )
    }
}

WaitListCard.propTypes = {
    user: PropTypes.object,
}
export default WaitListCard
