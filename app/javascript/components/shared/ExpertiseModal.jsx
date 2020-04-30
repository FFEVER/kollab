import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"
import fields from "../../../assets/utils/fields"
import { defaultErrors } from "../authen/UserBasicInfoValidator"

import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@material-ui/core"

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import add from "../../images/icon/add.png"

class ExpertiseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: defaultErrors,
      expertise: "",
      division: "",
      group: "",
      field: "",
      activateModal: "division",
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleModalNext = this.handleModalNext.bind(this)
    this.handleModalBack = this.handleModalBack.bind(this)
    this.handleAddExpetise = this.handleAddExpetise.bind(this)
  }

  handleFieldChange(event) {
    if (event.target.name === event.target.value) {
      this.setState({
        [event.target.name]: "",
        activateModal: event.target.name,
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        activateModal: event.target.name,
      })
    }
  }

  handleModalNext(value, field) {
    var currentField = this.state.activateModal
    this.setState({
      activateModal: value,
      [currentField]: field,
    })
  }

  handleModalBack(value, prev) {
    this.setState({
      activateModal: value,
      [prev]: "",
    })
  }

  handleAddExpetise() {
    const { activateModal, division, group, field } = this.state
    this.props.setExpertiseDisplayFunc({
      division: division,
      group: group,
      field: field,
    })
    this.setState({
      activateModal: "division",
      division: "",
      group: "",
      field: "",
    })
  }

  render() {
    const { errors, division, group, field, activateModal } = this.state
    return (
      <div className="form d-flex flex-column mt-3">
        <div className="d-flex flex-row justify-content-between">
          <h4>Expertise</h4>
          <Button
            name="addExpertise"
            className="button--icon"
            type="button"
            data-toggle="modal"
            data-target="#expertiseModal"
            disabled={this.props.disable ? this.props.disable : false}
          >
            <img src={add} height="20" width="20" />
          </Button>
        </div>

        <div
          name="expertise"
          className="modal fade"
          id="expertiseModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="expertiseModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="expertiseModalLabel">
                  Select your expertise
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {activateModal === "division" ? (
                  fields.map((f, index) => (
                    <RadioGroup
                      key={index}
                      aria-label="division"
                      name="division"
                      value={division}
                      onChange={this.handleFieldChange}
                      className="d-flex flex-row flex-nowrap justify-content-between"
                    >
                      <FormControlLabel
                        value={f.Division}
                        control={<Radio color="default" />}
                        label={f.Division}
                      />
                      <Button
                        name="activateModal"
                        className="button--transparent"
                        onClick={() =>
                          this.handleModalNext("group", f.Division)
                        }
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    </RadioGroup>
                  ))
                ) : (
                  <div />
                )}
                {activateModal === "group" ? (
                  <div>
                    <div className="d-flex flex-row mb-2">
                      <Button
                        name="activateModal"
                        className="button--transparent mr-2"
                        onClick={() =>
                          this.handleModalBack("division", "group")
                        }
                      >
                        <ArrowBackIosIcon />
                      </Button>
                      <h4>{division}</h4>
                    </div>
                    {fields
                      .find((f) => f.Division === division)
                      .Groups.map((g, index) => (
                        <RadioGroup
                          key={index}
                          aria-label="group"
                          name="group"
                          value={group}
                          onChange={this.handleFieldChange}
                          className="d-flex flex-row flex-nowrap justify-content-between"
                        >
                          <div className="d-flex flex-row justify-content-center">
                            <FormControlLabel
                              value={g.Group}
                              control={<Radio color="default" />}
                              label={g.Group}
                            />
                          </div>

                          <Button
                            name="activateModal"
                            className="button--transparent"
                            onClick={() =>
                              this.handleModalNext("field", g.Group)
                            }
                          >
                            <ArrowForwardIosIcon />
                          </Button>
                        </RadioGroup>
                      ))}
                  </div>
                ) : (
                  <div />
                )}

                {activateModal === "field" ? (
                  <div>
                    <h6>{division}</h6>

                    <div className="d-flex flex-row mt-2 mb-2">
                      <Button
                        name="activateModal"
                        className="button--transparent mr-2"
                        onClick={() => this.handleModalBack("group", "field")}
                      >
                        <ArrowBackIosIcon />
                      </Button>
                      <h4>{group}</h4>
                    </div>

                    {fields
                      .find((f) => f.Division === division)
                      .Groups.find((g) => g.Group === group)
                      .Fields.map((s, index) => (
                        <RadioGroup
                          key={index}
                          aria-label="field"
                          name="field"
                          value={field}
                          onChange={this.handleFieldChange}
                          className="d-flex flex-row flex-nowrap justify-content-start"
                        >
                          <FormControlLabel
                            value={s}
                            control={<Radio color="default" />}
                            label={s}
                          />
                        </RadioGroup>
                      ))}
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div className="modal-footer">
                <Button
                  name="expertise"
                  type="button"
                  className="button--gradient-primary button--lg"
                  data-dismiss="modal"
                  onClick={this.handleAddExpetise}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ExpertiseModal.propTypes = {
  expertises: PropTypes.array,
  setExpertiseDisplayFunc: PropTypes.func,
  disable: PropTypes.bool,
}
export default ExpertiseModal
