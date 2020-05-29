import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"

import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@material-ui/core"

const constProjects = [
  "Cat feeder",
  "Breathe with a better air",
  "Dating app",
  "Kollab project",
]
class InviteMemberModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { currentUser, projects } = this.props
    const { value } = this.state
    console.log("user ", currentUser)
    console.log("projects ", projects)
    return (
      <div>
        <Button
          name="inviteMember"
          className="button button--md"
          style={{ width: "210px" }}
          type="button"
          data-toggle="modal"
          data-target="#inviteModal"
        >
          Invite to project
        </Button>

        <div
          name="invite"
          className="modal fade"
          id="inviteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="inviteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="inviteModalLabel">
                  {`Invite ${currentUser.first_name} to  join a project`}
                </h5>
                <button
                  type="button"
                  className="button close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.clearExpertise}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex flex-column mx-2">
                <FormControl component="fieldset">
                  <h4>Owned Projects</h4>
                  <RadioGroup
                    aria-label="gender"
                    name="value"
                    value={value}
                    onChange={this.handleChange}
                  >
                    {constProjects.map((item, index) => (
                      <FormControlLabel
                        value={item}
                        control={<Radio color="default" />}
                        label={item}
                        key={index}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <div className="modal-footer justify-content-center">
                  <Button
                    name="invite"
                    type="button"
                    className="button button--lg button--gradient-primary"
                    data-dismiss="modal"
                    onClick={() => console.log("Invited")}
                  >
                    Invite
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InviteMemberModal.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
  projects: PropTypes.array,
}
export default InviteMemberModal
