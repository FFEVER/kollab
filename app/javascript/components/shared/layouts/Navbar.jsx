import React from "react"
import PropTypes from "prop-types"
import KollabLogo from "images/kollab-blue.png"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: true
    }
  }

  render() {
    let { userPath, userProjectsPath, projectsPath } = this.props
    return (
      <nav className="sidenav">
        <a href="/" className="sidenav__brand">
          <img src={KollabLogo} alt="kollab" className="sidenav__brand__logo" />
        </a>
        <a href="#" className="sidenav__link">
          <i className="fas fa-home fa-2x"></i>
          <span>Feed</span>
        </a>
        <a href={projectsPath} className="sidenav__link">
          <i className="fas fa-search fa-2x"></i>
          <span>Explore</span>
        </a>
        <a
          href={userProjectsPath}
          className="sidenav__link sidenav__link--active"
        >
          <i className="fas fa-th-large fa-2x"></i>
          <span>Project</span>
        </a>
        <a href="#" className="sidenav__link">
          <i className="fas fa-envelope fa-2x"></i>
          <span>Message</span>
        </a>
        <a href={userPath} className="sidenav__link">
          <i className="fas fa-user fa-2x"></i>
          <span>Profile</span>
        </a>
      </nav>
    )
  }
}

Navbar.propTypes = {
  userSignedIn: PropTypes.bool,
  currentUserPath: PropTypes.string,
  destroyUserSessionPath: PropTypes.string,
  newUserRegistrationPath: PropTypes.string,
  userPath: PropTypes.string,
  userProjectsPath: PropTypes.string,
  projectsPath: PropTypes.string
}
export default Navbar
