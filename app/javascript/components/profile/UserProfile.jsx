import React from "react"
import PropTypes from "prop-types"
import phone from "../../images/icon/phone-call.png"
import mail from "../../images/icon/mail.png"
import instagram from "../../images/icon/instagram.png"
import attach from "../../images/icon/paperclip.png"
import add from "../../images/icon/add.png"
import more from "../../images/icon/more.png"
import rectangle from "../../images/icon/rectangle.png"
import profileImg from "../../images/anya.jpg"
import Card from "../Card"

const filename = "Proposal.pdf"
const projects = [
  {
    id: 1,
    title: "Object Tracking Drone",
    tags: ["ObjectDetection", "Drone", "IOT"],
    status: "In progress",
  },
  {
    id: 2,
    title: "Robotic car with Obstacle",
    tags: ["ObjectDetection", "Robotic", "IOT"],
    status: "In progress",
  },
  {
    id: 3,
    title: "Garden observation App ",
    tags: ["ObjectDetection", "Embedded", "IOT"],
    status: "In progress",
  },
]

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: "Natthaphol Srisa",
      position: "4th year Software Engineering Stduent",
      bio:
        "I am 4th year student from King Mongkut’s Institute of Technology Ladkrabang and currently studying in Software Engineering field. I am interested Web Development and Docker.",
      email: "nattaphol@kmitl.ac.th",
      phone: "+66 89 777 8899",
      instagram: "nattaphol.s",
      tags: ["ReactNative", "Docker", "JavaScript"],

      posts: [
        {
          id: 1,
          user: "Nattaphol S.",
          action: "updated project progress",
          project: projects[0],
        },
        {
          id: 2,
          user: "Nattaphol S.",
          action: "updated project progress",
          project: projects[1],
        },
      ],
      showPassword: false,
      showConfirmPassword: false,
      checkedAgreeCondition: false,
    }
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderItems = this.renderItems.bind(this)
  }

  renderItems() {
    for (var i = 0; i < 3; i++) {
      ;<img className="logo" src={rectangle} style={{ marginRight: "10px" }} />
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  render() {
    return (
      <form className="profile">
        <div>
          {/* <img className="logo" src={kollab} /> */}
          <div className="d-flex flex-row">
            <img className=" profile-img" src={profileImg} />

            <div className="d-flex flex-column justify-content-center ml-3">
              <h2>{this.state.fullname}</h2>
              <p>{this.state.position}</p>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3>11</h3>
                <p className="ml-3 mr-3">Projects</p>
                <h3>5</h3>
                <p className="ml-3 mr-3">Folloings</p>
                <h3>3</h3>
                <p className="ml-3 mr-3">Followers</p>
              </div>
            </div>
          </div>
          <p className="mt-3 mb-3">{this.state.bio}</p>
          <div className="d-flex flex-coloumn justify-content-center">
            <button className="button--edit-profile" style={{ width: "100%" }}>
              <a href={`http://localhost:5000/${this.props.editPath}`}>
                Edit Profile
              </a>
            </button>
          </div>
        </div>
        <div className="sep-line mt-3 mb-3" />
        <div>
          <div className="d-flex flex-row justify-content-between">
            <div className="flex-row ">
              <h3>Skills</h3>
              {this.state.tags.map((item, index) => (
                <button className="button--tags mt-2" key={index}>
                  {item}
                </button>
              ))}
            </div>
            <img className="icon" src={more} />
          </div>
        </div>
        <div className="sep-line mt-3 mb-3" />
        <div>
          <div className="d-flex flex-row justify-content-between">
            <h3>Contact</h3>
            <img className="icon" src={more} />
          </div>

          <div className="d-flex flex-row mt-2">
            <img className="icon" src={phone} />
            <p>{this.state.phone}</p>
          </div>
          <div className="d-flex flex-row mt-1">
            <img className="icon" src={mail} />
            <p>{this.state.email}</p>
          </div>
          <div className="d-flex flex-row mt-1">
            <img className="icon" src={instagram} />
            <p>{this.state.instagram}</p>
          </div>
        </div>
        <div className="sep-line mt-3 mb-3" />
        <div>
          <h3>Projects</h3>
          {projects.map((item, index) => (
            <Card
              key={index}
              type={"project"}
              title={item.title}
              tags={item.tags}
              status={item.status}
            />
          ))}
          <div className="d-flex flex-column align-items-center mt-2">
            <p style={{ color: "#54bdc2" }}>See more</p>
          </div>
        </div>
        <div className="sep-line mt-3 mb-3" />
        <div>
          <h3>Interests</h3>
          <div className="d-flex flex-row mt-2s">
            <img className="logo mr-2" src={rectangle} />
            <img className="logo mr-2" src={rectangle} />
            <img className="logo mr-2" src={rectangle} />
          </div>
        </div>
        <div className="sep-line mt-3 mb-3" />
        <div>
          <h3>Photos</h3>
          <div className="d-flex flex-row mt-2">
            <img className="logo mr-2" src={rectangle} />
            <img className="logo mr-2" src={rectangle} />
            <img className="logo mr-2" src={rectangle} />
          </div>
        </div>
        <div className="sep-line mt-3 mb-3" />

        <div>
          <h3>Files</h3>
          <div className="flex-row mt-2">
            <img className="icon" src={attach} />
            <p>{filename}</p>
          </div>
          <p className="mt-2" style={{ color: "#54bdc2" }}>
            See more
          </p>
        </div>
        <div className="sep-line mt-3 mb-3" />
        <div className="form">
          <div className="d-flex flex-row justify-content-between">
            <h3>Post</h3>
            <img className="icon" src={add} />
          </div>
          {this.state.posts.map((item, index) => (
            <Card
              key={index}
              type={"post"}
              user={item.user}
              action={item.action}
              project={item.project}
            />
          ))}
        </div>
        <div className="sep-line mt-3 mb-3" />
      </form>
    )
  }
}

UserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
}

export default UserProfile
