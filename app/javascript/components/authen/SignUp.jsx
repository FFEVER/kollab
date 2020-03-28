import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  FormControlLabel,
  Checkbox,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  Link
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { SignUpValidator, defaultErrors } from "./SignUpValidator";

const DATA_PREFIX = "user";

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]";
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: defaultErrors,
      showPassword: false,
      showConfirmPassword: false,
      checkedAgreeCondition: false,
      submitted: false
    };

    this.handleCheckAgreeCondition = this.handleCheckAgreeCondition.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createFormData = this.createFormData.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleCheckAgreeCondition() {
    this.setState({
      checkedAgreeCondition: !this.state.checkedAgreeCondition
    });
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

  handleClickShowConfirmPassword() {
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword
    });
  }

  handleSubmit(event) {
    this.setState({ submitted: true });
    event.preventDefault();

    SignUpValidator.validateAll(this.state)
      .then(result => {
        this.setState({
          errors: defaultErrors
        });
        const formData = this.createFormData();
        this.submitForm(formData);
      })
      .catch(errors => {
        this.setState({
          errors: errors,
          submitted: false
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
    formData.append(dataName("name"), this.state.name);
    formData.append(dataName("email"), this.state.email);
    formData.append(dataName("password"), this.state.password);
    formData.append("authenticity_token", this.props.authenticityToken);
    return formData;
  }
  render() {
    return (
      <div className="d-flex flex-column mt-1">
        <FormControl
          variant="outlined"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Full Name
          </InputLabel>
          <OutlinedInput
            name="name"
            label={"Full Name"}
            required
            error={this.state.errors.name.length > 0 ? true : false}
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText
            error={this.state.errors.name.length > 0 ? true : false}
          >
            {this.state.errors.name[0]}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
          <OutlinedInput
            name="email"
            label={"E-mail"}
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

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            label={"Password"}
            required={true}
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
        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            name="confirmPassword"
            label="Confirm Password"
            required={true}
            error={this.state.errors.confirmPassword.length > 0 ? true : false}
            type={this.state.showConfirmPassword ? "text" : "password"}
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowConfirmPassword}
                  onMouseDown={this.handleMouseDownConfirmPassword}
                >
                  {this.state.showConfirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            error={this.state.errors.confirmPassword.length > 0 ? true : false}
          >
            {this.state.errors.confirmPassword[0]}
          </FormHelperText>
        </FormControl>

        <div className="d-flex flex-row">
          <FormControlLabel
            className="text"
            control={
              <Checkbox
                checked={this.state.checkedAgreeCondition}
                onChange={this.handleCheckAgreeCondition}
                color="primary"
              />
            }
            label="I agree to the "
            style={{ marginRight: "5px" }}
          />
          <Link
            className="text"
            underline="always"
            href="http://www.google.com"
            style={{
              fontSize: "1.2em",
              color: "#54bdc2",
              fontWeight: "bold",
              paddingTop: "5px"
            }}
          >
            Terms & Conditions
          </Link>
        </div>
        {!this.state.checkedAgreeCondition && this.state.submitted ? (
          <p className="text__one--red mb-3">
            You need to agree with terms and conditions
          </p>
        ) : (
          <div />
        )}
        <button
          className="button--gradient-green button--round"
          onClick={this.handleSubmit}
        >
          Sign Up
        </button>
      </div>
    );
  }
}

SignUp.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default SignUp;
