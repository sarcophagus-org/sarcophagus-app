import React from 'react'
import classnames from 'classnames'

const heightOptions = {
  sm: '1.25rem',
  md: '1.88rem',
  lg: '2.25rem'
}

const baseText = "w-full pl-4 placeholder-text border border-white"
const errorText = ""

const TextInput = ({ type, label="", height="md", error, ...rest }) => (
  <input type={type} className={classnames(error ? classnames(baseText, errorText) : classnames(baseText))} style={{height: heightOptions[height], backgroundColor: 'unset'}} {...rest} />
)

// const baseFile = ""
// const errorFile = ""

const FileInput = ({ type, height="md", ...rest }) => (
  <>
    <input type={type} className="inputfile" {...rest} />
    <label htmlFor="file" className="w-full" style={{height: heightOptions[height]}}>
      <span className="flex justify-center items-center h-full">Upload File</span>
    </label>
  </>
)

const Input = ({ type='text', ...rest} ) => {
  if(type === "text" || type === "number") return <TextInput type={type} {...rest} />
  if(type === "file" ) return <FileInput type={type} {...rest} />
  return <></>
}

export default Input