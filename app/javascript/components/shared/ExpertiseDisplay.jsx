import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"

class ExpertiseDisplay extends React.Component {
  render() {
    const expertises = this.props.expertises
    return (
      <div className="form d-flex flex-column mt-3">
        {expertises.map((item, index) => (
          <div className="mt-1" key={index}>
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
                onClick={() => this.props.removeExpertise(item)}
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
