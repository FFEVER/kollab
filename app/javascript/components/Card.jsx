import React from "react"
import PropTypes from "prop-types"

class Card extends React.Component {
  render() {
    const { user, project, type, action, tags } = this.props
    return type === "post" ? (
      <div>
        <div className="d-flex flex-row mt-1 align-items-senter">
          <h5>{`${user.first_name} ${user.last_name[0]}.`}</h5>
          <p
            style={{
              fontSize: "1.2em",
              marginLeft: "5px",
            }}
          >
            {action}
          </p>
        </div>
        <button
          className="button--post d-flex flex-column mt-1 mb-3"
          style={{ width: "100%" }}
        >
          <h5 style={{ color: "#4e4e4e" }}>{project.title}</h5>
          <div className="d-flex flex-row">
            {tags.map((item, index) => (
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
