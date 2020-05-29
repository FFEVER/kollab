import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class MemberCard extends React.Component {
  render() {
    const { user, role, onClick } = this.props
    return (
      <div className="member-card">
        <img
          src={user.image}
          className="image__profile image__profile--medium"
        />
        {/* <p className="align-self-center">image</p> */}
        <Button
          name="member-card"
          className="button button--transparent"
          onClick={() => onClick()}
        >
          <div className="member-card__detail">
            <h5 style={{ color: "#4e4e4e" }}>{user.name}</h5>
            <p>{role.name}</p>
          </div>
        </Button>
      </div>
    )
  }
}

MemberCard.propTypes = {
  user: PropTypes.object,
  role: PropTypes.object,
  onClick: PropTypes.func,
}
export default MemberCard
