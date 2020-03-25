import React from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const DATA_PREFIX = "user";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: { bool: false, error: "" },
      passwordError: { bool: false, error: "" },
      showPassword: false,
      checkedAgreeCondition: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.emailConditions = this.emailConditions.bind(this);
    this.passwordConditions = this.passwordConditions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  emailConditions() {
    var mail = this.state.email;
    var at = mail.indexOf("@");
    var dot = mail.indexOf(".");

    if (mail == "") {
      this.setState({ emailError: { bool: true, error: "Require e-mail" } });
    } else if (at == -1 || dot == -1) {
      this.setState({
        emailError: { bool: true, error: "Invalid e-mail format" }
      });
    } else if (dot < at) {
      this.setState({
        emailError: { bool: true, error: "Invalid e-mail format" }
      });
    } else {
      return this.setState({
        emailError: { bool: false, error: "" }
      });
    }
  }

  passwordConditions() {
    var password = this.state.password;
    if (password == "") {
      this.setState({
        passwordError: { bool: true, error: "Require password" }
      });
    } else if (password.length < 8) {
      this.setState({
        passwordError: { bool: true, error: "Invalid password" }
      });
    } else {
      return this.setState({
        passwordError: { bool: false, error: "" }
      });
    }
  }

  handleSubmit() {
    this.emailConditions();
    this.passwordConditions();
  }

  render() {
    return (
      <div className="d-flex flex-column mt-3">
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
          <OutlinedInput
            name="email"
            label="E-mail"
            required
            error={this.state.emailError.bool ? true : false}
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText error={this.state.emailError.bool ? true : false}>
            {this.state.emailError.error}
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
            error={this.state.passwordError.bool ? true : false}
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
          <FormHelperText error={this.state.passwordError.bool ? true : false}>
            {this.state.passwordError.error}
          </FormHelperText>
        </FormControl>
        <div className="d-flex flex-column mt-3 align-items-end ">
          <a
            className="link"
            href={`http://localhost:5000${this.props.forgetPasswordPath}`}
          >
            Forget password?
          </a>
        </div>
        <button
          className="button--gradient-green button--round mt-3"
          onClick={this.handleSubmit}
        >
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  authenticityToken: PropTypes.string,
  forgetPasswordPath: PropTypes.string,
  signUpPath: PropTypes.string
};

export default Login;
