import React from "react"
import PropTypes from "prop-types"
import TagInput from "./TagInput"

class ProjectCreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { project: this.props.project, tags: [] }

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
    // TODO: [Eit] Send ajax requests
    event.preventDefault()
  }

  render() {
    // TODO: [Eit] Add categories and tag
    return (
      <form onSubmit={this.handleSubmit} className="project__form">
        <div className="form-group">
          <label htmlFor="projectTitle">Title</label>
          <input
            type="text"
            name="title"
            id="projectTitle"
            className="form-control"
            placeholder="Enter title"
            onChange={this.handleChange}
            autoFocus={true}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="projectShortDesc">Short description</label>
          <input
            type="text"
            name="short_desc"
            id="projectShortDesc"
            className="form-control"
            placeholder="Enter a short description"
            onChange={this.handleChange}
          ></input>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="projectStartDate">Start date:</label>
            <input
              type="date"
              name="start_date"
              id="projectStartDate"
              className="form-control"
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="projectEndDate">End date:</label>
            <input
              type="date"
              name="end_date"
              id="projectEndDate"
              className="form-control"
              onChange={this.handleChange}
            ></input>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="projectEndDate">Categories</label>
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
  project: PropTypes.object
}
export default ProjectCreateForm
