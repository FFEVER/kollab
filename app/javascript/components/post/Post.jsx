import React from "react"

import FromTextarea from "../shared/form/FormTextarea"
import Button from "../shared/form/Button"

import { PostValidator, defaultErrors } from "./PostValidator"

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: "",
      errors: defaultErrors,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.createFormData = this.createFormData.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setIsButtonLoading(true)

    PostValidator.validateAll(this.state)
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
    formData.append("authenticity_token", this.props.authenticityToken)
    return formData
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    const { post, errors } = this.state
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <FromTextarea
          name="post"
          placeholder="Update your project status"
          onChange={this.handleChange}
          value={post}
          className="form-control"
          errors={errors.post}
          rows="3"
        />
        <div className="d-flex flex-column align-items-end mt-3">
          <Button
            type="submit"
            name="submitButton"
            isLoading={this.state.isButtonLoading}
            className="button button--md button--gradient-primary"
          >
            Post
          </Button>
        </div>
      </form>
    )
  }
}

export default Post
