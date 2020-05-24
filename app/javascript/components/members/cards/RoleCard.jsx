import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class RoleCard extends React.Component {
  render() {
    const { role } = this.props
    let statusClass =
      role.status === "Open"
        ? " setting__role-status setting__role-status__open"
        : "setting__role-status setting__role-status__close"
    return (
      <div className="role-card">
        <h5 style={{ color: "#4e4e4e" }}>{role.name}</h5>
        <div className={statusClass}>{role.status}</div>
      </div>
    )
  }
}

RoleCard.propTypes = {
  role: PropTypes.object,
}
export default RoleCard