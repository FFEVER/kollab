import React from "react";
import PropTypes from "prop-types";
import { TextField, FormControl, Select, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import CreatableSelect from "react-select/creatable";

import HorizontalScroll from "react-scroll-horizontal";

import GradientButton from "react-linear-gradient-button";

import edit from "../images/icon/edit.png";
import rectangle from "../images/icon/rectangle.png";
import contact from "../images/icon/phone-call.png";
import mail from "../images/icon/mail.png";
import profileImg from "../images/anya.jpg";
import faculty from "../../assets/utils/faculty";

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

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "Natthaphol Srisa",
      year: 4,
      faculty: faculty[0].departments[0],
      position: "4th year Software Engineering Stduent",
      bio:
        "I am 4th year student from King Mongkut’s Institute of Technology Ladkrabang and currently studying in Software Engineering field. I am interested Web Development and Docker.",
      email: "nattaphol@kmitl.ac.th",
      phone: "+66 89 777 8899",
      instagram: "nattaphol.s",
      expertise: [
        { value: "SoftwareEngineering", label: "Software Engineering" },
        { value: "ComputerScience", label: "Computer Science" }
      ],
      skills: [
        { value: "ReactNative", label: "ReactNative" },
        { value: "Docker", label: "Docker" },
        { value: "JavaScript", label: "JavaScript" }
      ],
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
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSkillCreate = this.handleSkillCreate.bind(this);
    this.handleExpertiseCreate = this.handleExpertiseCreate.bind(this);
  }

  renderYears() {
    for (var i = 0; i < 3; i++) {
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>;
    }
  }

  handleChange(event) {
    console.log("Event ", event);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSkillCreate(event) {
    console.log("Event ", event);
    const skills = this.state.tags;
    this.setState({
      skills: [...skills, { value: event, label: event }]
    });
  }

  handleExpertiseCreate(event) {
    console.log("Event ", event);
    const expertise = this.state.expertise;
    this.setState({
      expertise: [...expertise, { value: event, label: event }]
    });
  }

  render() {
    return (
      <div>
        <div className="form center">
          <h3>Edit Profile</h3>
        </div>
        <div className="thin-line mar-lr--l" />
        <div className="form">
          <div className="flex-row space-bet">
            <h4>Profile Picture</h4>
            <img className="icon" src={edit} />
          </div>
          <div className=" flex-col center mar-top--m">
            <img className="profile-img" src={profileImg} />
          </div>
          <div className="thin-line mar-top--m" />
          <div className="mar-top--l">
            <h4>Faculty</h4>
            <div className="flex-col mar-top--m">
              <FormControl variant="outlined">
                {/* <InputLabel>{this.state.faculty}</InputLabel> */}
                <Select
                  name="faculty"
                  value={this.state.faculty}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>Select your faculty</em>
                  </MenuItem>
                  {faculty.map((fac, key) =>
                    fac.departments.map((dep, id) => (
                      <MenuItem key={id} value={dep}>
                        {dep}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="flex-col mar-top--m">
              <h4>Year of Study</h4>
              <div className="flex-col mar-top--m">
                <FormControl variant="outlined">
                  {/* <InputLabel>{this.state.faculty}</InputLabel> */}
                  <Select
                    name="year"
                    value={this.state.year}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="">
                      <em>Select your year of study</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={"else"}>else</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="thin-line mar-top--m" />
          <div className="flex-col mar-top--m">
            <h4>Bio</h4>
            <div className="flex-col mar-top--m">
              <TextField
                // label="Multiline"
                multiline
                rows="4"
                defaultValue={this.state.bio}
                variant="outlined"
              />
            </div>
          </div>
          <div className="thin-line mar-top--m" />
          <div className="flex-col mar-top--m">
            <h4>Expertise</h4>
            <div className="mar-top--m">
              <CreatableSelect
                isClearable
                value={this.state.expertise}
                isMulti
                onChange={this.handleChange}
                onCreateOption={this.handleExpertiseCreate}
              />
            </div>
          </div>
          <div className="thin-line mar-top--m" />
          <div className="flex-col mar-top--m">
            <h4>Skills</h4>
            <div className="mar-top--m">
              <CreatableSelect
                isClearable
                value={this.state.skills}
                isMulti
                onChange={this.handleChange}
                onCreateOption={this.handleSkillCreate}
              />
            </div>
          </div>
          <div className="thin-line mar-top--m" />
          <div className="flex-col mar-top--m">
            <h4>Contact</h4>
            <div className="flex-row mar-top--m align-cen">
              <img className="icon" src={contact} />
              <TextField
                label="Phone"
                variant="outlined"
                value={this.state.phone}
              />
            </div>
            <div className="flex-row mar-top--m align-cen">
              <img className="icon" src={mail} />
              <TextField
                label="E-mail"
                variant="outlined"
                value={this.state.email}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default EditUserProfile;
