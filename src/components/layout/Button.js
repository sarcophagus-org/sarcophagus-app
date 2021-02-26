import React from 'react'
import classnames from 'classnames'

const heightOptions = {
  sm: '1.25rem',
  md: '2.625rem',
  lg: '2.65rem'
}

const lineHeightOptions = {
  default: '1.625rem'
}

const widthOptions = {
  default: '12.75rem',
}

const base = "text-md font-medium flex justify-center items-center focus:outline-none"
const border = "text-white border border-white"
const disabled = "text-gray-400 border border-500"
const error = ""

const Button = ({label, isDisabled=false, _classnames, errors, height="md", width="default", ...rest}) => (
  <button 
    className={isDisabled ? classnames(base, disabled, _classnames) : errors ? classnames(base, disabled, error, _classnames) : classnames(base, border, _classnames)} 
    style={{height: heightOptions[height], width: widthOptions[width], lineHeight: lineHeightOptions['default']}}
    {...rest}
  >
    { label }
  </button>
)

export default Button