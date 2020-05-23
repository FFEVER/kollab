import React from "react"
import PropTypes from "prop-types"

class MemberManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      roles: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { currentUser } = this.props
    const { memmbers, roles } = this.state
    return <div></div>
  }
}

MemberManagement.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
}

export default MemberManagement
