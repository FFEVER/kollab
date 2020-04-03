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

  signedInLinks() {
    let { userProjectsPath, projectsPath, userPath } = this.props
    return (
      <>
        <div className="nav__links">
          <a href={userProjectsPath} className="nav__link nav__link--hover">
            Projects
          </a>
          <a href={projectsPath} className="nav__link nav__link--hover">
            Explore
          </a>
        </div>
        <div className="nav__links--right">
          <a href={userPath} className="nav__link nav__link">
            <button className="button button--small">My Profile</button>
          </a>
        </div>
      </>
    )
  }

  nonSignedInLinks = () => {
    let { newUserSessionPath, newUserRegistrationPath } = this.props
    return (
      <div className="nav__links nav__links--right">
        <a href={newUserSessionPath} className="nav__link">
          <button className="button button--small-fixed button--outline-primary">
            Login
          </button>
        </a>
        <a href={newUserRegistrationPath} className="nav__link">
          <button className="button button--small-fixed button--primary">
            Signup
          </button>
        </a>
      </div>
    )
  }

  render() {
    let {
      userPath,
      userProjectsPath,
      projectsPath,
      newUserSessionPath,
      newUserRegistrationPath,
      userSignedIn
    } = this.props
    return (
      <nav className="nav">
        <a href="/" className="nav__brand">
          <img src={KollabLogo} alt="kollab" className="nav__brand__logo" />
        </a>
        <div className="nav__links nav__links--desktop">
          <a href="#" className="nav__link">
            <span>Feed</span>
          </a>
          <a href={projectsPath} className="nav__link">
            <span>Explore</span>
          </a>
        </div>
        {userSignedIn ? this.signedInLinks() : this.nonSignedInLinks()}
      </nav>
    )
  }
}

Navbar.propTypes = {
  userSignedIn: PropTypes.bool,
  currentUserPath: PropTypes.string,
  destroyUserSessionPath: PropTypes.string,
  newUserRegistrationPath: PropTypes.string,
  newUserSessionPath: PropTypes.string,
  userPath: PropTypes.string,
  userProjectsPath: PropTypes.string,
  projectsPath: PropTypes.string
}
export default Navbar
