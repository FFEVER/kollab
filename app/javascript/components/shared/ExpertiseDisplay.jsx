import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"

class ExpertiseDisplay extends React.Component {
  render() {
    const expertises = this.props.expertises
    return (
      <div className="form d-flex flex-column mt-3">
        {expertises.map((item, index) => (
          <div className="d-flex flex-row align-items-center mb-2" key={index}>
            <Button name="expertise" className="button--tags mr-3">
              {item}
            </Button>
            <Button
              name="exp-icon"
              className="button--transparent"
              onClick={() => this.props.removeExpertise(item)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </div>
        ))}
      </div>
    )
  }
}

ExpertiseDisplay.propTypes = {
  expertises: PropTypes.array,
  removeExpertise: PropTypes.func,
}
export default ExpertiseDisplay
