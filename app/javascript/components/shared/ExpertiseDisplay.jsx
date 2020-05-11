import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"

class ExpertiseDisplay extends React.Component {
  render() {
    const expertises = this.props.expertises
    return (
      <div className="form d-flex flex-column mt-1 mb-3">
        {expertises.map((item, index) => (
          <div className="mt-2" key={index}>
            <p>
              {item.field
                ? item.division + " > " + item.group + " > "
                : item.group
                ? item.division + " > "
                : ""}
            </p>
            <div className="tag-card">
              {item.field
                ? item.field
                : item.group
                ? item.group
                : item.division}
              <Button
                name="exp-icon"
                className="button--transparent ml-1"
                onClick={(e) => this.props.removeExpertise(e, item)}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
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
