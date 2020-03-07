import React from "react"
import PropTypes from "prop-types"

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  errors,
  children,
  label,
  isRequired,
  errorPrefix,
  ...props
}) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={errors.length === 0 ? className : className + " input-error"}
      />
      {errors.map((message, index) => (
        <p key={index} className="error-message">
          <small>{message}</small>
        </p>
      ))}
    </React.Fragment>
  )
}

FormInput.defaultProps = {
  type: "text",
  className: "",
  isRequired: false,
  placeholder: ""
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "date"]),
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default FormInput
