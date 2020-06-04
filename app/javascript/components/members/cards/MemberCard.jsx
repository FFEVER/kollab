import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class MemberCard extends React.Component {
  render() {
    const { user, role, onClick, submitPath } = this.props
    return (
      <div className="member-card" onClick={() => onClick(submitPath, user)}>
        <p className="align-self-center">image</p>
        <div className="member-card__detail">
          <h5
            style={{ color: "#4e4e4e" }}
          >{`${user.first_name} ${user.last_name}`}</h5>
          <p>{role.title}</p>
        </div>
      </div>
    )
  }
}

MemberCard.propTypes = {
  user: PropTypes.object,
  role: PropTypes.object,
  onClick: PropTypes.func,
  submitPath: PropTypes.string,
}
export default MemberCard
