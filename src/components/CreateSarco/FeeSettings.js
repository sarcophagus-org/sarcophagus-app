import React from 'react'
import Button from '../layout/Button'
import Input from '../layout/Input'
import Title from '../layout/Title'

const Settings = () => (
  <div className="relative w-full h-full px-4">

    <Title title="Bounty Fees" />
    <Input type="text" height="md" placeholder="100 Sarco (Suggested)" />

    <Title title="Digging Fees" /> 
    <Input type="text" height="md" placeholder="10 Sarco (Suggested)" />
    
    <Button label="Next: Choose Archaeologist" _classNames="w-full bg-white text-gray-900 mt-6 mb-4" height="lg" onClick={() => null} />
  </div>
)


export default Settings