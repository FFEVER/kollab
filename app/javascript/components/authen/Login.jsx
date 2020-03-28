import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { LoginValidator, defaultErrors } from "./LoginValidator";

const DATA_PREFIX = "user";

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]";
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: defaultErrors,
      showPassword: false,
      checkedAgreeCondition: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();

    LoginValidator.validateAll(this.state)
      .then(result => {
        this.setState({
          errors: defaultErrors
        });
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
            error={this.state.errors.email.length > 0 ? true : false}
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
