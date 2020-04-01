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
import Button from "../shared/form/Button";

const DATA_PREFIX = "user";

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]";
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: defaultErrors,
      showPassword: false,
      showConfirmPassword: false,
      checkedAgreeCondition: false,
      isButtonLoading: false
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
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this);
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
    event.preventDefault();
    this.setIsButtonLoading(true);

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
          errors: errors
        });
        this.setIsButtonLoading(false);
      });
  }

  submitForm(formData) {
    const { submitPath } = this.props;
    axios({
      method: "post",
      url: submitPath,
      responseType: "json",
      headers: {
        Accept: "application/json"
      },
      data: formData
    })
      .then(response => {
        console.log("response.headers.location ", response);
        if (response.status === 201) {
          console.log("response.headers.location ", response);
          // window.location.href = response.headers.location;
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState(state => {
            let error_messages = error.response.data.messages;
            let errors = defaultErrors;
            for (const [k, v] of Object.entries(error_messages)) {
              errors[k] = v;
            }
            return {
              errors
            };
          });
        }
      })
      .finally(() => {
        this.setIsButtonLoading(false);
      });
  }

  createFormData() {
    const formData = new FormData();
    formData.append(dataName("first_name"), this.state.firstName);
    formData.append(dataName("last_name"), this.state.lastName);
    formData.append(dataName("email"), this.state.email);
    formData.append(dataName("password"), this.state.password);
    formData.append("authenticity_token", this.props.authenticityToken);
    return formData;
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading });
  }

  render() {
    return (
      <form
        className="d-flex flex-column mt-1"
        onSubmit={this.handleSubmit}
        noValidate
      >
        <FormControl
          variant="outlined"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            First Name
          </InputLabel>
          <OutlinedInput
            name="firstName"
            label={"First Name"}
            required
            error={this.state.errors.firstName.length > 0 ? true : false}
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText
            error={this.state.errors.firstName.length > 0 ? true : false}
          >
            {this.state.errors.firstName[0]}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Last Name
          </InputLabel>
          <OutlinedInput
            name="lastName"
            label={"Last Name"}
            required
            error={this.state.errors.lastName.length > 0 ? true : false}
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText
            error={this.state.errors.lastName.length > 0 ? true : false}
          >
            {this.state.errors.lastName[0]}
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
            label="I agree to the"
            style={{ marginRight: "5px" }}
          />
          <Link
            className="link"
            href="#"
            style={{
              fontSize: "1.2em",
              paddingTop: "8px"
            }}
          >
            Terms & Conditions
          </Link>
        </div>

        {this.state.errors.checkedAgreeCondition.length > 0 ? (
          <p className="text__one--red mb-3">
            {this.state.errors.checkedAgreeCondition[0]}
          </p>
        ) : null}

        <Button
          type="submit"
          name="submitButton"
          isLoading={this.state.isButtonLoading}
          className="button--gradient-green button--round"
        >
          Sign Up
        </Button>
      </form>
    );
  }
}

SignUp.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default SignUp;
