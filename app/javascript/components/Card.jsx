import React from "react"
import PropTypes from "prop-types"

class Card extends React.Component {
  render() {
    return this.props.type === "post" ? (
      <div>
        <div className="d-flex flex-row mt-1 align-items-senter">
          <h5>{`${this.props.user.first_name} ${this.props.user.last_name[0]}.`}</h5>
          <p
            style={{
              fontSize: "1.2em",
              marginLeft: "5px",
            }}
          >
            {this.props.action}
          </p>
        </div>
        <button
          className="button--post d-flex flex-column mt-1 mb-3"
          style={{ width: "100%" }}
        >
          <h5 style={{ color: "#4e4e4e" }}>{this.props.project.title}</h5>
          <div className="d-flex flex-row">
            {this.props.tags.map((item, index) => (
              <p
                key={index}
                style={{
                  marginRight: "5px",
                  color: "#54bdc2",
                }}
              >
                {"#" + item}
              </p>
            ))}
          </div>
        </button>
      </div>
    ) : (
      <div />
    )
  }
}

Card.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array,
  status: PropTypes.string,
  user: PropTypes.object,
  action: PropTypes.string,
  project: PropTypes.object,
}
export default Card
