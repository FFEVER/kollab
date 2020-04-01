import React from "react"
import PropTypes from "prop-types"
import KollabLogo from "images/kollab-blue.png"

class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: true
    }
  }

  render() {
    return (
      <nav className="sidenav">
        <a href="/" className="sidenav__brand">
          <img src={KollabLogo} alt="kollab" className="sidenav__brand__logo" />
        </a>
      </nav>
    )
  }
}

SideNav.propTypes = {
  userSignedIn: PropTypes.bool,
  currentUserPath: PropTypes.string,
  destroyUserSessionPath: PropTypes.string,
  newUserRegistrationPath: PropTypes.string
}
export default SideNav
