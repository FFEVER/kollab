import React from "react";
import PropTypes from "prop-types";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from "@material-ui/core/Link";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import GradientButton from "react-linear-gradient-button";

import kollab from "../images/kollab-blue.png";
const DATA_PREFIX = "project";

const dataName = name => {
  return DATA_PREFIX + "[" + name + "]";
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullnameError: { bool: false, error: "" },
      emailError: { bool: false, error: "" },
      passwordError: { bool: false, error: "" },
      confirmPasswordError: { bool: false, error: "" },
      showPassword: false,
      showConfirmPassword: false,
      checkedAgreeCondition: false
    };
    this.handleCheckAgreeCondition = this.handleCheckAgreeCondition.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkConditions = this.checkConditions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  handleClickShowConfirmPassword() {
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword
    });
  }
  handleMouseDownConfirmPassword(event) {
    event.preventDefault();
  }

  checkConditions() {
    this.state.fullname === ""
      ? this.setState({
          fullnameError: { bool: true, error: "Required Full Name" }
        })
      : this.setState({
          fullnameError: { bool: false, error: "" }
        });

    this.state.email === ""
      ? this.setState({ emailError: { bool: true, error: "Required E-mail" } })
      : this.setState({ emailError: { bool: false, error: "" } });

    this.state.password === ""
      ? this.setState({
          passwordError: { bool: true, error: "Required Password" }
        })
      : this.setState({
          passwordError: { bool: false, error: "" }
        });

    this.state.confirmPassword === ""
      ? this.setState({
          confirmPasswordError: {
            bool: true,
            error: "Required Confirmed Password"
          }
        })
      : this.setState({
          confirmPasswordError: { bool: false, error: "" }
        });
  }

  handleSubmit() {
    this.checkConditions();
    console.log("State : ", this.state);
  }
  render() {
    return (
      <div className="form">
        <h2>Welcome to</h2>
        <img className="logo" src={kollab} style={{ width: "150px" }} />
        <h1>Sign Up</h1>
        <FormControl
          variant="outlined"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Full Name
          </InputLabel>
          <OutlinedInput
            name={"fullname"}
            label={this.state.fullnameError.bool ? "" : "Full Name"}
            required
            error={this.state.fullnameError.bool ? true : false}
            variant={"outlined"}
            onChange={this.handleChange}
          />
          <FormHelperText error={this.state.emailError.bool ? true : false}>
            {this.state.fullnameError.error}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
          <OutlinedInput
            name={"email"}
            label={this.state.emailError.bool ? "" : "E-mail"}
            required
            error={this.state.emailError.bool ? true : false}
            variant={"outlined"}
            onChange={this.handleChange}
          />
          <FormHelperText error={this.state.emailError.bool ? true : false}>
            {this.state.emailError.error}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name={"password"}
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
            name={"confirmPassword"}
            label={"Confirm Password"}
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

        <div className="flex-row">
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
            style={{ marginBottom: "20px", marginRight: "5px" }}
          />
          <Link
            className="text"
            underline={"always"}
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

        <GradientButton
          gradient={["#54bdc2", "#5edbb8"]}
          color={"white"}
          background={"#54bdc2"}
          style={{ marginBottom: "20px" }}
          onClick={this.handleSubmit}
        >
          Sign Up
        </GradientButton>
        <div className=" flex-row">
          <p className="text" style={{ marginRight: "5px" }}>
            Already have an Account?{" "}
          </p>
          <Link
            className="text"
            underline={"always"}
            href="http://localhost:5000/users/sign_in"
            style={{ fontSize: "1.2em", color: "#54bdc2", fontWeight: "bold" }}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default SignUp;
