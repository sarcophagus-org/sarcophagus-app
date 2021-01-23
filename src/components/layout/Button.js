import React from 'react'
import classnames from 'classnames'

const heightOptions = {
  sm: '1.25rem',
  md: '1.88rem',
  lg: '2.65rem'
}

const lineHeightOptions = {
  default: '1.625rem'
}

const base = "text-md font-medium flex justify-center items-center focus:outline-none"
const border = "text-white border border-white"
const disabled = "text-gray-400 border border-500"
const error = ""

const Button = ({label, isDisabled=false, _classNames, errors, height="md", ...rest}) => (
  <button 
    className={isDisabled ? classnames(base, disabled, _classNames) : errors ? classnames(base, disabled, error, _classNames) : classnames(base, border, _classNames)} 
    style={{height: heightOptions[height], width: '12.75rem', lineHeight: lineHeightOptions['default']}}
    {...rest}
  >
    { label }
  </button>
)

export default Button