import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"
import {
  EditUserProfileValidator,
  defaultErrors,
} from "./EditUserProfileValidator"
import ExpertiseModal from "../shared/ExpertiseModal"
import ExpertiseDisplay from "../shared/ExpertiseDisplay"
import SocialLink from "../shared/SocialLink"

import { TagInput, tagsToArray, defaultStyles } from "../shared/form/TagInput"

import edit from "../../images/icon/edit.png"
import contact from "../../images/icon/phone-call.png"
import mail from "../../images/icon/mail.png"
import faculties from "../../../assets/utils/faculties"
import socials from "../../../assets/utils/socials"

import Button from "../shared/form/Button"
import FormInput from "../shared/form/FormInput"

const DATA_PREFIX = "user"

const dataName = (name) => {
  return DATA_PREFIX + "[" + name + "]"
}

const tagStyles = {
  ...defaultStyles,
  control: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    height: "56px",
    borderColor: "#c2c2c2",
    boxShadow: state.isFocused ? "0 0 3px #54bdc2" : "",
    cursor: "text",
    "&:hover": {
      borderColor: "#c2c2c2",
    },
    marginTop: "10px",
  }),
}

const tagErrorStyles = {
  ...defaultStyles,
  control: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    height: "56px",
    borderColor: "red",
    boxShadow: state.isFocused ? "0 0 3px #ce7171" : "",
    cursor: "text",
    "&:hover": {
      borderColor: "red",
    },
    marginTop: "10px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "red",
  }),
}

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
      year: this.props.currentUser.year,
      faculty: this.props.currentUser.faculty,
      bio: this.props.currentUser.description,
      email: this.props.currentUser.email,
      phone: this.props.currentUser.phone,
      expertises: this.props.expertises,
      userExpertises: this.convertExpertiesForDisplay(),
      expertise_ids: this.filterExpertiseId(this.props.userExpertises),
      skills: this.convertToTags(this.props.currentSkills),
      errors: defaultErrors,
      socials: [],
      activateModal: "division",
    }
    this.convertToTags = this.convertToTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSocialsChange = this.handleSocialsChange.bind(this)
    this.handleExpertisesChange = this.handleExpertisesChange.bind(this)
    this.handleExpertisesClear = this.handleExpertisesClear.bind(this)
    this.handleSkillsChange = this.handleSkillsChange.bind(this)
    this.handleSkillsClear = this.handleSkillsClear.bind(this)
    this.addSocialLink = this.addSocialLink.bind(this)
    this.setSocial = this.setSocial.bind(this)
    this.setDisplayExpertise = this.setDisplayExpertise.bind(this)
    this.removeExpertise = this.removeExpertise.bind(this)
    this.checkExpertise = this.checkExpertise.bind(this)
    this.getExpertise = this.getExpertise.bind(this)
    this.filterExpertiseId = this.filterExpertiseId.bind(this)
    this.setUserExpertises = this.setUserExpertises.bind(this)
    this.convertExpertiesForDisplay = this.convertExpertiesForDisplay.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.createFormData = this.createFormData.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  convertToTags(obj) {
    let arry = []
    obj.map((item) => {
      arry.push({ label: item.name, value: item.name })
    })
    return arry
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSocialsChange(event, index) {
    let { socials } = this.state
    socials[index].name = event.target.placeholder
    socials[index].key = event.target.name
    socials[index].value = event.target.value
    this.setState({ socials: socials })
  }

  handleExpertisesChange(value) {
    this.setState({
      expertises: [...this.state.expertises, ...value],
    })
  }

  handleExpertisesClear(value) {
    // Handle clear or delete skills
    this.setState({
      expertises: value,
    })
  }

  handleSkillsChange(value) {
    this.setState({
      skills: [...this.state.skills, ...value],
    })
  }

  handleSkillsClear(value) {
    this.setState({
      skills: value,
    })
  }

  addSocialLink() {
    console.log("Add jaa")
    return (
      // <SocialLink
      //   social={socials[0]}
      //   handleChange={this.handleChange}
      //   setSocial={this.setSocial}
      // />
      <div>huhuhehehaha</div>
    )
  }

  setSocial(id, value) {
    this.setState({
      socials: [...this.state.socials, { id: id, value: value }],
    })
  }

  setDisplayExpertise(value) {
    let items = this.state.userExpertises
    if (items.length === 0) {
      this.setState({
        userExpertises: [...this.state.userExpertises, value],
        expertise_ids: [...this.state.expertise_ids, value.expertise_id],
        activateModal: "division",
        division: "",
        group: "",
        field: "",
      })
    }

    if (!this.checkExpertise(value, items)) {
      this.setState({
        userExpertises: [...this.state.userExpertises, value],
        expertise_ids: [...this.state.expertise_ids, value.expertise_id],
        activateModal: "division",
        division: "",
        group: "",
        field: "",
      })
    }
  }

  removeExpertise(item) {
    let items = this.state.userExpertises
    let ids = this.state.expertise_ids
    let index = this.getExpertise(item, items)
    items.splice(index, 1)
    ids.splice(index, 1)
    this.setState({ userExpertises: items, expertise_ids: ids })
  }

  checkExpertise(item, items) {
    for (let i = 0; i < items.length; i++) {
      if (
        item.division === items[i].division &&
        item.group === items[i].group &&
        item.field === items[i].field
      ) {
        return true
      }
    }
    return false
  }

  getExpertise(item, items) {
    let index = -1
    for (let i = 0; i < items.length; i++) {
      if (
        item.division === items[i].division &&
        item.group === items[i].group &&
        item.field === items[i].field
      ) {
        index = i
      }
    }
    return index
  }

  filterExpertiseId(exps) {
    let list = []
    exps.map((item) => list.push(item.expertise_id))
    return list
  }

  setUserExpertises() {
    let exps = this.props.expertises // All expertises
    let userExpIds = this.filterExpertiseId(this.props.userExpertises) // User expertise ids
    let userExps = [] // Return obj
    let obj = []
    let temp = {}
    userExpIds.map((key) => {
      let id = key
      let exp = exps.find((item) => item.id === key)

      while (temp !== undefined) {
        obj.push(exp)
        temp = exps.find((item) => item.id === exp.parent_id)
        exp = temp
      }
      userExps.push(obj)
      obj = []
      temp = {}
    })
    return userExps
  }

  convertExpertiesForDisplay() {
    let exps = this.setUserExpertises()
    let expsForDisplay = []
    exps.map((item) => {
      if (item.length === 3) {
        let obj = {
          field: item[0].name,
          group: item[1].name,
          division: item[2].name,
          expertise_id: item[0].id,
        }
        expsForDisplay.push(obj)
      } else if (item.length === 2) {
        let obj = {
          field: "",
          group: item[0].name,
          division: item[1].name,
          expertise_id: item[0].id,
        }
        expsForDisplay.push(obj)
      } else if (item.length === 1) {
        let obj = {
          field: "",
          group: "",
          division: item[0].name,
          expertise_id: item[0].id,
        }
        expsForDisplay.push(obj)
      }
    })
    return expsForDisplay
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setIsButtonLoading(true)
    EditUserProfileValidator.validateAll(this.state)
      .then((result) => {
        this.setState({
          errors: defaultErrors,
        })
        const formData = this.createFormData()
        this.submitForm(formData)
      })
      .catch((errors) => {
        this.setState({
          errors: errors,
        })
        this.setIsButtonLoading(false)
      })
  }

  submitForm(formData) {
    const { submitPath } = this.props
    axios({
      method: "put",
      url: submitPath,
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = response.headers.location
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400) {
          this.setState((state) => {
            let error_messages = error.response.data.messages
            let errors = defaultErrors
            for (const [k, v] of Object.entries(error_messages)) {
              errors[k] = v
            }
            return {
              errors,
            }
          })
        }
      })
      .finally(() => {
        this.setIsButtonLoading(false)
      })
  }

  createFormData() {
    const formData = new FormData()
    formData.append(dataName("faculty"), this.state.faculty)
    formData.append(dataName("year"), this.state.year)
    formData.append(dataName("description"), this.state.bio)
    formData.append(dataName("expertise"), this.state.expertise_ids)
    formData.append(
      dataName("skills"),
      JSON.stringify(tagsToArray(this.state.skills))
    ),
      formData.append(dataName("phone"), this.state.phone)
    formData.append(dataName("email"), this.state.email)
    // for (let i = 0; i < this.state.socials.length; i++) {
    //   if (this.state.socials[i].value === null) {
    //     formData.append(dataName(this.state.socials[i].key), "")
    //   } else {
    //     formData.append(
    //       dataName(this.state.socials[i].key),
    //       this.state.socials[i].value
    //     )
    //   }
    // }
    formData.append("authenticity_token", this.props.authenticityToken)
    return formData
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    const {
      user,
      errors,
      faculty,
      year,
      bio,
      expertises,
      userExpertises,
      skills,
      phone,
      email,
      socials,
      github,
      linkedin,
      facebook,
      instagram,
    } = this.state
    console.log("props ", this.props)
    console.log("state ", this.state)
    return (
      <form className="d-flex flex-column" onSubmit={this.handleSubmit}>
        <div className="thin-line" />
        <div>
          <div>
            <h4>Faculty</h4>
            <div className="profile__section">
              <FormControl variant="outlined" size="small">
                <Select
                  name="faculty"
                  value={faculty}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>Select your faculty</em>
                  </MenuItem>
                  {faculties.map((fac, key) => (
                    <MenuItem key={key} value={fac.faculty}>
                      {fac.faculty}
                    </MenuItem>
                  ))}
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
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
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
                name={"bio"}
                multiline
                rows="4"
                defaultValue={bio}
                variant="outlined"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="thin-line" />
          <ExpertiseModal
            expertises={expertises}
            setExpertiseDisplayFunc={this.setDisplayExpertise}
            disable={userExpertises.length > 2 ? true : false}
          />{" "}
          <FormHelperText error={errors.expertises.length > 0 ? true : false}>
            {errors.expertises[0]}
          </FormHelperText>
          {userExpertises.length > 0 ? (
            <ExpertiseDisplay
              expertises={userExpertises}
              removeExpertise={(item) => this.removeExpertise(item)}
            />
          ) : (
            <div />
          )}
          <div className="thin-line" />
          <div className="profile__section">
            <h4>Skills</h4>
            <TagInput
              className="mt-3"
              value={skills}
              onChange={this.handleSkillsClear}
              onKeyDown={this.handleSkillsChange}
              placeholder="Type your skill and press enter"
              errors={errors.skills}
              id="skills"
              styles={tagStyles}
              errorStyles={tagErrorStyles}
            />
          </div>
          <div className="thin-line" />
          <div className="profile__section">
            <h4>Contact</h4>
            <div className="profile__item--icon">
              <img className="icon--round mr-2" src={contact} />
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
            <div className="profile__item--icon">
              <img className="icon--round mr-2" src={mail} />
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
            <p className="link" onClick={() => this.addSocialLink()}>
              Add social link
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
  userExpertises: PropTypes.array,
  currentSkills: PropTypes.array,
  expertises: PropTypes.array,
}

export default EditUserProfile