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

import GradientButton from "react-linear-gradient-button";

import kollab from "../images/kollab-blue.png";
const DATA_PREFIX = "user";

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]";
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      emailError: { bool: false, error: "" },
      passwordError: { bool: false, error: "" },
      confirmPasswordError: { bool: false, error: "" },
      showPassword: false,
      checkedAgreeCondition: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkConditions = this.checkConditions.bind(this);
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

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  checkConditions() {
    this.state.email === ""
      ? this.setState({ emailError: { bool: true, error: "Required email" } })
      : this.setState({ emailError: { bool: false, error: "" } });

    this.state.password === ""
      ? this.setState({
          passwordError: { bool: true, error: "Required password" }
        })
      : this.setState({
          passwordError: { bool: false, error: "" }
        });
  }

  handleSubmit() {
    this.checkConditions();
  }

  render() {
    return (
      <div>
        <h2>Welcome to</h2>
        <img className="logo" src={kollab} style={{ width: "150px" }} />
        <h1>Reset Password</h1>

        <FormControl
          variant="outlined"
          style={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            label={this.state.passwordError.bool ? "" : "Password"}
            required={true}
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
        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            name="confirmPassword"
            label="Confirm Password"
            required={true}
            error={this.state.confirmPasswordError.bool ? true : false}
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
            error={this.state.confirmPasswordError.bool ? true : false}
          >
            {this.state.confirmPasswordError.error}
          </FormHelperText>
        </FormControl>

        <GradientButton
          gradient={["#54bdc2", "#5edbb8"]}
          color="white"
          background="#54bdc2"
          style={{ marginBottom: "20px" }}
          onClick={this.handleSubmit}
        >
          Request Reset
        </GradientButton>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default ResetPassword;
