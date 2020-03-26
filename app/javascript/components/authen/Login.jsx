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
import { LoginValidator, defaultErrors } from "./LoginValidator";
import Button from "../shared/form/Button";

const DATA_PREFIX = "user";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
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
    this.createFormData = this.createFormData.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
        emailError: { bool: true, error: "Invalid form of e-mail" }
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
        passwordError: { bool: true, error: "Invalid form of password" }
      });
    } else {
      return this.setState({
        passwordError: { bool: false, error: "" }
      });
    }
  }

  handleSubmit(event) {
    this.emailConditions();
    this.passwordConditions();
    console.log("handleSubmit");
    event.preventDefault();

    LoginValidator.validateAll(this.state)
      .then(result => {
        const formData = this.createFormData();
        this.submitForm(formData);
      })
      .catch(errors => {
        this.setState({
          errors: errors
        });
      });
  }

  submitForm(formData) {
    console.log("submitForm");

    const { submitPath } = this.props;
    axios({
      method: "post",
      url: submitPath,
      responseType: "json",
      data: formData
    })
      .then(response => {
        if (response.data.redirect_url !== undefined) {
          window.location.href = response.data.redirect_url;
        }
        if (response.data.errors !== undefined) {
          this.setState(state => {
            let errors = defaultErrors;
            for (const [k, v] of Object.entries(response.data.errors)) {
              errors[k] = v;
            }
            return {
              errors
            };
          });
        }
      })
      .catch(error => {
        // this.setIsButtonLoading(false);
      });
  }

  createFormData() {
    console.log("createFormData");
    const formData = new FormData();
    formData.append(dataName("email"), this.state.email);
    formData.append(dataName("password"), this.state.password);
    formData.append("authenticity_token", this.props.authenticityToken);
    return formData;
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
  submitPath: PropTypes.string,
  forgetPasswordPath: PropTypes.string,
  signUpPath: PropTypes.string
};

export default Login;
