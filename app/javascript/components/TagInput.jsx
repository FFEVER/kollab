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
    const { value } = this.props
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
        className="react-select__container"
        classNamePrefix="react-select"
      />
    )
  }
}

export default TagInput
export { tagsToArray, TagInput }
