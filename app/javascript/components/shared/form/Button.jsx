import React from "react"
import PropTypes from "prop-types"
import { useSpring, animated } from "react-spring"

import Loader from "./../Loader"

const Button = ({ name, children, isLoading, ...props }) => {
  const [width, setWidth] = React.useState(false)
  const [height, setHeight] = React.useState(false)
  const [showLoader, setShowLoader] = React.useState(false)

  const ref = React.useRef(null)

  const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 })
  const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 })

  React.useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width)
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [children])

  React.useEffect(() => {
    if (isLoading) {
      setShowLoader(true)
    }

    if (!isLoading && showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false)
      }, 400)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isLoading, showLoader])

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
      {showLoader ? (
        <animated.div style={fadeOutProps}>
          <Loader width="1.5rem" height="1.5rem" />{" "}
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>{children}</animated.div>
      )}
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
