import React from "react"
import PropTypes from "prop-types"

class RoleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "React Developer",
      expertises: this.props.expertises,
      skills: [
        { label: "React", name: "react" },
        { label: "Developer", name: "Developer" },
      ],
      description:
        "- Be able to develop frontend with ReactJs.- Familiar with GitHub",
      status: "Open",
      userExpertises: [{ division: "Software", group: "", field: "" }],
      isButtonLoading: false,
    }

    this.setUserExpertises = this.setUserExpertises.bind(this)
    this.convertExpertiesForDisplay = this.convertExpertiesForDisplay.bind(this)
  }

  setUserExpertises() {
    let exps = this.props.expertises // All expertises
    let userExpIds = this.filterExpertiseId(this.props.userExpertises) // User expertise ids
    let userExps = [] // Return obj
    let obj = []
    let temp = {}
    userExpIds.map((key) => {
      let exp = exps.find((item) => item.id === key)

      while (temp !== undefined) {
        obj.push(exp)
        temp = exps.find((item) => item.id === exp.parent_id)
        exp = temp
      }
      userExps.push(obj)
      obj = []
      temp = {}
    })
    return userExps
  }

  convertExpertiesForDisplay() {
    let exps = this.setUserExpertises()
    let expsForDisplay = []
    exps.map((item) => {
      if (item.length === 3) {
        let obj = {
          field: item[0].name,
          group: item[1].name,
          division: item[2].name,
          expertise_id: item[0].id,
        }
        expsForDisplay.push(obj)
      } else if (item.length === 2) {
        let obj = {
          field: "",
          group: item[0].name,
          division: item[1].name,
          expertise_id: item[0].id,
        }
        expsForDisplay.push(obj)
      } else if (item.length === 1) {
        let obj = {
          field: "",
          group: "",
          division: item[0].name,
          expertise_id: item[0].id,
        }
        expsForDisplay.push(obj)
      }
    })
    return expsForDisplay
  }

  render() {
    const { currentUser } = this.props
    const {
      name,
      expertises,
      skills,
      description,
      status,
      userExpertises,
    } = this.state
    console.log("state ", this.state)
    return (
      <div className="mb-5">
        <div className="setting__role__section ">
          <h3>{name}</h3>
        </div>
        <div className="setting__role__section ">
          <h4>Expertises</h4>
          <div className="d-flex flex-row">
            {userExpertises.map((item, index) => (
              <div className="button--tags mt-1" key={index}>
                {item.division}
              </div>
            ))}
          </div>
        </div>

        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Skills</h4>
            <div className="d-flex flex-row">
              {skills.map((item, index) => (
                <div className="button--tags mt-1" key={index}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="setting__role__section">
          <div className="setting__role__title">
            <h4>Description</h4>
          </div>
          <p>- Be able to develop frontend with ReactJs.</p>
          <p>- Familiar with GitHub</p>
        </div>
        <div className="setting__role__section ">
          <div className=" d-flex flex-row, align-items-center">
            <h4>Status:</h4>
            <p
              className="font-weight-bold ml-1"
              style={{ color: "#54bdc2", fontSize: "16.5px" }}
            >
              {status}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

RoleDetail.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  user: PropTypes.object,
  role: PropTypes.object,
}

export default RoleDetail
