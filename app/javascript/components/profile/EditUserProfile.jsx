import React from "react"
import PropTypes from "prop-types"
import { TextField, FormControl, Select, MenuItem } from "@material-ui/core"
import {
  EditUserProfileValidator,
  defaultErrors,
} from "./EditUserProfileValidator"
import CreatableSelect from "react-select/creatable"

import edit from "../../images/icon/edit.png"
import contact from "../../images/icon/phone-call.png"
import mail from "../../images/icon/mail.png"
import profileImg from "../../images/anya.jpg"
import faculty from "../../../assets/utils/faculty"

import Button from "../shared/form/Button"
import FormInput from "../shared/form/FormInput"

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

const socials = ["GitHub", "Facebook", "Instagram"]

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
      year: 4,
      currentfaculty: faculty[0].departments[0],
      position: "4th year Software Engineering Stduent",
      bio:
        "I am 4th year student from King Mongkut’s Institute of Technology Ladkrabang and currently studying in Software Engineering field. I am interested Web Development and Docker.",
      email: this.props.currentUser.email,
      phone: "+66 89 777 8899",
      instagram: "nattaphol.s",
      expertise: [
        { value: "SoftwareEngineering", label: "Software Engineering" },
        { value: "ComputerScience", label: "Computer Science" },
      ],
      skills: [
        { value: "ReactNative", label: "ReactNative" },
        { value: "Docker", label: "Docker" },
        { value: "JavaScript", label: "JavaScript" },
      ],
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
      errors: defaultErrors,
      socialLink: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSkillCreate = this.handleSkillCreate.bind(this)
    this.handleExpertiseCreate = this.handleExpertiseCreate.bind(this)
  }

  renderYears() {
    for (var i = 0; i < 3; i++) {
      ;<MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    }
  }

  handleChange(event) {
    console.log("Event ", event)
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSkillCreate(event) {
    console.log("Event ", event)
    const skills = this.state.tags
    this.setState({
      skills: [...skills, { value: event, label: event }],
    })
  }

  handleExpertiseCreate(event) {
    console.log("Event ", event)
    const expertise = this.state.expertise
    this.setState({
      expertise: [...expertise, { value: event, label: event }],
    })
  }

  render() {
    const {
      user,
      errors,
      currentfaculty,
      year,
      bio,
      expertise,
      skills,
      phone,
      email,
      socialLink,
    } = this.state
    return (
      <form>
        {console.log("User ", user)}
        <div className="thin-line mt-3 mb-3" />
        <div>
          <div className="d-flex flex-row justify-content-between">
            <h4>Profile Picture</h4>
            <img className="icon" src={edit} />
          </div>
          <div className="d-flex flex-col justify-content-center mt-3">
            <img className="profile-img" src={profileImg} />
          </div>
          <div className="thin-line mt-3 mb-3" />
          <div>
            <h4>Faculty</h4>
            <div className="d-flex flex-column mt-3">
              <FormControl variant="outlined">
                {/* <InputLabel>{this.state.faculty}</InputLabel> */}
                <Select
                  name="faculty"
                  value={currentfaculty}
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
            <div className="d-flex flex-column mt-3">
              <h4>Year of Study</h4>
              <div className="d-flex flex-column mt-3">
                <FormControl variant="outlined">
                  {/* <InputLabel>{this.state.faculty}</InputLabel> */}
                  <Select name="year" value={year} onChange={this.handleChange}>
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
          <div className="thin-line mt-3 mb-3" />
          <div className="d-flex flex-column mt-3">
            <h4>Bio</h4>
            <div className="d-flex flex-column mt-3">
              <TextField
                // label="Multiline"
                multiline
                rows="4"
                defaultValue={bio}
                variant="outlined"
              />
            </div>
          </div>
          <div className="thin-line mt-3 mb-3" />
          <div className="d-flex flex-column mt-3">
            <h4>Expertise</h4>
            <div className="mt-3">
              <CreatableSelect
                isClearable
                value={expertise}
                isMulti
                onChange={this.handleChange}
                onCreateOption={this.handleExpertiseCreate}
              />
            </div>
          </div>
          <div className="thin-line mt-3 mb-3" />
          <div className="d-flex flex-column mt-3">
            <h4>Skills</h4>
            <div className="mt-3">
              <CreatableSelect
                isClearable
                value={skills}
                isMulti
                onChange={this.handleChange}
                onCreateOption={this.handleSkillCreate}
              />
            </div>
          </div>
          <div className="thin-line mt-3 mb-3" />
          <div className="d-flex flex-column mt-3">
            <h4>Contact</h4>
            <div className="d-flex flex-row  mt-3 align-items-center">
              <img className="icon" src={contact} />
              <TextField
                label="Phone"
                variant="outlined"
                value={phone}
                fullWidth
              />
            </div>
            <div className="d-flex flex-row mt-3 align-items-center">
              <img className="icon" src={mail} />
              <TextField
                label="E-mail"
                variant="outlined"
                value={email}
                fullWidth
              />
            </div>
            <div className="d-flex flex-row  mt-3 align-items-center">
              <img className="icon" src={contact} />
              <FormInput
                name="phone"
                placeholder="Phone"
                type="text"
                value={phone}
                className="form-control"
                onChange={this.handleChange}
                errors={errors.phone}
              />
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <h4>Links</h4>
            <p>Social Links</p>
            <div className="d-flex flex-row mt-3">
              <FormControl className="mr-2" variant="outlined" fullWidth>
                {/* <InputLabel>{this.state.faculty}</InputLabel> */}
                <Select
                  name="socialLink"
                  value={socialLink}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>Select your year of study</em>
                  </MenuItem>

                  <MenuItem value={1}>1</MenuItem>
                </Select>
              </FormControl>
              <FormInput
                name={socialLink}
                placeholder="Phone"
                type="text"
                value={phone}
                className="form-control"
                onChange={this.handleChange}
                errors={errors.phone}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <Button
            name="submitButton"
            type="submit"
            className="button--gradient-green button--long mt-3"
            isLoading={this.state.isButtonLoading}
          >
            Save
          </Button>
        </div>
      </form>
    )
  }
}

EditUserProfile.propTypes = {
  authenticityToken: PropTypes.string,
  currentUser: PropTypes.object,
  submitPath: PropTypes.string,
}

export default EditUserProfile
