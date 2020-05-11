import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import { FormHelperText } from "@material-ui/core"
import { TagInput, tagsToArray } from "../shared/form/TagInput"
import { FormValidator, defaultErrors } from "./ProjectCreateFormValidator"
import FormInput from "../shared/form/FormInput"
import FromTextarea from "../shared/form/FormTextarea"
import Button from "../shared/form/Button"
import ExpertiseModal from "../shared/ExpertiseModal"
import ExpertiseDisplay from "../shared/ExpertiseDisplay"

const DATA_PREFIX = "project"

const dataName = (name) => {
  return DATA_PREFIX + "[" + name + "]"
}

class ProjectCreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tagList: [],
      shortDesc: "",
      title: "",
      startDate: "",
      endDate: "",
      expertises: [],
      expertise_ids: [],
      errors: defaultErrors,
      isButtonLoading: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleTagClear = this.handleTagClear.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
    this.setDisplayExpertise = this.setDisplayExpertise.bind(this)
    this.removeExpertise = this.removeExpertise.bind(this)
    this.checkExpertise = this.checkExpertise.bind(this)
    this.getExpertise = this.getExpertise.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTagChange(value) {
    this.setState({
      tagList: [...this.state.tagList, ...value],
    })
  }

  handleTagClear(value) {
    // Handle clear or delete tags
    this.setState({
      tagList: value,
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

  removeExpertise(event, item) {
    event.preventDefault()

    let items = this.state.expertises
    let ids = this.state.expertise_ids
    let index = this.getExpertise(item, items)
    items.splice(index, 1)
    ids.splice(index, 1)
    this.setState({ expertises: items, expertise_ids: ids })
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

    FormValidator.validateAll(this.state)
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

  createFormData() {
    const formData = new FormData()
    formData.append(dataName("title"), this.state.title)
    formData.append(dataName("short_desc"), this.state.shortDesc)

    const startDate = new Date(this.state.startDate)
    if (!isNaN(startDate.getDate()))
      formData.append(dataName("start_date"), startDate)

    const endDate = new Date(this.state.endDate)
    if (!isNaN(endDate.getDate()))
      formData.append(dataName("end_date"), endDate)

    formData.append(
      dataName("expertise_ids"),
      JSON.stringify(this.state.expertise_ids)
    )

    formData.append(
      dataName("tag_list"),
      JSON.stringify(tagsToArray(this.state.tagList))
    )

    formData.append("authenticity_token", this.props.authenticityToken)
    return formData
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
        if (response.status === 201)
          window.location.href = response.headers.location
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

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    // TODO: [Anyone] Add fields
    const {
      title,
      shortDesc,
      startDate,
      endDate,
      categories,
      errors,
      isButtonLoading,
      expertises,
    } = this.state
    console.log("state ", this.state)
    return (
      <form onSubmit={this.handleSubmit} className="project__form" noValidate>
        <div className="form-group">
          <FormInput
            name="title"
            type="text"
            label="Title"
            placeholder="Enter title"
            onChange={this.handleChange}
            isRequired={true}
            value={title}
            className="form-control"
            errors={errors.title}
          />
        </div>

        <div className="form-group">
          <FromTextarea
            name="shortDesc"
            label="Short description:"
            placeholder="Enter a short description"
            onChange={this.handleChange}
            isRequired={true}
            value={shortDesc}
            className="form-control"
            errors={errors.shortDesc}
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group form__date">
            <FormInput
              name="startDate"
              label="Start date:"
              type="date"
              onChange={this.handleChange}
              value={startDate}
              className="form-control"
              errors={errors.startDate}
            />
          </div>

          <div className="form-group form__date">
            <FormInput
              name="endDate"
              label="End date:"
              type="date"
              onChange={this.handleChange}
              value={endDate}
              className="form-control"
              errors={errors.endDate}
            />
          </div>
        </div>

        {/* <div className="form-row">
          <div className="form-group">
            <label htmlFor="categories">Categories *</label>
            <input
              type="text"
              name="categories"
              id="categories"
              className="form-control"
              onChange={this.handleChange}
              value={categories}
            ></input>
          </div>
        </div> */}

        <ExpertiseModal
          className="project__expertise"
          expertises={this.props.expertises}
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
        <div className="form-row">
          <div className="d-flex flex-row mt-2 mb-2">
            <h4>Tags</h4>
            <h6>*</h6>
          </div>
          <TagInput
            value={this.state.tagList}
            onChange={this.handleTagClear}
            onKeyDown={this.handleTagChange}
            placeholder="Type something and press enter..."
            errors={errors.tagList}
            id="tagList"
          />
        </div>

        <Button
          type="submit"
          name="submitButton"
          isLoading={isButtonLoading}
          className="button button--fixed-bottom button--lg button--gradient-primary"
        >
          Create a Project
        </Button>

        <input
          type="hidden"
          name="authenticity_token"
          value={this.props.authenticityToken}
        ></input>
      </form>
    )
  }
}

ProjectCreateForm.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  expertises: PropTypes.array,
}
export default ProjectCreateForm
