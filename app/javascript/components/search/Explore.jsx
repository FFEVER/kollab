import React from "react"
import PropTypes from "prop-types"

class Explore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    const { currentUser } = this.props
    const { name } = this.state
    console.log("State ", this.state)
    console.log("Props ", this.props)
    return (
      <div className="">
        <p>Explore</p>
        <p>Explore</p>
        <p>Explore</p>
        <p>Explore</p>
      </div>
    )
  }
}

Explore.propTypes = {
  authenticityToken: PropTypes.string,
  user: PropTypes.object,
  project: PropTypes.object,
}

export default Explore
