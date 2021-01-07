import React from 'react'
import classnames from 'classnames'

const heightOptions = {
  sm: '1.25rem',
  md: '1.88rem',
  lg: '2.25rem'
}

const base = "border border-white flex justify-center items-center focus:outline-none"
const disabled = ""
const error = ""

const Button = ({label, isDisabled, _classNames, errors, height="md", ...rest}) => (
  <button 
    className={isDisabled ? classnames(base, disabled, _classNames) : errors ? classnames(base, error, _classNames) : classnames(base, _classNames)} 
    style={{height: heightOptions[height]}}
    {...rest}
  >
    { label }
  </button>
)

export default Button