import React from 'react'

const ArchTableRow = ({ headerOne, headerTwo, headerThree }) => (
  <div className="grid grid-cols-2 pl-6 text-gray-400 text-sm mb-4">
    <div className="flex justify-between" >
      <div className="whitespace-nowrap" style={{width: '6.875rem'}}>{ headerOne }</div>
      <div className="" style={{width: '6.875rem'}}>{ headerTwo }</div>
    </div>
    <div className="grid grid-cols-2">
      <div></div>
      <div className="grid grid-cols-2 items-center">
        <div></div>
        <div>
          { headerThree }
        </div>
      </div>
    </div>
  </div>
)

export default ArchTableRow