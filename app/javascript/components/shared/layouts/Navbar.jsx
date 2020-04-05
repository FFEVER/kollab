import React from "react"
import PropTypes from "prop-types"
import KollabLogo from "images/kollab-blue.png"
import axios from "axios"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: true,
      logoutError: false,
    }

    this.logout = this.logout.bind(this)
  }

  logout() {
    event.preventDefault()

    let { destroyUserSessionPath, rootPath, authenticityToken } = this.props
    axios({
      method: "DELETE",
      url: destroyUserSessionPath,
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
      data: {
        authenticity_token: authenticityToken,
      },
    })
      .then((response) => {
        if (response.status === 204) window.location.href = rootPath
      })
      .catch((error) => {
        this.setState({ logoutError: true })
      })
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
        <div className="nav__links nav__links--right">
          <a href={userPath} className="nav__link">
            <button className="button button--md">My Profile</button>
          </a>
          <a onClick={this.logout} className="nav__link">
            <button className="button button--md">Logout</button>
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
          <button className="button button--md button--outline-primary">
            Login
          </button>
        </a>
        <a href={newUserRegistrationPath} className="nav__link">
          <button className="button button--md button--primary">Signup</button>
        </a>
      </div>
    )
  }

  render() {
    let { projectsPath, userSignedIn } = this.props
    let { logoutError } = this.state
    return (
      <>
        <div
          class="alert alert-danger alert-dismissible fade"
          role="alert"
          hidden={!logoutError}
        >
          <button type="button" class="close" data-dismiss="alert">
            &times;
          </button>
          Cannot logout. Something went wrong.
        </div>

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
      </>
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
  projectsPath: PropTypes.string,
  rootPath: PropTypes.string,
  authenticityToken: PropTypes.string,
}
export default Navbar
