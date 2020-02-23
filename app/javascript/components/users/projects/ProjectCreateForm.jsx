import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import { TagInput, tagsToArray } from "../../TagInput"
import FormValidator from "./ProjectCreateFormValidator"

const DATA_PREFIX = "project"

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]"
}

class ProjectCreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      shortDesc: "",
      title: "",
      startDate: "",
      endDate: "",
      errors: {
        title: [],
        shortDesc: [],
        startDate: [],
        endDate: [],
        tags: [],
        categories: []
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleTagClear = this.handleTagClear.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTagChange(value) {
    // Append tag to current tags
    this.setState({
      tags: [...this.state.tags, value]
    })
  }

  handleTagClear(value) {
    // Handle clear or delete tags
    this.setState({
      tags: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.loadingSubmitButton()

    FormValidator.validateAll(this.state)
      .then(result => {
        const formData = this.createFormData()
        this.submitForm(formData)
      })
      .catch(errors => {
        this.setState({
          errors: errors
        })
        this.unloadingSubmitButton()
      })
  }

  createFormData() {
    const formData = new FormData()
    formData.append(dataName("title"), this.state.title)
    formData.append(dataName("short_desc"), this.state.shortDesc)
    formData.append(dataName("start_date"), this.state.startDate)
    formData.append(dataName("end_date"), this.state.endDate)
    formData.append(
      dataName("tags"),
      JSON.stringify(tagsToArray(this.state.tags))
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
      data: formData
    })
      .then(response => {
        console.log(response)
        // TODO: [Anyone] Handle form error from server side validations
        if (response.data.redirect_url !== undefined) {
          window.location.href = response.data.redirect_url
        }
        if (response.data.errors !== undefined) {
          this.setState({ errors: response.data.errors })
          this.unloadingSubmitButton()
        }
      })
      .catch(error => {
        // TODO: [Anyone] Handle error (other than 200 OK)
      })
  }

  loadingSubmitButton() {
    $(".submit-body").hide()
    $(".submit-body-loading").removeAttr("hidden")
  }

  unloadingSubmitButton() {
    $(".submit-body").show()
    $(".submit-body-loading").hide()
  }

  render() {
    // TODO: [Eit] Add fields and tags
    // TODO: [Eit] Validates title short_desc length
    const { errors } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="project__form" noValidate>
        <div className="form-group">
          <label htmlFor="projectTitle">Title *</label>

          <input
            type="text"
            name="title"
            id="projectTitle"
            className="form-control"
            placeholder="Enter title"
            onChange={this.handleChange}
            autoFocus={true}
            required
          ></input>

          {errors["title"].map((message, object) => (
            <p key={object} className="error-message">
              <small>Title {message}</small>
            </p>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="projectShortDesc">Short description *</label>
          <input
            type="text"
            name="shortDesc"
            id="projectShortDesc"
            className="form-control"
            placeholder="Enter a short description"
            onChange={this.handleChange}
            required
          ></input>
          {errors["shortDesc"].map((message, object) => (
            <p key={object} className="error-message">
              <small>Short description {message}</small>
            </p>
          ))}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="projectStartDate">Start date:</label>
            <input
              type="date"
              name="startDate"
              id="projectStartDate"
              className="form-control"
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="projectEndDate">End date:</label>
            <input
              type="date"
              name="endDate"
              id="projectEndDate"
              className="form-control"
              onChange={this.handleChange}
            ></input>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="projectEndDate">Categories *</label>
            <input
              type="text"
              name="categories"
              id="projectCategories"
              className="form-control"
              onChange={this.handleChange}
            ></input>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="projectEndDate">Tags</label>
          <TagInput
            value={this.state.tags}
            onChange={this.handleTagClear}
            onKeyDown={this.handleTagChange}
          />
        </div>

        <button
          type="submit"
          className="button button--fixed-bottom button--long button--gradient-green"
        >
          <div className="submit-body">Create a Project</div>
          <div className="submit-body-loading" hidden>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Loading...</span>
          </div>
        </button>

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
  submitPath: PropTypes.string
}
export default ProjectCreateForm
