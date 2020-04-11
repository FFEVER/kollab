import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

import Button from "../shared/form/Button"

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { LoginValidator, defaultErrors } from "./LoginValidator"

const DATA_PREFIX = "user"

const dataName = (name) => {
  return DATA_PREFIX + "[" + name + "]"
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      errors: defaultErrors,
      showPassword: false,
      isButtonLoading: false,
    }

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createFormData = this.createFormData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setIsButtonLoading(true)

    LoginValidator.validateAll(this.state)
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
        if (response.status === 200) {
          window.location.href = response.headers.location
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState((state) => {
            let error_message = error.response.data.error
            let errors = defaultErrors
            errors.password.push(error_message)
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
    formData.append(dataName("email"), this.state.email)
    formData.append(dataName("password"), this.state.password)
    formData.append("authenticity_token", this.props.authenticityToken)
    return formData
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="d-flex flex-column mt-3"
        noValidate
      >
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
          <OutlinedInput
            name="email"
            label="E-mail"
            required
            error={this.state.errors.email.length > 0 ? true : false}
            type="email"
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText
            error={this.state.errors.email.length > 0 ? true : false}
          >
            {this.state.errors.email[0]}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{ marginTop: "15px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            label="Password"
            required
            error={this.state.errors.password.length > 0 ? true : false}
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            error={this.state.errors.password.length > 0 ? true : false}
          >
            {this.state.errors.password[0]}
          </FormHelperText>
        </FormControl>

        <div className="d-flex flex-column mt-3 align-items-end ">
          <a className="link" href={this.props.forgotPasswordUrl}>
            Forgot password?
          </a>
        </div>
        <Button
          name="submitButton"
          type="submit"
          className="button button--lg button--gradient-primary mt-3"
          isLoading={this.state.isButtonLoading}
        >
          Login
        </Button>
      </form>
    )
  }
}

Login.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  forgotPasswordUrl: PropTypes.string,
}

export default Login
