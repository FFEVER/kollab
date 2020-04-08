import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import {
  InputLabel,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@material-ui/core"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { TagInput, tagsToArray, defaultStyles } from "../shared/form/TagInput"
import Button from "../shared/form/Button"
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
      division: "",
      group: "",
      field: "",
      skills: [],
      checkedExpertise: { check: false, value: "" },
      activateModal: "division",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleModalNext = this.handleModalNext.bind(this)
    this.handleModalBack = this.handleModalBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createFormData = this.createFormData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    this.handleAlignment = this.handleAlignment.bind(this)
    this.handleSkillsChange = this.handleSkillsChange.bind(this)
    this.handleSkillsClear = this.handleSkillsClear.bind(this)
  }

  handleChange(event) {
    console.log("Event ", event)
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      activateModal: event.target.name,
    })
  }

  handleModalNext(value, field) {
    var currentField = this.state.activateModal
    this.setState({
      activateModal: value,
      [currentField]: field,
    })
  }

  handleModalBack(value, prev) {
    this.setState({
      activateModal: value,
      [prev]: "",
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
      division,
      group,
      field,
      skills,
      activateModal,
    } = this.state
    return (
      <form
        className="d-flex flex-column mt-3"
        onSubmit={this.handleSubmit}
        noValidate
      >
        {console.log("Current state ", this.state)}
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
          <Button
            name="expertise"
            type="button"
            className="button--textfield col-xs-2 mt-3 text-left"
            data-toggle="modal"
            data-target="#expertiseModal"
            style={{ color: expertise ? "black" : "#808080" }}
          >
            {expertise ? expertise : "Select your expertise"}
          </Button>
          <div
            name="expertise"
            className="modal fade"
            id="expertiseModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="expertiseModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="expertiseModalLabel">
                    Select your Expertise
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {activateModal === "division" ? (
                    fields.map((f, index) => (
                      <RadioGroup
                        key={index}
                        aria-label="division"
                        name="division"
                        value={division}
                        onChange={this.handleFieldChange}
                        className="d-flex flex-row flex-nowrap justify-content-between"
                      >
                        <FormControlLabel
                          value={f.Division}
                          control={<Radio color="default" />}
                          label={f.Division}
                        />
                        <Button
                          name="activateModal"
                          className="button--transparent"
                          onClick={() =>
                            this.handleModalNext("group", f.Division)
                          }
                        >
                          <ArrowForwardIosIcon />
                        </Button>
                      </RadioGroup>
                    ))
                  ) : (
                    <div />
                  )}
                  {activateModal === "group" ? (
                    <div>
                      {fields
                        .find((f) => f.Division === division)
                        .Groups.map((g, index) => (
                          <RadioGroup
                            key={index}
                            aria-label="group"
                            name="group"
                            value={group}
                            onChange={this.handleFieldChange}
                            className="d-flex flex-row flex-nowrap justify-content-between"
                          >
                            <div className="d-flex flex-row justify-content-center">
                              <Button
                                name="activateModal"
                                className="button--transparent"
                                onClick={() =>
                                  this.handleModalBack("division", "group")
                                }
                              >
                                <ArrowBackIosIcon />
                              </Button>
                              <FormControlLabel
                                value={g.Group}
                                control={<Radio color="default" />}
                                label={g.Group}
                              />
                            </div>

                            <Button
                              name="activateModal"
                              className="button--transparent"
                              onClick={() =>
                                this.handleModalNext("field", g.Group)
                              }
                            >
                              <ArrowForwardIosIcon />
                            </Button>
                          </RadioGroup>
                        ))}
                    </div>
                  ) : (
                    <div />
                  )}

                  {activateModal === "field" ? (
                    <div>
                      {fields
                        .find((f) => f.Division === division)
                        .Groups.find((g) => g.Group === group)
                        .Fields.map((s, index) => (
                          <RadioGroup
                            key={index}
                            aria-label="field"
                            name="field"
                            value={field}
                            onChange={this.handleFieldChange}
                            className="d-flex flex-row flex-nowrap justify-content-start"
                          >
                            <Button
                              name="activateModal"
                              className="button--transparent"
                              onClick={() =>
                                this.handleModalBack("group", "field")
                              }
                            >
                              <ArrowBackIosIcon />
                            </Button>
                            <FormControlLabel
                              value={s}
                              control={<Radio color="default" />}
                              label={s}
                            />
                          </RadioGroup>
                        ))}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="modal-footer">
                  <Button
                    name="expertise"
                    type="button"
                    className="button--gradient-green button--fullwidth"
                    data-dismiss="modal"
                    onClick={() =>
                      this.setState({ expertise: eval(activateModal) })
                    }
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
