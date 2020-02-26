import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
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

class ForgetPassword extends React.Component {
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
    console.log("State : ", this.state);
  }

  render() {
    return (
      <div className="form">
        <h2>Welcome to</h2>
        <img className="logo" src={kollab} style={{ width: "150px" }} />
        <h1>Forget Password</h1>
        {console.log("State", this.state)}

        <FormControl
          variant="outlined"
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
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

        <GradientButton
          gradient={["#54bdc2", "#5edbb8"]}
          color={"white"}
          background={"#54bdc2"}
          style={{ marginBottom: "20px" }}
          onClick={this.handleSubmit}
        >
          Request Reset
        </GradientButton>

        <div className=" flex-row">
          <p className="text" style={{ marginRight: "5px" }}>
            Don't have an Account?{" "}
          </p>
          <Link
            className="text"
            underline={"always"}
            href="http://localhost:5000/users/sign_up"
            style={{ fontSize: "1.2em", color: "#54bdc2", fontWeight: "bold" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string
};

export default ForgetPassword;
