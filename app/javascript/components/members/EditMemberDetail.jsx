import React from "react"
import PropTypes from "prop-types"

import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"
import Button from "../shared/form/Button"
import { FormValidator, defaultErrors } from "./EditMemberDetailValidator"

import mail from "../../images/icon/mail.png"
import phone from "../../images/icon/phone-call.png"
import facebook from "../../images/icon/facebook.png"
import github from "../../images/icon/github.png"
import medium from "../../images/icon/medium.png"
import linkedin from "../../images/icon/linkedin.png"
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

class EditMemberDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      roles: [],
      role: "UX/UI Design",
      contact: {},
      roleStatus: "Owner",
      contacts: [],
      errors: defaultErrors,
    }

    this.memberDetail = this.memberDetail.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let contacts = [
      { social: mail, name: this.props.memberRole.member.email },
      { social: phone, name: this.props.memberRole.member.phone },
      { social: facebook, name: this.props.memberRole.member.facebook },
      { social: github, name: this.props.memberRole.member.github },
      { social: instagram, name: this.props.memberRole.member.instagram },
      { social: linkedin, name: this.props.memberRole.member.linkedin },
      { social: medium, name: this.props.memberRole.member.medium },
    ]

    this.setState({
      user: this.props.memberRole.member,
      role: this.props.memberRole.role.title,
      roles: this.props.allRoles,
      roleStatus: this.props.memberRole.is_owner ? "Owner" : "Member",
      contacts: contacts,
    })
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
    const { user, role, roleStatus, roles, contacts, errors } = this.state
    console.log("State ", this.state)
    console.log("Props ", this.props)
    return (
      <div>
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
          <FormHelperText error={errors.status.length > 0 ? true : false}>
            {errors.status[0]}
          </FormHelperText>
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
              {roles.map((role, key) => (
                <MenuItem key={key} value={role.title}>
                  {role.title}
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
          {contacts.map((item, index) =>
            item.name !== "" && item.name !== null ? (
              <div
                key={index}
                className="setting__role__section setting__role__section__item"
              >
                {console.log(item)}
                <img src={item.social} height="20" width="20" />
                <p>{item.name}</p>
              </div>
            ) : (
              <div key={index} />
            )
          )}
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

EditMemberDetail.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
  memberRole: PropTypes.object,
  allRoles: PropTypes.array,
}

export default EditMemberDetail
