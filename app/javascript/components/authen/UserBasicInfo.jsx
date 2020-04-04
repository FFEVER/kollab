import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { TagInput, tagsToArray, defaultStyles } from "../shared/form/TagInput"
import { UserBasicInfoValidator, defaultErrors } from "./UserBasicInfoValidator"
import faculties from "../../../assets/utils/faculties"
import fields from "../../../assets/utils/fields"
import CreatableSelect from "react-select/creatable"

import Button from "../shared/form/Button"

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
    boxShadow: state.isFocused ? "0 0 3px #ce7171" : "",
    cursor: "text",
    "&:hover": {
      borderColor: "#c2c2c2",
    },
    marginTop: "10px",
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
      expertise: "",
      field: "",
      subfield: "",
      skills: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createFormData = this.createFormData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    this.handleAlignment = this.handleAlignment.bind(this)
    this.handleExpertiseChange = this.handleExpertiseChange.bind(this)
    this.handleExpertiseClear = this.handleExpertiseClear.bind(this)
    this.handleSkillsChange = this.handleSkillsChange.bind(this)
    this.handleSkillsClear = this.handleSkillsClear.bind(this)
  }

  handleCheckAgreeCondition() {
    this.setState({
      checkedAgreeCondition: !this.state.checkedAgreeCondition,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleExpertiseChange(value) {
    this.setState({
      expertise: [...this.state.expertise, ...value],
    })
  }

  handleExpertiseClear(value) {
    // Handle clear or delete expertise
    this.setState({
      expertise: value,
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
      expertise,
      field,
      subfield,
      skills,
    } = this.state
    return (
      <form
        className="d-flex flex-column mt-3"
        onSubmit={this.handleSubmit}
        noValidate
      >
        {" "}
        <h3>Roll</h3>
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
            <FormControl variant="outlined">
              <InputLabel>{faculty ? "" : "Select your faculty"}</InputLabel>
              <Select
                name="faculty"
                value={faculty}
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
            </FormControl>
          </div>
        </div>
        <div className="d-flex flex-column mt-3">
          <h4>Year of Study</h4>
          <div className="d-flex flex-column mt-3">
            <FormControl variant="outlined">
              <InputLabel>{year ? "" : "Select year of study"}</InputLabel>
              <Select name="year" value={year} onChange={this.handleChange}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={"other"}>other</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form d-flex flex-column mt-3">
          <h4>Expertise</h4>
          {/* <TagInput
            className="mt-3"
            value={expertise}
            onChange={this.handleExpertiseClear}
            onKeyDown={this.handleExpertiseChange}
            placeholder="Type something and press enter..."
            errors={errors.expertise}
            id="expertise"
            styles={tagStyles}
          /> */}

          <div className="d-flex flex-column mt-3">
            <FormControl variant="outlined">
              <InputLabel>
                {expertise ? "" : "Select your expertise"}
              </InputLabel>
              <Select
                name="expertise"
                value={expertise}
                onChange={this.handleChange}
              >
                {fields.map((item, index) => (
                  <MenuItem key={index} value={item.Division}>
                    {item.Division}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {expertise ? (
          <div className="form d-flex flex-column mt-3">
            <h4>Field</h4>

            <div className="d-flex flex-column mt-3">
              <FormControl variant="outlined">
                <InputLabel>{field ? "" : "Select your expertise"}</InputLabel>
                <Select name="field" value={field} onChange={this.handleChange}>
                  {fields
                    .find((f) => f.Division === expertise)
                    .Groups.map((item, index) => (
                      <MenuItem key={index} value={item.Group}>
                        {item.Group}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
        ) : (
          <div />
        )}
        {field ? (
          <div className="form d-flex flex-column mt-3">
            <h4>Subfield</h4>
            {console.log("field ", field)}
            <div className="d-flex flex-column mt-3">
              <FormControl variant="outlined">
                <InputLabel>
                  {subfield ? "" : "Select your expertise"}
                </InputLabel>
                <Select
                  name="subfield"
                  value={subfield}
                  onChange={this.handleChange}
                >
                  {fields
                    .find((f) => f.Division === expertise)
                    .Groups.find((g) => g.Group === field)
                    .Fields.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                        {console.log("subfield ", item)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
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
            placeholder="Type something and press enter..."
            errors={errors.skills}
            id="skills"
            styles={tagStyles}
          />
        </div>
        <Button
          type="submit"
          name="submitButton"
          isLoading={isButtonLoading}
          className="button--gradient-green button--round"
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
