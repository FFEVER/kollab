import React from "react"
import PropTypes from "prop-types"
import add from "../../../javascript/images/icon/add.png"
import Card from "../Card"

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [
        {
          action: "updated project progress",
          project: this.props.projects[0],
          tags: ["WebApplication"],
        },
        {
          action: "updated project progress",
          project: this.props.projects[0],
          tags: ["Communication", "WebApplication", "Media"],
        },
        {
          action: "done the project of",
          project: this.props.projects[0],
          tags: ["Communication", "WebApplication", "Media"],
        },
      ],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { currentUser, projects, isProfileOwner } = this.props
    const { posts } = this.state
    return (
      <div>
        <div className="d-flex flex-row mt-3 justify-content-between">
          <h3>Post</h3>
          {isProfileOwner ? <img className="icon--round" src={add} /> : <div />}
        </div>
        {projects.length > 0 ? (
          posts.map((item, index) => (
            <Card
              key={index}
              type={"post"}
              user={currentUser}
              action={item.action}
              project={item.project}
              tags={item.tags}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    )
  }
}

UserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  editPath: PropTypes.string,
  currentUser: PropTypes.object,
  projects: PropTypes.array,
  tags: PropTypes.array,
  isProfileOwner: PropTypes.bool,
}

export default UserProfile
