import React from 'react'
import Button from '../layout/Button'
import Input from '../layout/Input'
import question from '../../assets/images/question.svg'

const Archeologists = () => {
  
  return (
    <div className="relative w-full h-full px-4">
      
      <div className="flex my-3">
        <span className="mr-2">Bounty</span>
        <img src={question} alt="" className="" />
      </div>
      <Input type="text" height="md" placeholder="100 Sarco (Suggested)" />

      <div className="flex mt-6 mb-2">
        <span className="mr-2">Digging Fees</span>
        <img src={question} alt="" className="" />
      </div>
      <Input type="text" height="md" placeholder="10 Sarco (Suggested)" />
      
      <Button label="Next: Choose Archeologist" _classNames="w-full bg-white text-gray-900 mt-6 mb-4" height="lg" onClick={() => null} />
    </div>
  )
}

export default Archeologists