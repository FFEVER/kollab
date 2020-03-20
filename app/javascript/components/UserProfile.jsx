import React from "react";
import PropTypes from "prop-types";
import kollab from "../images/kollab-blue.png";
import phone from "../images/icon/phone-call.png";
import mail from "../images/icon/mail.png";
import instagram from "../images/icon/instagram.png";
import attach from "../images/icon/paperclip.png";
import add from "../images/icon/add.png";
import more from "../images/icon/more.png";
import rectangle from "../images/icon/rectangle.png";
import profileImg from "../images/anya.jpg";
import Card from "../components/Card";

const filename = "Proposal.pdf";
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
];

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
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
          project: projects[0]
        },
        {
          id: 2,
          user: "Nattaphol S.",
          action: "updated project progress",
          project: projects[1]
        }
      ],
      showPassword: false,
      showConfirmPassword: false,
      checkedAgreeCondition: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    for (var i = 0; i < 3; i++) {
      <img className="logo" src={rectangle} style={{ marginRight: "10px" }} />;
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }
  render() {
    return (
      <div className="mar-tb">
        <div>
          {projects.map((item, index) => (
            <Card
              key={index}
              type={"project"}
              title={item.title}
              tags={item.tags}
              status={item.status}
            />
          ))}
          <div className="flex-col align-cen mar-top--s">
            <p style={{ color: "#54bdc2" }}>See more</p>
          </div>
        </div>
        <div className="sep-line" />
        <div className="form">
          <h3>Interests</h3>
          {/* <HorizontalScroll>
            <div
              style={{ width: "30px", height: "100%", backgroundColor: "red" }}
            />
            <img className="logo" src={rectangle} />
            <img className="logo" src={rectangle} />
          </HorizontalScroll> */}
          <div className="flex-row mar-top--s">
            <img
              className="logo"
              src={rectangle}
              style={{ marginRight: "10px" }}
            />
            <img
              className="logo"
              src={rectangle}
              style={{ marginRight: "10px" }}
            />
            <img
              className="logo"
              src={rectangle}
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>
        <div className="sep-line" />
        <div className="form">
          <h3>Photos</h3>
          <div className="flex-row mar-top--s">
            <img
              className="logo"
              src={rectangle}
              style={{ marginRight: "10px" }}
            />
            <img
              className="logo"
              src={rectangle}
              style={{ marginRight: "10px" }}
            />
            <img
              className="logo"
              src={rectangle}
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>
        <div className="sep-line" />

        <div className="form">
          <div className="flex-row space-bet">
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
        <div className="sep-line" />
      </div>
    );
  }
}

UserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default UserProfile;
