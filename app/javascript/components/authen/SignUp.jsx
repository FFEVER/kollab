import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
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
const DATA_PREFIX = "user";

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
            name="fullname"
            label={this.state.fullnameError.bool ? "" : "Full Name"}
            required
            error={this.state.fullnameError.bool ? true : false}
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormHelperText error={this.state.emailError.bool ? true : false}>
            {this.state.fullnameError.error}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
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

        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
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
            style={{ marginBottom: "20px", marginRight: "5px" }}
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
