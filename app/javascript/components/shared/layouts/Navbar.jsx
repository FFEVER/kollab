import React from "react"
import PropTypes from "prop-types"
import KollabLogo from "images/kollab-blue.png"
import PersonImg from "images/person.jpg"
import axios from "axios"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: true,
      logoutError: false,
      dropMenuOpen: false,
    }

    this.logout = this.logout.bind(this)
    this.handleDropClose = this.handleDropClose.bind(this)
    this.handleDropOpen = this.handleDropOpen.bind(this)
  }

  componentDidMount() {
    $("#drop-menu").on("show.bs.dropdown", this.handleDropOpen)
    $("#drop-menu").on("hide.bs.dropdown", this.handleDropClose)
  }

  handleDropOpen() {
    this.setState({ dropMenuOpen: true })
  }

  handleDropClose() {
    this.setState({ dropMenuOpen: false })
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

  signedInLinks = () => {
    let { userProjectsPath, projectsPath, userPath, userFullName } = this.props
    let { dropMenuOpen } = this.state
    return (
      <>
        <div className="nav__items">
          <a
            href={userProjectsPath}
            className="nav__item nav__item--button nav__item--button--active nav__item--desktop"
          >
            <i className="fas fa-th-large"></i>
            My Projects
          </a>
          <a
            href={projectsPath}
            className="nav__item nav__item--button nav__item--desktop"
          >
            <i class="fas fa-search"></i>
            Explore
          </a>
        </div>

        <div className="nav__items nav__items--right">
          <a href="#" className="nav__item nav__item--icon nav__item--mobile">
            <i class="fas fa-search"></i>
          </a>

          <a href="#" className="nav__item nav__item--icon">
            <i class="fas fa-bell"></i>
          </a>

          <div className="nav__dropdown" id="drop-menu">
            <button
              className="nav__dropdown__drop-button"
              id="drop-button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="nav__item nav__profile nav__item--desktop">
                {userFullName}
                <img
                  src={PersonImg}
                  className="nav__profile-img image__profile image__profile--small"
                ></img>
              </div>

              <div className="nav__item nav__item--mobile">
                {dropMenuOpen ? (
                  <i className="fas fa-times"></i>
                ) : (
                  <i className="fas fa-bars"></i>
                )}
              </div>
            </button>

            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="drop-button"
            >
              <a
                href={userProjectsPath}
                className="dropdown-item nav__dropdown__drop-item nav__item--mobile"
              >
                <i className="fas fa-th-large"></i>
                My Projects
              </a>
              <a href="#" className="dropdown-item nav__dropdown__drop-item">
                <i className="far fa-envelope"></i>
                Messages
              </a>
              <a
                href={userPath}
                className="dropdown-item nav__dropdown__drop-item"
              >
                <i className="fas fa-user"></i>
                My Profile
              </a>
              <div className="dropdown-divider"></div>
              <a
                href="#"
                className="dropdown-item nav__dropdown__drop-item"
                onClick={this.logout}
              >
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  nonSignedInLinks = () => {
    let { newUserSessionPath, newUserRegistrationPath } = this.props
    return (
      <div className="nav__items nav__items--right">
        <a href={newUserSessionPath} className="nav__item">
          <button className="button button--md button--outline-primary">
            Login
          </button>
        </a>
        <a href={newUserRegistrationPath} className="nav__item">
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
          className="alert alert-danger alert-dismissible fade"
          role="alert"
          hidden={!logoutError}
        >
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          Cannot logout. Something went wrong.
        </div>

        <nav className="nav">
          <a href="/" className="nav__brand">
            <img src={KollabLogo} alt="kollab" className="nav__brand__logo" />
          </a>
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
  userFullName: PropTypes.string,
  authenticityToken: PropTypes.string,
}
export default Navbar
