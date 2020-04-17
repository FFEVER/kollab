import React from "react"

class NavDropdownButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropMenuOpen: false,
    }

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

  render() {
    let { dropMenuOpen } = this.state
    return (
      <>
        {dropMenuOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </>
    )
  }
}

export default NavDropdownButton
