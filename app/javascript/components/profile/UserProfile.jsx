import React from "react"
import PropTypes from "prop-types"
import add from "../../../javascript/images/icon/add.png"
import Card from "../Card"

const projects = [
  {
    id: 1,
    title: "Object Tracking Drone",
    tags: ["ObjectDetection", "Drone", "IOT"],
    status: "In progress"
  },
  {
    id: 2,
    title: "Robotic car with Obstacle",
    tags: ["ObjectDetection", "Robotic", "IOT"],
    status: "In progress"
  },
  {
    id: 3,
    title: "Garden observation App ",
    tags: ["ObjectDetection", "Embedded", "IOT"],
    status: "In progress"
  }
]

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: "Natthaphol Srisa",
      posts: [
        {
          id: 1,
          action: "updated project progress",
          project: projects[0]
        },
        {
          id: 2,
          action: "updated project progress",
          project: projects[1]
        },
        {
          id: 3,
          action: "done the project of",
          project: projects[2]
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
    const { currentUser } = this.props
    return (
      <div>
        {console.log("User ", currentUser)}
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
          />
        ))}
      </div>
    )
  }
}

UserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  editPath: PropTypes.string,
  currentUser: PropTypes.object
}

export default UserProfile
