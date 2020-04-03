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
          project: this.props.projects[1],
          tags: ["WebApplication"]
        },
        {
          action: "updated project progress",
          project: this.props.projects[0],
          tags: ["Communication", "WebApplication", "Media"]
        },
        {
          action: "done the project of",
          project: this.props.projects[0],
          tags: ["Communication", "WebApplication", "Media"]
        }
      ]
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { currentUser, projects } = this.props
    return (
      <div>
        <div className="d-flex flex-row mt-3 justify-content-between">
          <h3>Post</h3>
          <img className="icon--round" src={add} />
        </div>
        {this.state.posts.map((item, index) => (
          <Card
            key={index}
            type={"post"}
            user={currentUser}
            action={item.action}
            project={item.project}
            tags={item.tags}
          />
        ))}
      </div>
    )
  }
}

UserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  editPath: PropTypes.string,
  currentUser: PropTypes.object,
  projects: PropTypes.array,
  tags: PropTypes.array
}

export default UserProfile
