import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"
import portraitPlaceholder from "../../../images/portrait_placeholder.png";
import axios from "axios";

class PendingCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCancelled: false,
        }
    }

    cancelRequest = (event) => {
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
                    this.setState({isCancelled: true})
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
        const {isCancelled} = this.state
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
                {isCancelled ?
                    <Button name="cancelled-button" className="button button__cancelled">
                        Cancelled
                    </Button> :
                    <Button name="cancel-button" className="button button__decline"
                            onClick={(e) => this.cancelRequest(e)}>
                        Cancel
                    </Button>
                }
            </div>
        )
    }
}

PendingCard.propTypes = {
    authenticityToken: PropTypes.string,
    user: PropTypes.object,
    removeRequest: PropTypes.func
}
export default PendingCard
