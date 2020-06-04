import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class RoleCard extends React.Component {
  render() {
    const { role, onClick, submitPath } = this.props
    let statusClass =
      role.status === "Open"
        ? " setting__member__role__status setting__member__role__status__open"
        : "setting__member__role__status setting__member__role__status__close"
    return (
      <div className="role-card" onClick={() => onClick(submitPath, role)}>
        <h5 style={{ color: "#4e4e4e" }}>{role.title}</h5>
        <div className={statusClass}>{role.status}</div>
      </div>
    )
  }
}

RoleCard.propTypes = {
  role: PropTypes.object,
  onClick: PropTypes.func,
  submitPath: PropTypes.string,
}
export default RoleCard
