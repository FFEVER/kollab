import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import { TagInput, tagsToArray } from "../../shared/form/TagInput"
import FormValidator from "./ProjectCreateFormValidator"
import FormInput from "../../shared/form/FormInput"

const DATA_PREFIX = "project"

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]"
}
const ERRORS = {
  title: [],
  shortDesc: [],
  startDate: [],
  endDate: [],
  tags: [],
  categories: []
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
      errors: ERRORS
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
        if (response.data.redirect_url !== undefined) {
          window.location.href = response.data.redirect_url
        }
        if (response.data.errors !== undefined) {
          this.setState(state => {
            let errors = ERRORS
            for (const [k, v] of Object.entries(response.data.errors)) {
              errors[k] = v
            }
            return {
              errors
            }
          })
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
    // TODO: [Anyone] Add fields
    const {
      title,
      shortDesc,
      startDate,
      endDate,
      categories,
      errors
    } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="project__form" noValidate>
        <div className="form-group">
          <FormInput
            name="title"
            label="Title:"
            type="text"
            placeholder="Enter title"
            onChange={this.handleChange}
            isRequired={true}
            value={title}
            className="form-control"
            errors={errors["title"]}
          />
        </div>

        <div className="form-group">
          <FormInput
            name="shortDesc"
            label="Short description:"
            type="text"
            placeholder="Enter a short description"
            onChange={this.handleChange}
            isRequired={true}
            value={shortDesc}
            className="form-control"
            errors={errors["shortDesc"]}
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
              errors={errors["startDate"]}
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
              errors={errors["endDate"]}
            />
          </div>
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-row">
          <label htmlFor="tags">Tags</label>
          <TagInput
            value={this.state.tags}
            onChange={this.handleTagClear}
            onKeyDown={this.handleTagChange}
            placeholder="Type something and press enter..."
            errors={errors["tags"]}
            id="projectTags"
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
