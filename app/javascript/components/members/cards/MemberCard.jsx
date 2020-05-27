import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class MemberCard extends React.Component {
  render() {
    const { user, role } = this.props
    return (
      <div className="member-card">
        <p className="align-self-center">image</p>
        <div className="member-card__detail">
          <h5 style={{ color: "#4e4e4e" }}>{user.name}</h5>
          <p>{role.name}</p>
        </div>
      </div>
    )
  }
}

MemberCard.propTypes = {
  user: PropTypes.object,
  role: PropTypes.object,
}
export default MemberCard
