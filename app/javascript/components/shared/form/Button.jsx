import React from "react"
import PropTypes from "prop-types"

import Loader from "./../Loader"

const Button = ({ name, children, isLoading, ...props }) => {
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width)
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [children])

  return (
    <button
      id={name}
      name={name}
      ref={ref}
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`
            }
          : {}
      }
      {...props}
    >
      {isLoading ? <Loader width="1.5rem" height="1.5rem" /> : children}
    </button>
  )
}

Button.defaultProps = {}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  className: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool
}

export default Button
