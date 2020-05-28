import React from "react"
import PropTypes from "prop-types"

class ProjectCard extends React.Component {
  render() {
    const {
      title,
      description,
      tags,
      status,
      last_updated,
      lookingRoles,
      starred,
    } = this.props.project

    return (
      <div className="role-card">
        <h5 style={{ color: "#4e4e4e" }}>{title}</h5>
        <div className={statusClass}>{description}</div>
      </div>
    )
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object,
}
export default ProjectCard
