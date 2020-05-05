import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"
import FormInput from "../shared/form/FormInput"

class SocialLink extends React.Component {
  render() {
    const { social, value, handleChange } = this.props
    console.log("Social ", social)
    return (
      <div className="edit-profile__social">
        <h5>{social.name}</h5>
        <FormInput
          name={social.title}
          placeholder={social.name}
          type="text"
          value={"value"}
          className="form-control auto-height fix-width"
          onChange={handleChange}
          errors={errors}
        />
        {/* <i className="far fa-times-circle fa-2x" /> */}
      </div>
    )
  }
}

SocialLink.propTypes = {
  social: PropTypes.object,
  handleChange: PropTypes.func,
  setSocial: PropTypes.func,
}
export default SocialLink
