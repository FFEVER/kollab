import React from "react"
import PropTypes from "prop-types"

class StarProjectCard extends React.Component {
  render() {
    const { user, project } = this.props.post
    return (
      <div className="home__post">
        <div className="home__post__section">
          <h5>{project.title}</h5>
          <p>{project.description}</p>
          <div className="home__post__tags">
            {project.tags.map((item, index) => (
              <p className="link mr-1" key={index}>{`#${item.label}`}</p>
            ))}
          </div>
        </div>
        <div className="home__post__action home__post__action__end">
          <p>Starred by </p>
          <p className="font-weight-bold ml-1 mr-2">{user.first_name}</p>
          <img src={user.img} className="home__post__img" />
        </div>
      </div>
    )
  }
}

StarProjectCard.propTypes = {
  post: PropTypes.object,
}
export default StarProjectCard
