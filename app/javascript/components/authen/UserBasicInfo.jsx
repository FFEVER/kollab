import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { TagInput, tagsToArray, defaultStyles } from "../shared/form/TagInput"
import Button from "../shared/form/Button"
import ExpertiseModal from "../shared/ExpertiseModal"
import ExpertiseDisplay from "../shared/ExpertiseDisplay"
import { UserBasicInfoValidator, defaultErrors } from "./UserBasicInfoValidator"
import faculties from "../../../assets/utils/faculties"
import fields from "../../../assets/utils/fields"

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

class UserBasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      faculty: this.props.currentUser.faculty,
      year: this.props.currentUser.year,
      errors: defaultErrors,
      isButtonLoading: false,
      role:
        this.props.currentUser.role !== null ? this.props.currentUser.role : "",
      skills: this.setUserSkills(this.props.userSkills),
      activateModal: "division",
      expertises: this.setUserExpertises(this.props.userExpertises),
      expertise_ids: this.setExpertiseIds(),
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setUserSkills = this.setUserSkills.bind(this)
    this.setUserExpertises = this.setUserExpertises.bind(this)
    this.setExpertiseObject = this.setExpertiseObject.bind(this)
    this.setExpertiseIds = this.setExpertiseIds.bind(this)
    this.createFormData = this.createFormData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    this.handleAlignment = this.handleAlignment.bind(this)
    this.handleSkillsChange = this.handleSkillsChange.bind(this)
    this.handleSkillsClear = this.handleSkillsClear.bind(this)
    this.setDisplayExpertise = this.setDisplayExpertise.bind(this)
    this.removeExpertise = this.removeExpertise.bind(this)
    this.checkExpertise = this.checkExpertise.bind(this)
    this.getExpertise = this.getExpertise.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  setUserExpertises(obj) {
    let arry = []

    obj.map((exp) => {
      let i = this.props.allExpertises.find(
        (item) => item.id === exp.expertise_id
      )
      arry.push(this.setExpertiseObject(i))
    })

    return arry
  }

  setExpertiseObject(exp) {
    if (exp.parent_id === null) {
      return { division: exp.name, group: "", field: "", expertise_id: exp.id }
    } else {
      // Sup expertise
      let exps = this.props.allExpertises
      let parentExp = exps.find((item) => item.id === exp.parent_id)
      if (parentExp.parent_id === null) {
        return {
          division: parentExp.name,
          group: exp.name,
          field: "",
          expertise_id: exp.id,
        }
      } else {
        // Sup supexpertise
        let superParent = exps.find((item) => item.id === parentExp.parent_id)
        return {
          division: superParent.name,
          group: parentExp.name,
          field: exp.name,
          expertise_id: exp.id,
        }
      }
    }
  }

  setExpertiseIds() {
    let userExpertises = this.props.userExpertises
    let arry = []
    userExpertises.map((exp) => {
      let i = this.props.allExpertises.find(
        (item) => item.id === exp.expertise_id
      )
      arry.push(i.id)
    })
    return arry
  }

  setUserSkills(obj) {
    let arry = []
    obj.map((skill) => {
      let i = this.props.skills.find((item) => item.id === skill.skill_id)
      arry.push({ label: i.name, value: i.name })
    })
    return arry
  }

  handleSkillsChange(value) {
    this.setState({
      skills: [...this.state.skills, ...value],
    })
  }

  handleSkillsClear(value) {
    // Handle clear or delete skills
    this.setState({
      skills: value,
    })
  }

  setDisplayExpertise(value) {
    let items = this.state.expertises
    if (items.length === 0) {
      this.setState({
        expertises: [...this.state.expertises, value],
        expertise_ids: [...this.state.expertise_ids, value.expertise_id],
        activateModal: "division",
        division: "",
        group: "",
        field: "",
      })
    }

    if (!this.checkExpertise(value, items)) {
      this.setState({
        expertises: [...this.state.expertises, value],
        expertise_ids: [...this.state.expertise_ids, value.expertise_id],
        activateModal: "division",
        division: "",
        group: "",
        field: "",
      })
    }
  }

  removeExpertise(item) {
    let items = this.state.expertises
    let index = this.getExpertise(item, items)
    items.splice(items.indexOf(index), 1)

    this.setState({ expertises: items })
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

  handleSubmit(event) {
    event.preventDefault()
    this.setIsButtonLoading(true)

    UserBasicInfoValidator.validateAll(this.state)
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
        debugger
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
    formData.append(dataName("role"), this.state.role)
    formData.append(dataName("faculty"), this.state.faculty)
    formData.append(dataName("year"), this.state.year)
    formData.append(
      dataName("expertise_ids"),
      JSON.stringify(this.state.expertise_ids)
    )
    formData.append(
      dataName("skill_list"),
      JSON.stringify(tagsToArray(this.state.skills))
    )
    formData.append("authenticity_token", this.props.authenticityToken)
    return formData
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  handleAlignment(event, newRole) {
    if (newRole !== null) {
      this.setState({ role: newRole })
    }
  }

  render() {
    const {
      faculty,
      year,
      errors,
      isButtonLoading,
      role,
      skills,
      expertises,
      expertise_ids,
    } = this.state
    console.log("State ", this.state)
    return (
      <form
        className="d-flex flex-column mt-3"
        onSubmit={this.handleSubmit}
        noValidate
      >
        <h3>Role</h3>
        <div className="d-flex flex-column mt-2">
          <ToggleButtonGroup
            className="button--toggle"
            value={role}
            exclusive
            onChange={this.handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="professor"
              selected={role == "professor" ? true : false}
              style={{ width: "50%" }}
            >
              {role == "professor" ? <h5>Professor</h5> : <p>Professor</p>}
            </ToggleButton>
            <ToggleButton
              value="student"
              selected={role == "student" ? true : false}
              style={{ width: "50%" }}
            >
              {role == "student" ? <h5>Student</h5> : <p>Student</p>}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="mt-3">
          <h4>Faculty</h4>
          <div className="d-flex flex-column mt-3">
            <FormControl
              variant="outlined"
              error={errors.faculty.length > 0 ? true : false}
            >
              <InputLabel>Faculty</InputLabel>
              <Select
                name="faculty"
                value={faculty}
                label="Faculty"
                onChange={this.handleChange}
              >
                {faculties.map((fac, key) => (
                  <MenuItem key={key} value={fac.faculty}>
                    {fac.faculty}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={errors.faculty.length > 0 ? true : false}>
                {errors.faculty[0]}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        {role === "student" ? (
          <div className="d-flex flex-column mt-3">
            <h4>Year of Study</h4>
            <div className="d-flex flex-column mt-3">
              <FormControl
                variant="outlined"
                error={errors.year.length > 0 ? true : false}
              >
                <InputLabel>Year of study</InputLabel>
                <Select
                  name="year"
                  label="Year of study"
                  value={year}
                  onChange={this.handleChange}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"other"}>other</MenuItem>
                </Select>
                <FormHelperText error={errors.year.length > 0 ? true : false}>
                  {errors.year[0]}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
        ) : (
          <div />
        )}
        <ExpertiseModal
          expertises={this.props.allExpertises}
          setExpertiseDisplayFunc={this.setDisplayExpertise}
          disable={expertises.length > 2 ? true : false}
        />
        <FormHelperText error={errors.expertises.length > 0 ? true : false}>
          {errors.expertises[0]}
        </FormHelperText>
        {expertises.length > 0 ? (
          <ExpertiseDisplay
            expertises={expertises}
            removeExpertise={this.removeExpertise}
          />
        ) : (
          <div />
        )}
        <div className="form d-flex flex-column mt-3 mb-3">
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
        <Button
          type="submit"
          name="submitButton"
          isLoading={isButtonLoading}
          className="button--gradient-primary button--lg"
        >
          Done
        </Button>
      </form>
    )
  }
}

UserBasicInfo.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
  allExpertises: PropTypes.array,
  skills: PropTypes.any,
  userExpertises: PropTypes.any,
  userSkills: PropTypes.any,
}

export default UserBasicInfo
