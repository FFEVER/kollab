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
      faculty: "",
      year: "",
      errors: defaultErrors,
      isButtonLoading: false,
      roll: "student",
      skills: [],
      activateModal: "division",
      expertises: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createFormData = this.createFormData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    this.handleAlignment = this.handleAlignment.bind(this)
    this.handleSkillsChange = this.handleSkillsChange.bind(this)
    this.handleSkillsClear = this.handleSkillsClear.bind(this)
    this.setDisplayExpertise = this.setDisplayExpertise.bind(this)
    this.removeExpertise = this.removeExpertise.bind(this)
    this.checkExpertise = this.checkExpertise.bind(this)
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
    // Handle clear or delete skills
    this.setState({
      skills: value,
    })
  }

  setDisplayExpertise(value) {
    var items = this.state.expertises
    if (items.length === 0) {
      this.setState({
        expertises: [...this.state.expertises, value],
        activateModal: "division",
        division: "",
        group: "",
        field: "",
      })
    }

    for (let i = 0; i < items.length; i++) {
      if (!this.checkExpertise(value, items[i])) {
        this.setState({
          expertises: [...this.state.expertises, value],
          activateModal: "division",
          division: "",
          group: "",
          field: "",
        })
      }
    }
  }

  removeExpertise(item) {
    var items = this.state.expertises
    for (let i = 0; i < items.length; i++) {
      if (this.checkExpertise(item, items[i])) {
        items.splice(items.indexOf(i), 1)
      }
    }
    this.setState({ expertises: items })
  }

  checkExpertise(item1, item2) {
    if (
      item1[0] === item2[0] &&
      item1[1] === item2[1] &&
      item1[2] === item2[2]
    ) {
      return true
    }
    return false
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
      method: "post",
      url: submitPath,
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
      data: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = response.headers.location
        }
      })
      .catch((error) => {
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
    formData.append(dataName("first_name"), this.state.firstName)
    formData.append(dataName("last_name"), this.state.lastName)
    formData.append(dataName("email"), this.state.email)
    formData.append(dataName("password"), this.state.password)
    formData.append("authenticity_token", this.props.authenticityToken)
    return formData
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  handleAlignment(event, newAlignment) {
    this.setState({ roll: newAlignment })
  }

  render() {
    const {
      faculty,
      year,
      errors,
      isButtonLoading,
      roll,
      skills,
      expertises,
    } = this.state
    return (
      <form
        className="d-flex flex-column mt-3"
        onSubmit={this.handleSubmit}
        noValidate
      >
        {console.log("Statee after", this.state)}
        <h3>Role</h3>
        <div className="d-flex flex-column mt-2">
          <ToggleButtonGroup
            className="button--toggle"
            value={roll}
            exclusive
            onChange={this.handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="professor"
              selected={roll == "professor" ? true : false}
              style={{ width: "50%" }}
            >
              {roll == "professor" ? <h5>Professor</h5> : <p>Professor</p>}
            </ToggleButton>
            <ToggleButton
              value="student"
              selected={roll == "student" ? true : false}
              style={{ width: "50%" }}
            >
              {roll == "student" ? <h5>Student</h5> : <p>Student</p>}
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
                {faculties.map((fac) =>
                  fac.departments.map((dep, id) => (
                    <MenuItem key={id} value={dep}>
                      {dep}
                    </MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText error={errors.faculty.length > 0 ? true : false}>
                {errors.faculty[0]}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        {roll === "student" ? (
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
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
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
          expertises={expertises}
          setExpertiseDisplayFunc={this.setDisplayExpertise}
          disable={expertises.length > 2 ? true : false}
        />
        <FormHelperText error={errors.expertise.length > 0 ? true : false}>
          {errors.expertise[0]}
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
}

export default UserBasicInfo