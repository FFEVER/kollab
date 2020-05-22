import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import moment from "moment"

import { TagInput, tagsToArray } from "../shared/form/TagInput"
import { FormValidator, defaultErrors } from "./EditProjectValidator"
import FormInput from "../shared/form/FormInput"
import FromTextarea from "../shared/form/FormTextarea"
import Button from "../shared/form/Button"

const DATA_PREFIX = "project"

const dataName = (name) => {
  return DATA_PREFIX + "[" + name + "]"
}

class EditProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      tagIds: [],
      tagList: [],
      shortDesc: "",
      title: "",
      startDate: "",
      endDate: "",
      expertiseIds: [],
      expertises: [],
      errors: defaultErrors,
      isButtonLoading: false,
    }

    this.setTagList = this.setTagList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleTagClear = this.handleTagClear.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  componentDidMount() {
    let project = this.props.currentProject
    console.log("Props ", this.props)

    let exp_ids = []
    this.props.expertiseIds.map((item) => exp_ids.push(item.expertise_id))

    let exps = []
    exp_ids.map((id) => {
      let item = this.props.expertises.find((item) => item.id === id)
      exps.push(item)
    })

    let tagIds = []
    this.props.tagIds.map((item) => {
      tagIds.push(item.tag_id)
    })

    let tags = []
    tagIds.map((id) => {
      let item = this.props.tags.find((item) => item.id === id)
      tags.push(item)
    })

    this.setTagList(tags)

    this.setState({
      title: project.title,
      shortDesc: project.short_desc,
      startDate: moment(new Date(project.start_date)).format("yyyy-MM-DD"),
      endDate: moment(new Date(project.end_date)).format("yyyy-MM-DD"),
      expertiseIds: exp_ids,
      expertises: exps,
      tagIds: tagIds,
      tags: tags,
    })
  }

  setTagList(tags) {
    let list = []
    tags.map((item, key) => {
      let i = { label: item.name, value: item.name }
      list.push(i)
    })
    this.setState({ tagList: list })
    console.log("list ", list)
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

    formData.append(dataName("tag_list"), JSON.stringify(this.tadIds))

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
    } = this.state
    console.log("State ", this.state)
    return (
      <form onSubmit={this.handleSubmit} className="project__form" noValidate>
        <div className="form-group">
          <FormInput
            name="title"
            type="text"
            label="Title:"
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
            value={this.state.tagList}
            onChange={this.handleTagClear}
            onKeyDown={this.handleTagChange}
            placeholder="Type something and press enter..."
            errors={errors.tags}
            id="tags"
          />
        </div>

        <Button
          type="submit"
          name="submitButton"
          isLoading={isButtonLoading}
          className="button button--fixed-bottom button--lg button--gradient-primary"
        >
          Update Project
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

EditProject.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
  currentProject: PropTypes.object,
  expertiseIds: PropTypes.array,
  expertises: PropTypes.array,
  tagIds: PropTypes.array,
  tags: PropTypes.array,
}
export default EditProject
