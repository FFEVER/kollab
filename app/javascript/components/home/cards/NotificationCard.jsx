import React from "react"
import PropTypes from "prop-types"

class NotificationCard extends React.Component {
  render() {
    const { user, project, action } = this.props.notification
    return action === "invite" ? (
      <div className="notification__card">
        <h5>{`${user.first_name} ${user.last_name}  is invited you`}</h5>
        <div className="d-flex flex-row">
          <p>You are invited to join</p>
          <p className="font-weight-bold ml-1 mr-1">{project.title}</p>
          <p>project</p>
        </div>
      </div>
    ) : (
      <div className="notification__card">
        <h5>{`${user.first_name} ${user.last_name} accepted your request`}</h5>
        <div className="d-flex flex-row">
          <p>You are accepted to join</p>
          <p className="font-weight-bold ml-1 mr-1">{project.title}</p>
          <p>project</p>
        </div>
      </div>
    )
  }
}

NotificationCard.propTypes = {
  notification: PropTypes.object,
}
export default NotificationCard
