import React from "react"
import PropTypes from "prop-types"
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core"

const DATA_PREFIX = "user"

const dataName = (name) => {
  return DATA_PREFIX + "[" + name + "]"
}

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      emailError: { bool: false, error: "" },
      passwordError: { bool: false, error: "" },
      showPassword: false,
      checkedAgreeCondition: false,
    }
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkConditions = this.checkConditions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleMouseDownPassword(event) {
    event.preventDefault()
  }

  checkConditions() {
    this.state.email === ""
      ? this.setState({ emailError: { bool: true, error: "Required email" } })
      : this.setState({ emailError: { bool: false, error: "" } })

    this.state.password === ""
      ? this.setState({
          passwordError: { bool: true, error: "Required password" },
        })
      : this.setState({
          passwordError: { bool: false, error: "" },
        })
  }

  handleSubmit() {
    this.checkConditions()
  }

  render() {
    return (
      <div className="d-flex flex-column mt-1">
        <FormControl variant="outlined" style={{ marginTop: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
          <OutlinedInput
            name="email"
            label={this.state.emailError.bool ? "" : "E-mail"}
            required
            error={this.state.emailError.bool ? true : false}
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText error={this.state.emailError.bool ? true : false}>
            {this.state.emailError.error}
          </FormHelperText>
        </FormControl>
        <button
          className="button button--lg button--gradient-primary mt-3"
          onClick={this.handleSubmit}
        >
          Request Reset
        </button>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
}

export default ForgotPassword
