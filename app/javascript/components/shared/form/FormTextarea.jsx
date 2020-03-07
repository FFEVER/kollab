import React from "react"
import PropTypes from "prop-types"

const FormTextarea = ({
  name,
  placeholder,
  onChange,
  className,
  errors,
  children,
  label,
  isRequired,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`${className} ${errors.length === 0 ? "" : "input-error"}`}
        {...props}
      />
      {errors.map((message, index) => (
        <p key={index} className="error-message">
          <small>{message}</small>
        </p>
      ))}
    </>
  )
}

FormTextarea.defaultProps = {
  type: "text",
  className: "",
  isRequired: false,
  placeholder: ""
}

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default FormTextarea
