import React from "react"
import PropTypes from "prop-types"

class UpdateProjectCard extends React.Component {
  render() {
    const { user, project, action, message, time, statuses } = this.props.post
    return (
      <div className="home__post">
        <div className="home__post__section">
          <h4>{project.title}</h4>
        </div>
        <div className="home__post__message mt-2">
          {message ? (
            <p>{message}</p>
          ) : statuses ? (
            <div className="home__post__action">
              <p>from </p>
              <p className="font-weight-bold ml-1 mr-1">{statuses.previous}</p>
              <p>to </p>
              <p className="font-weight-bold ml-1">{statuses.currentStatus}</p>
            </div>
          ) : (
            <div />
          )}
        </div>

        <div className="home__post__section home__post__action home__post__action__between">
          <p>{time}</p>
          <div className="home__post__action">
            <p className="mr-2">{`${action} by ${user.first_name}`}</p>
            <img src={user.img} className="home__post__img" />
          </div>
        </div>
      </div>
    )
  }
}

UpdateProjectCard.propTypes = {
  post: PropTypes.object,
}
export default UpdateProjectCard
