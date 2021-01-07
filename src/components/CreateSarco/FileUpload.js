import React from 'react'
import Button from '../layout/Button'
import Input from '../layout/Input'
import question from '../../assets/images/question.svg'

const FileUpload = ({ file="" }) => (
  <div className="relative w-full h-full px-4"> 
    <div className="flex my-3">
      <span className="mr-2">File to Upload</span>
      <img src={question} alt="" className="" />
    </div>
    <div className="border border-white my-3 pl-4 text-gray-400 flex items-center" style={{ height: '1.88rem' }}>{file.name || "File"}</div>
    <Input type="file" onClick={() => null} />
    
    <div className="flex mt-6 mb-2">
      <span className="mr-2">Set Resurrection Time</span>
      <img src={question} alt="" className="" />
    </div>
    <div className="border border-white my-3 pl-4 text-gray-400 flex items-center overflowX-hidden" style={{ height: '1.88rem' }}>{file.name || "Year, Month, Day, Hour, Minute"}</div>
    <Button label="Choose Resurrection Time" _classNames="w-full mt-3" height="md" />

    <div className="flex mt-6 mb-2">
      <span className="mr-2">Recipient Address</span>
      <img src={question} alt="" className="" />
    </div>
    <Input type="text" height="md" placeholder="0x_______" />



    <Button label="Next: Settings" _classNames="w-full bg-white text-gray-900 mt-6 mb-4" height="lg" />
  </div>
)

export default FileUpload