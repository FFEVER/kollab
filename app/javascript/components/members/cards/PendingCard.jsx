import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class PendingCard extends React.Component {
  render() {
    const { user } = this.props
    return (
      <div className="card-with-button">
        <div className="d-flex flex-row">
          <img
            src={user.image}
            className="image__profile image__profile--medium"
          />
          <div className="card-with-button__detail">
            <h5 style={{ color: "#4e4e4e" }}>{user.name}</h5>
            <p>{user.faculty}</p>
          </div>
        </div>
        <Button name="cancel-button" className="button button__decline">
          Cancel
        </Button>
      </div>
    )
  }
}

PendingCard.propTypes = {
  user: PropTypes.object,
}
export default PendingCard
