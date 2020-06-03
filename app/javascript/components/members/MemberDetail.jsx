import React from "react"
import PropTypes from "prop-types"

import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"
import Button from "../shared/form/Button"
import phone from "../../images/icon/phone-call.png"
import mail from "../../images/icon/mail.png"
import instagram from "../../images/icon/instagram.png"
import anya from "../../images/anya.jpg"

const constUser = {
  first: "Kasamabhorn",
  last: "Suparerkrat",
  phone: "061 234 5678",
  mail: "kanasamabhorn@kmitl.ac.th",
  instagram: "kasamabhorn.ks",
  socialLinks: [{ id: 1, social: "Instagram", name: "anya.ks" }],
}

const constRoles = ["React Developer", "UX/UI Design", "Ruby on Rails"]

const constRole = {
  id: 1,
  name: "UX/UI Designer",
  expertiseIds: [1, 2],
  expertises: ["Graphic Design", "Design"],
  skillIds: [1, 2],
  skills: ["UserExperience", "Protptyping"],
  description: "- Has a strong passion \n- Experienced using Zeplin",
  status: "Open",
}

const statuses = [
  "completed",
  "in progress",
  "cancelled",
  "on hold",
  "intiating",
]

const roleStatuses = ["Owner", "Member"]

class MemberDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      roles: {},
      role: "UX/UI Design",
      contact: {},
      roleStatus: "Owner",
    }

    this.memberDetail = this.memberDetail.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  memberDetail() {
    console.log("Show member detail")
  }

  render() {
    const { currentUser } = this.props
    const { user, role, roleStatus } = this.state
    console.log("State ", this.state)
    console.log("Props ", this.props)
    return (
      <div className="mb-5">
        <div className="setting__role__section ">
          <img
            src={anya}
            className="setting__role__proimg"
            height="150"
            width="150"
          />
        </div>
        <div className="setting__role__title align-items-center">
          <h3>{`${constUser.first} ${constUser.last}`}</h3>
        </div>

        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Status</h4>
          </div>
          <FormControl variant="outlined" size="small">
            <Select
              name="roleStatus"
              value={roleStatus}
              onChange={this.handleChange}
              //   error={errors.faculty.length > 0 ? true : false}
            >
              <MenuItem value="">
                <em>Select a project status</em>
              </MenuItem>
              {roleStatuses.map((status, key) => (
                <MenuItem key={key} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormHelperText error={errors.status.length > 0 ? true : false}>
            {errors.status[0]}
          </FormHelperText> */}
        </div>

        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Role</h4>
          </div>
          <FormControl variant="outlined" size="small">
            <Select
              name="role"
              value={role}
              onChange={this.handleChange}
              //   error={errors.faculty.length > 0 ? true : false}
            >
              <MenuItem value="">
                <em>Select a member role</em>
              </MenuItem>
              {constRoles.map((role, key) => (
                <MenuItem key={key} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <p className="link d-flex flex-column align-items-center">
          Create new roless
        </p>
        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Contact</h4>
          </div>
          <div className="setting__role__section setting__role__section__item">
            <img src={phone} height="20" width="20" />
            <p>{constUser.phone}</p>
          </div>
          <div className="setting__role__section setting__role__section__item">
            <img src={mail} height="20" width="20" />
            <p>{constUser.mail}</p>
          </div>
          <div className="setting__role__section setting__role__section__item">
            <img src={instagram} height="20" width="20" />
            <p>{constUser.instagram}</p>
          </div>
        </div>

        <div className="setting__role__section setting__role__section__button button--fixed-bottom ml-2 mr-2">
          <Button
            name="remove-button"
            className="button button--lg button__decline setting__role__button mr-2"
          >
            Remove
          </Button>
          <Button
            name="save-button"
            className="button button--lg button__accept setting__role__button"
          >
            Save
          </Button>
        </div>
      </div>
    )
  }
}

MemberDetail.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
  role: PropTypes.object,
}

export default MemberDetail
