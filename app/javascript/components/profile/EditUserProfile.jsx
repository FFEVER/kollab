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
      social: "",
      socials: [
        { key: "GitHub", value: "" },
        { key: "Facebook", value: "" },
        { key: "Instagram", value: "" },
      ],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSkillCreate = this.handleSkillCreate.bind(this)
    this.handleExpertiseCreate = this.handleExpertiseCreate.bind(this)
    this.addSocialLink = this.addSocialLink.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSkillCreate(event) {
    const skills = this.state.tags
    this.setState({
      skills: [...skills, { value: event, label: event }],
    })
  }

  handleExpertiseCreate(event) {
    const expertise = this.state.expertise
    this.setState({
      expertise: [...expertise, { value: event, label: event }],
    })
  }

  addSocialLink() {
    return (
      <div className="edit-profile__social">
        <FormControl
          className="mr-3"
          variant="outlined"
          fullWidth
          size="small"
          style={{ backgroundColor: "white" }}
        >
          <Select
            name="social"
            value={this.state.social}
            onChange={this.handleChange}
          >
            <MenuItem value="">
              <em>Social Link</em>
            </MenuItem>

            {this.state.socials.map((item, index) => (
              <MenuItem key={index} value={item.key}>
                {item.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormInput
          name={this.state.social}
          placeholder={this.state.social}
          type="text"
          value={this.state.phone}
          className="form-control auto-height mr-2"
          onChange={this.handleChange}
          errors={this.state.errors.social}
        />
        <i className="far fa-times-circle fa-2x" />
      </div>
    )
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
      social,
      socials,
    } = this.state
    return (
      <form className="d-flex flex-column">
        <div className="thin-line" />
        <div>
          <div className="d-flex flex-row justify-content-between">
            <h4>Profile Picture</h4>
            <img className="icon--round" src={edit} />
          </div>
          <div className="d-flex justify-content-center">
            <img
              className="image__profile image__profile--mega"
              src={profileImg}
            />
          </div>
          <div className="thin-line" />
          <div>
            <h4>Faculty</h4>
            <div className="profile__section">
              <FormControl variant="outlined" size="small">
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
            <div className="profile__section">
              <h4>Year of Study</h4>
              <div className="profile__section">
                <FormControl variant="outlined" size="small">
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
          <div className="thin-line" />
          <div className="profile__section">
            <h4>Bio</h4>
            <div className="profile__section">
              <TextField
                multiline
                rows="4"
                defaultValue={bio}
                variant="outlined"
              />
            </div>
          </div>
          <div className="thin-line" />
          <div className="profile__section">
            <h4>Expertise</h4>
            <div className="mt-3">
              <CreatableSelect
                name="expertise"
                isClearable
                value={expertise}
                isMulti
                onChange={this.handleChange}
                onCreateOption={this.handleExpertiseCreate}
              />
            </div>
          </div>
          <div className="thin-line" />
          <div className="profile__section">
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
          <div className="thin-line" />
          <div className="profile__section">
            <h4>Contact</h4>
            <div className="d-flex flex-row  mt-3 align-items-center">
              <img className="icon" src={contact} />
              <FormInput
                name="phone"
                placeholder="Phone"
                type="text"
                value={phone}
                className="form-control auto-height"
                onChange={this.handleChange}
                errors={errors.phone}
              />
            </div>
            <div className="d-flex flex-row mt-3 align-items-center">
              <img className="icon" src={mail} />
              <FormInput
                name="email"
                placeholder="E-mail"
                type="text"
                value={email}
                className="form-control auto-height"
                onChange={this.handleChange}
                errors={errors.email}
              />
            </div>
          </div>
          <div className="profile__section">
            <h4>Links</h4>
            <p>Social Links</p>
            <div className="edit-profile__social">
              <FormControl
                className="mr-3"
                variant="outlined"
                fullWidth
                size="small"
                style={{ backgroundColor: "white" }}
              >
                <Select
                  name="social"
                  value={social}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>Social Link</em>
                  </MenuItem>

                  {socials.map((item, index) => (
                    <MenuItem key={index} value={item.key}>
                      {item.key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormInput
                name={social}
                placeholder={social}
                type="text"
                value={phone}
                className="form-control auto-height mr-2"
                onChange={this.handleChange}
                errors={errors.social}
              />
              <i className="far fa-times-circle fa-2x" />
            </div>
            <p
              className="d-flex flex-column align-items-center"
              style={{ color: "#54bdc2" }}
              onClick={this.addSocialLink}
            >
              Add social links
            </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <Button
            name="submitButton"
            type="submit"
            className="button--gradient-primary button--lg mt-3"
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
