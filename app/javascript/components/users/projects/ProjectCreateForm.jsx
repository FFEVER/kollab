import React from "react"
import PropTypes from "prop-types"
import { TagInput, tagsToArray } from "../../TagInput"
import axios from "axios"

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
      errors: []
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
    const { submitPath } = this.props
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

    axios
      .post(submitPath, formData)
      .then(response => {
        // TODO: [Anyone] Handle form error from server side validations
        if (response.data.errors !== undefined) {
          this.setState({ errors: response.data.errors })
        }
      })
      .catch(error => {
        // TODO: [Anyone] Handle error (other than 200 OK)
      })
  }

  handleErrorResponse(errors) {}

  render() {
    // TODO: [Eit] Add fields and tags
    // TODO: [Eit] Validates title short_desc length
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
          <div className="invalid-feedback">Title cannot be blank.</div>
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

        <button type="submit" className="button">
          Create
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
