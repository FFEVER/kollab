import React from "react"
import PropTypes from "prop-types"
import CreatableSelect from "react-select/creatable"

const components = {
  DropdownIndicator: null,
}

const createOption = (label) => ({
  label,
  value: label,
})

const tagsToArray = (tags) => {
  let tagsArray = []
  tags.forEach((tagObj) => {
    tagsArray = [...tagsArray, tagObj["value"]]
  })
  return tagsArray
}

const defaultStyles = {
  container: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    margin: 0,
    padding: 0,
  }),
  control: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    cursor: "text",
    boxShadow: state.isFocused ? "0 0 3px #54bdc2" : "",
    "&:hover": {
      borderColor: "none",
    },
  }),
  multiValue: (provided, state) => ({
    ...provided,
    lineHeight: "24px",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    fontSize: "100% !important",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "medium",
  }),
}

const customErrorStyles = {
  ...defaultStyles,
  control: (provided, state) => ({
    ...provided,
    minWidth: "100%",
    borderColor: "red",
    boxShadow: state.isFocused ? "0 0 3px #ce7171" : "",
    cursor: "text",
    "&:hover": {
      borderColor: "red",
    },
  }),
}

class TagInput extends React.Component {
  // TODO: [Eit] Show suggestions while typing
  state = {
    inputValue: "",
  }

  removeDup = () => {
    const { inputValue } = this.state
    const { value } = this.props
    const newTags = []
    for (const tag of inputValue.split(" ")) {
      if (value.find(({ label }) => label === tag) === undefined)
        newTags.push(tag)
    }
    return newTags
  }

  handleChange = (value, actionMeta) => {
    // Handle clear or delete tags
    if (value === null) {
      value = []
    }
    this.props.onChange(value)
  }

  handleInputChange = (inputValue) => {
    this.setState({ inputValue })
  }

  handleKeyDown = (event) => {
    const { inputValue } = this.state
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case " ":
      case "Tab":
        let newTags = this.removeDup()
        let newTagObjList = []
        for (const tag of newTags) {
          newTagObjList.push(createOption(tag))
        }
        this.props.onKeyDown(newTagObjList)
        this.setState({
          inputValue: "",
        })
        event.preventDefault()
    }
  }

  render() {
    const { inputValue } = this.state
    const { value, placeholder, errors, id, styles, errorStyles } = this.props
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
          id={id}
        />

        {errors.map((message, index) => (
          <div key={index} className="error-message">
            <small>{message} </small>
          </div>
        ))}
      </>
    )
  }
}

TagInput.defaultProps = {
  placeholder: "",
  errors: [],
  id: "",
  styles: defaultStyles,
  errorStyles: customErrorStyles,
}

TagInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  id: PropTypes.string,
  styles: PropTypes.object,
  errorStyles: PropTypes.object,
}

export default TagInput
export { tagsToArray, defaultStyles, TagInput }
