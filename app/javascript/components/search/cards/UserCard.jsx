import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"
import portraitPlaceholder from "../../../images/portrait_placeholder.png"


class UserCard extends React.Component {

    getUserPath = (userPath, Userid) => {
        return userPath.replace("id", Userid)
    }

    render() {
        const {
            id,
            name,
            faculty,
            description,
            skills,
            following,
            profile_image_url,
        } = this.props.user

        const {userPath, currentUser} = this.props

        return (
            <div className="search__user__card">
                <div className="search__user__detail">
                    <div className="search__user__header mb-1">
                        <a href={this.getUserPath(userPath, id)}>
                            {profile_image_url === null ?
                                <img src={portraitPlaceholder} className="search__user__proimg"></img>
                                : <img src={profile_image_url} className="search__user__proimg"></img>
                            }
                        </a>
                        <div className="d-flex flex-column">
                            <div className="search__section">
                                <a href={this.getUserPath(userPath, id)}>
                                    <h5>{name}</h5>
                                </a>
                            </div>
                            <div className="search__section">
                                <p>{faculty}</p>
                            </div>
                        </div>
                    </div>
                    <div className="search__section">
                        <p>{description}</p>
                    </div>

                    <div className="search__section">
                        <div className="search__tags">
                            {skills.map((item, index) => (
                                <p className="link mr-1" key={index}>{`#${item}`}</p>
                            ))}
                        </div>
                    </div>
                </div>
                {currentUser.id === id ?
                    null
                    :
                    <Button
                        name="follow"
                        className={
                            following
                                ? "button search__user__button search__user__button__follow"
                                : "button search__user__button search__user__button__unfollow"
                        }
                    >
                        {following ? "Following" : "Follow"}
                    </Button>
                }
            </div>
        )
    }
}

UserCard.propTypes = {
    user: PropTypes.object,
}
export default UserCard
