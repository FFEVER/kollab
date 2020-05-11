import React from "react"
import PropTypes from "prop-types"
import Button from "../shared/form/Button"
import FormInput from "../shared/form/FormInput"

import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core"

class SocialLink extends React.Component {
  render() {
    const sc = ["Github", "Linkedin", "Facebook", "Instagram", "Medium"]
    const {
      index,
      social,
      value,
      error,
      handleSocialChange,
      handleValueChange,
      handleRemoveSocial,
    } = this.props
    return (
      <div className="edit-profile__social">
        <FormControl
          className="w-50"
          variant="outlined"
          size="small"
          style={{ backgroundColor: "white" }}
        >
          <Select name="social" value={social} onChange={handleSocialChange}>
            <MenuItem value="">
              <em>Select social</em>
            </MenuItem>
            {sc.map((s, key) => (
              <MenuItem key={key} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormInput
          name="name"
          placeholder={value ? value : ""}
          type="text"
          value={value}
          className="form-control fix-height fix-width ml-2 mr-2"
          onChange={(e) => handleValueChange(e, index)}
          errors={error}
        />
        <Button
          name="delete-button"
          className="button--transparent align-self-center"
          onClick={(e) => handleRemoveSocial(e, index)}
        >
          <i className="far fa-times-circle fa-2x" />
        </Button>
      </div>
    )
  }
}

SocialLink.propTypes = {
  index: PropTypes.number,
  social: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.array,
  handleSocialChange: PropTypes.func,
  handleValueChange: PropTypes.func,
  handleRemoveSocial: PropTypes.func,
  setSocial: PropTypes.func,
}
export default SocialLink
