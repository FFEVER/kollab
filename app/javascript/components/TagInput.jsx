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

class TagInput extends React.Component {
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
    this.setState({ value })
  }

  handleInputChange = inputValue => {
    this.setState({ inputValue })
  }

  handleKeyDown = event => {
    const { inputValue, value } = this.state
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case " ":
      case "Tab":
        if (this.validate()) {
          // Append inputValue to current value
          this.props.onChange(createOption(inputValue))
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
