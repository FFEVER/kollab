import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"
import { defaultErrors } from "../authen/UserBasicInfoValidator"

import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
  FormControl,
  Checkbox,
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
      expertise_id: -1,
      activateModal: "division",
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleModalNext = this.handleModalNext.bind(this)
    this.handleModalBack = this.handleModalBack.bind(this)
    this.handleAddExpetise = this.handleAddExpetise.bind(this)
    this.clearExpertise = this.clearExpertise.bind(this)
  }

  handleFieldChange(type, value, id) {
    this.setState({
      [type]: value,
      activateModal: type,
      expertise_id: id,
    })
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
    const { activateModal, division, group, field, expertise_id } = this.state
    this.props.setExpertiseDisplayFunc({
      division: division,
      group: group,
      field: field,
      expertise_id: expertise_id,
    })
    this.clearExpertise()
  }

  clearExpertise() {
    this.setState({
      activateModal: "division",
      division: "",
      group: "",
      field: "",
    })
  }

  render() {
    const { errors, division, group, field, activateModal } = this.state
    const { expertises, type, require } = this.props
    return (
      <div className="form d-flex flex-column mt-3">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <h4>{type ? type : "Expertise"}</h4>
            {require ? <h6>*</h6> : <div />}
          </div>
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
                  {`Select your ${type ? type.toLowerCase() : `expertise`}`}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.clearExpertise}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {activateModal === "division" ? (
                  expertises
                    .filter((exp) => exp.parent_id === null)
                    .map((f, index) => (
                      <FormControl
                        className="d-flex flex-row flex-nowrap justify-content-between"
                        key={index}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="default"
                              checked={division === f.name}
                              onChange={() =>
                                this.handleFieldChange("division", f.name, f.id)
                              }
                              name={f.name}
                            />
                          }
                          label={f.name}
                        />
                        <Button
                          name="activateModal"
                          className="button--transparent"
                          onClick={() => this.handleModalNext("group", f.name)}
                        >
                          <ArrowForwardIosIcon />
                        </Button>
                      </FormControl>
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
                    {expertises
                      .filter(
                        (exp) =>
                          exp.parent_id ===
                          expertises.filter((exp) => exp.name === division)[0]
                            .id
                      )
                      .map((g, index) => (
                        <FormControl
                          className="d-flex flex-row flex-nowrap justify-content-between"
                          key={index}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="default"
                                checked={group === g.name}
                                onChange={() =>
                                  this.handleFieldChange("group", g.name, g.id)
                                }
                                name={g.name}
                              />
                            }
                            label={g.name}
                          />
                          <Button
                            name="activateModal"
                            className="button--transparent"
                            onClick={() =>
                              this.handleModalNext("field", g.name)
                            }
                          >
                            <ArrowForwardIosIcon />
                          </Button>
                        </FormControl>
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

                    {expertises
                      .filter(
                        (exp) =>
                          exp.parent_id ===
                          expertises.filter((exp) => exp.name === group)[0].id
                      )
                      .map((s, index) => (
                        <FormControl
                          className="d-flex flex-row flex-nowrap justify-content-between"
                          key={index}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="default"
                                checked={field === s.name}
                                onChange={() =>
                                  this.handleFieldChange("field", s.name, s.id)
                                }
                                name={s.name}
                              />
                            }
                            label={s.name}
                          />
                        </FormControl>
                      ))}
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div className="modal-footer justify-content-center">
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
  type: PropTypes.string,
  require: PropTypes.bool,
}
export default ExpertiseModal
