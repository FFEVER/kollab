import React from "react"
import PropTypes from "prop-types"

const Loader = ({ width, height, ...props }) => {
  return (
    <>
      <span
        className="spinner-border"
        role="status"
        aria-hidden="true"
        style={
          width && height
            ? {
                width: width,
                height: height
              }
            : {}
        }
      ></span>
      <span className="sr-only">Loading...</span>
    </>
  )
}

Loader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default Loader
