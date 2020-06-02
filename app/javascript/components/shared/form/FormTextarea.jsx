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
      {/* <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label> */}
      <div className="d-flex flex-row mt-2 mb-2">
        <h4>{label}</h4>
        {isRequired ? <h6>*</h6> : <div />}
      </div>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`${className} ${errors.length === 0 ? "" : "input-error"}`}
        {...props}
      />
      {errors.map((message, index) => (
        <div key={index}>
          <p className="error-message">{message} </p>
        </div>
      ))}
    </>
  )
}

FormTextarea.defaultProps = {
  className: "",
  isRequired: false,
  placeholder: "",
}

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default FormTextarea
