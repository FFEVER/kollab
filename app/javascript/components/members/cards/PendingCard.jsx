import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"
import portraitPlaceholder from "../../../images/portrait_placeholder.png";

class PendingCard extends React.Component {
    render() {
        const {user} = this.props
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
                    </div>
                </a>
                <Button name="cancel-button" className="button button__decline">
                    Cancel
                </Button>
            </div>
        )
    }
}

PendingCard.propTypes = {
    user: PropTypes.object,
}
export default PendingCard
