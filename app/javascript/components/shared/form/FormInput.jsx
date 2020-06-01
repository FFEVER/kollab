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
  ...props
}) => {
  return (
    <>
      <div className="d-flex flex-row mt-2 mb-2">
        <h4>{label}</h4>
        {isRequired ? <h6>*</h6> : <div />}
      </div>
      <div className="d-flex flex-column full-width">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`${className} ${errors.length === 0 ? "" : "input-error"}`}
          {...props}
        />
        {errors.map((message, index) => (
          <div key={index} className="error-message">
            <small>{message}</small>
          </div>
        ))}
      </div>
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
  type: PropTypes.oneOf(["text", "number", "password", "date", "tel", "email"]),
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default FormInput
