import React from "react"
import PropTypes from "prop-types"
import CreatableSelect from "react-select/creatable"

const components = {
  DropdownIndicator: null
}

const createOption = label => ({
  label,
  value: label
})

const tagsToArray = tags => {
  var tagsArray = []
  tags.forEach(tagObj => {
    tagsArray = [...tagsArray, tagObj["value"]]
  })
  return tagsArray
}

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    margin: 0,
    padding: 0
  }),
  control: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    cursor: "text",
    boxShadow: state.isFocused ? "0 0 3px #54bdc2" : "",
    "&:hover": {
      borderColor: "none"
    }
  }),
  multiValue: (provided, state) => ({
    ...provided,
    lineHeight: "24px"
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    fontSize: "100% !important"
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "medium"
  })
}

const customErrorStyles = {
  ...customStyles,
  control: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    borderColor: "red",
    boxShadow: state.isFocused ? "0 0 3px #ce7171" : "",
    cursor: "text",
    "&:hover": {
      borderColor: "red"
    }
  })
}

class TagInput extends React.Component {
  // TODO: [Eit] Show suggestions while typing
  state = {
    inputValue: ""
  }

  validate = () => {
    // Validate duplication of label
    const { inputValue } = this.state
    const { value } = this.props
    return value.find(({ label }) => label === inputValue) === undefined
  }

  handleChange = (value, actionMeta) => {
    // Handle clear or delete tags
    if (value === null) {
      value = []
    }
    this.props.onChange(value)
  }

  handleInputChange = inputValue => {
    this.setState({ inputValue })
  }

  handleKeyDown = event => {
    const { inputValue } = this.state
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case " ":
      case "Tab":
        if (this.validate()) {
          this.props.onKeyDown(createOption(inputValue))
        }
        this.setState({
          inputValue: ""
        })
        event.preventDefault()
    }
  }

  render() {
    const { inputValue } = this.state
    const {
      value,
      placeholder,
      errors,
      errorPrefix,
      id,
      styles,
      errorStyles
    } = this.props
    return (
      <>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          styles={errors.length === 0 ? styles : errorStyles}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          value={value}
          className="react-select__container"
          classNamePrefix="react-select"
          id={id}
        />

        {errors.map((message, index) => (
          <p key={index} className="error-message">
            <small>
              {errorPrefix} {message}
            </small>
          </p>
        ))}
      </>
    )
  }
}

TagInput.defaultProps = {
  placeholder: "",
  errors: [],
  id: "",
  styles: customStyles,
  errorStyles: customErrorStyles
}

TagInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  errorPrefix: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  id: PropTypes.string,
  styles: PropTypes.object,
  errorStyles: PropTypes.object
}

export default TagInput
export { tagsToArray, TagInput }
