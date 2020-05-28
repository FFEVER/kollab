import React from "react"
import PropTypes from "prop-types"

class FollowUserCard extends React.Component {
  render() {
    const { user, target } = this.props.post
    return (
      <div className="home__post">
        <div className="home__post__action  home__post__action__between">
          <div className="home__post__action">
            <img src={target.img} className="home__post__img" />
            <p className="font-weight-bold ml-2 mr-1">{target.first_name}</p>
            <p>is followd by</p>
            <p className="font-weight-bold ml-1">{user.first_name}</p>
          </div>
          <img src={user.img} className="home__post__img" />
        </div>
      </div>
    )
  }
}

FollowUserCard.propTypes = {
  post: PropTypes.object,
}
export default FollowUserCard
