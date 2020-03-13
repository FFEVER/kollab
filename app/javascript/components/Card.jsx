import React from "react";
import PropTypes from "prop-types";

class Card extends React.Component {
  render() {
    return this.props.type === "project" ? (
      <button className="button--card mar-top">
        <div className="flex-row space-bet card-border">
          <div className="flex-col ">
            <h4 style={{ color: "#4e4e4e" }}>{this.props.title}</h4>
            <div className="flex-row">
              {this.props.tags.map((item, index) => (
                <p key={index} style={{ marginRight: "5px", color: "#54bdc2" }}>
                  {"#" + item}
                </p>
              ))}
            </div>
          </div>
          <div className="card-status">{this.props.status}</div>
        </div>
      </button>
    ) : this.props.type === "post" ? (
      <div className="mar-tb">
        <div className="flex-row align-cen">
          <h5>{this.props.user}</h5>
          <p
            style={{
              fontSize: "1.2em",
              marginLeft: "5px"
            }}
          >
            {this.props.action}
          </p>
        </div>
        <div className="mar-top--s">
          <h5 style={{ color: "#4e4e4e" }}>{this.props.project.title}</h5>
          <div className="flex-row">
            {this.props.project.tags.map((item, index) => (
              <p
                key={index}
                style={{
                  marginRight: "5px",
                  color: "#54bdc2"
                }}
              >
                {"#" + item}
              </p>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

Card.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array,
  status: PropTypes.string,
  user: PropTypes.string,
  action: PropTypes.string,
  project: PropTypes.object
};
export default Card;
