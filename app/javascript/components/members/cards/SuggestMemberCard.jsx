import React from "react"
import PropTypes from "prop-types"
import Button from "../../shared/form/Button"

class SuggestMemberCard extends React.Component {
  render() {
    const { user } = this.props
    return (
      <div className="card-with-button">
        <div className="d-flex flex-row">
          <p className="card-with-button__image">image</p>
          <div className="card-with-button__detail">
            <h5 style={{ color: "#4e4e4e" }}>{user.name}</h5>
            <p>{user.faculty}</p>
          </div>
        </div>
        <Button name="cancel-button" className="button button--transparent">
          <i className="far fa-envelope fa-envelope__member"></i>
        </Button>
      </div>
    )
  }
}

SuggestMemberCard.propTypes = {
  user: PropTypes.object,
}
export default SuggestMemberCard
