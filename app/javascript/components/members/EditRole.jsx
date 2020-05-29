import React from "react"
import PropTypes from "prop-types"

import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"
import Button from "../shared/form/Button"
import ExpertiseModal from "../shared/ExpertiseModal"
import ExpertiseDisplay from "../shared/ExpertiseDisplay"

import { AddRoleValidator, defaultErrors } from "./AddRoleValidator"
import { TagInput, tagsToArray, defaultStyles } from "../shared/form/TagInput"
import FormInput from "../shared/form/FormInput"

import phone from "../../images/icon/phone-call.png"
import mail from "../../images/icon/mail.png"
import instagram from "../../images/icon/instagram.png"
import anya from "../../images/anya.jpg"

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

const constUser = {
  first: "Kasamabhorn",
  last: "Suparerkrat",
  phone: "061 234 5678",
  mail: "kanasamabhorn@kmitl.ac.th",
  instagram: "kasamabhorn.ks",
  socialLinks: [{ id: 1, social: "Instagram", name: "anya.ks" }],
}

const constRoles = ["React Developer", "UX/UI Design", "Ruby on Rails"]

const constRole = {
  id: 1,
  name: "UX/UI Designer",
  expertiseIds: [1, 2],
  expertises: ["Graphic Design", "Design"],
  skillIds: [1, 2],
  skills: ["UserExperience", "Protptyping"],
  description: "- Has a strong passion \n- Experienced using Zeplin",
  status: "Open",
}

const statuses = [
  "completed",
  "in progress",
  "cancelled",
  "on hold",
  "intiating",
]

const roleStatuses = ["Open", "Close"]

class EditRole extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Pet feeder",
      expertises: this.props.expertises,
      skills: [
        { label: "Hardware", name: "hardware" },
        { label: "Application", name: "application" },
      ],
      description: "Pet feeder machine and tracking by a mobile app",
      status: "Open",
      userExpertises: [],
      isButtonLoading: false,
      errors: defaultErrors,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSkillsChange = this.handleSkillsChange.bind(this)
    this.handleSkillsClear = this.handleSkillsClear.bind(this)
    this.setDisplayExpertise = this.setDisplayExpertise.bind(this)
    this.removeExpertise = this.removeExpertise.bind(this)
    this.checkExpertise = this.checkExpertise.bind(this)
    this.getExpertise = this.getExpertise.bind(this)
    this.filterExpertiseId = this.filterExpertiseId.bind(this)
    this.setUserExpertises = this.setUserExpertises.bind(this)
    this.convertExpertiesForDisplay = this.convertExpertiesForDisplay.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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

  removeExpertise(event, item) {
    event.preventDefault()

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
    AddRoleValidator.validateAll(this.state)
      .then((result) => {
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

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    const { currentUser } = this.props
    const {
      name,
      expertises,
      skills,
      description,
      status,
      userExpertises,
      errors,
      isButtonLoading,
    } = this.state
    return (
      <form onSubmit={this.handleSubmit} noValidate className="mb-5">
        <div className="setting__role__section ">
          <h2>Edit role</h2>
        </div>
        <div className="setting__role__section">
          <FormInput
            id="name"
            name="name"
            label="Name"
            placeholder="Role name"
            type="text"
            value={name}
            className="form-control fix-height"
            onChange={this.handleChange}
            errors={errors.name}
          />
        </div>
        <ExpertiseModal
          expertises={expertises}
          setExpertiseDisplayFunc={this.setDisplayExpertise}
          disable={userExpertises.length > 2 ? true : false}
        />{" "}
        {/* <FormHelperText error={errors.userExpertises.length > 0 ? true : false}>
          {errors.userExpertises[0]}
        </FormHelperText> */}
        {userExpertises.length > 0 ? (
          <ExpertiseDisplay
            expertises={userExpertises}
            removeExpertise={this.removeExpertise}
          />
        ) : (
          <div />
        )}
        <div className="setting__role__section">
          <div className="setting__role__title">
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
        </div>
        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Description</h4>
          </div>
          <TextField
            name={"description"}
            multiline
            rows="4"
            defaultValue={description}
            variant="outlined"
            onChange={this.handleChange}
          />
        </div>
        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Status</h4>
          </div>
          <FormControl variant="outlined" size="small">
            <Select
              name="roleStatus"
              value={status}
              onChange={this.handleChange}
              //   error={errors.faculty.length > 0 ? true : false}
            >
              <MenuItem value="">
                <em>Select a project status</em>
              </MenuItem>
              {roleStatuses.map((s, key) => (
                <MenuItem key={key} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormHelperText error={errors.status.length > 0 ? true : false}>
            {errors.status[0]}
          </FormHelperText> */}
        </div>
        <Button
          type="submit"
          name="submitButton"
          isLoading={isButtonLoading}
          className="button button--fixed-bottom button--lg button--gradient-primary"
        >
          Create a Role
        </Button>
      </form>
    )
  }
}

EditRole.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  user: PropTypes.object,
  role: PropTypes.object,
}

export default EditRole
