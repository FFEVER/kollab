import React from "react"
import PropTypes from "prop-types"
import KollabImage from "images/kollab-square.jpg"

class HelloWorld extends React.Component {
  render() {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
        <br></br>
        <img src={KollabImage}></img>
      </React.Fragment>
    )
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
}
export default HelloWorld
