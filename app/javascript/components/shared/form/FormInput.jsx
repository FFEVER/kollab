import React from "react"
import PropTypes from "prop-types"

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  errors,
  children,
  label,
  isRequired,
  pattern,
  icon,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      <div className="d-flex flex-column">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          pattern={pattern ? pattern : undefined}
          className={`${className} ${errors.length === 0 ? "" : "input-error"}`}
          {...props}
        />
      </div>
      {console.log("Error ", errors)}
      {errors.map((message, index) => (
        <div key={index} className="error-message">
          <small>{message}</small>
        </div>
      ))}
    </>
  )
}

FormInput.defaultProps = {
  type: "text",
  className: "",
  isRequired: false,
  placeholder: "",
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "date", "tel", "email"]),
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  pattern: PropTypes.string,
  icon: PropTypes.any,
}

export default FormInput
