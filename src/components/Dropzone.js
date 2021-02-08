import React from 'react'
import Dropzone from 'react-dropzone'
import uploadIcon from '../assets/images/upload.svg'
import classnames from 'classnames'

const border = "border-2 border-dashed border-gray-500"
const error = "border-2 border-dashed border-red"
const base = "cursor-pointer focus:outline-none"
const flex = "flex flex-col justify-center items-center"
const font = "text-white text-md"

const FileDropzone = ({handleFile, checkfileSize, file, errors,  ...rest}) => (
  <Dropzone onDrop={(files) => handleFile(files[0])} >
    {({ getRootProps, getInputProps }) => !file ? (
      <div {...getRootProps()} className={errors ? classnames(base, error, flex, font) : classnames(base, border, flex, font)} {...rest}>
        <input {...getInputProps()} multiple={false}/>
        <img src={uploadIcon} alt="" className="mb-2"/>
        <span>Drag and drop</span>
        <span>or</span>
        <span className="border-b">browse files</span>
      </div>
    ) : (
      <div {...getRootProps()} className={classnames(base, border, flex, font)} {...rest}>
        <input {...getInputProps()} multiple={false}/>
        <div className="flex flex-col justify-around items-center text-white overflow-hidden gap-4">
          <span>{file.name} uploaded successfully!</span>
          <div className="underline">Upload a different file</div>
        </div>
      </div>
    )}
  </Dropzone>
)

export default FileDropzone