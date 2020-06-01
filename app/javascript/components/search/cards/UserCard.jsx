import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class UserCard extends React.Component {
  render() {
    const {
      name,
      faculty,
      description,
      skills,
      following,
      image,
    } = this.props.user

    return (
      <div className="search__user__card">
        <div className="search__user__detail">
          <div className="search__user__header mb-1">
            <img src={image} className="search__user__proimg"></img>
            <div className="d-flex flex-column">
              <div className="search__section">
                <h5>{name}</h5>
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
                <p className="link mr-1" key={index}>{`#${item.label}`}</p>
              ))}
            </div>
          </div>
        </div>
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
      </div>
    )
  }
}

UserCard.propTypes = {
  user: PropTypes.object,
}
export default UserCard
