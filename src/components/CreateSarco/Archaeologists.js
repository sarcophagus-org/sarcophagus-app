import React from 'react'
import { useData } from '../BlockChainContext'
import Button from '../layout/Button'
import Input from '../layout/Input'
import question from '../../assets/images/question.svg'
import warning from '../../assets/images/warning.svg'
import { truncate } from '../../utils'

const ArchaeologistList = () => {
  const { archaeologists } = useData()
  return archaeologists.map((archaeologist) => (
    <div key={archaeologist.archaeologist} className="my-3 border border-white grid" style={{height: '5rem'}}>
        <div className="flex flex-col col-start-1 pt-3 pl-4 relative mr-4">
          <span className="">Arch {truncate( archaeologist.archaeologist, 20, null, 2 )}</span>
          <span className="absolute bottom-0 text-gray-400 border-b border-gray-400 mb-3">Show Metrics</span>
        </div>
        
        <div className="h-full border-l border-white col-start-2 pt-3">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-content">300<div className="h-4 w-8 ">
              <img className="w-full h-full" alt="" src={warning} />
            </div>
          </div>
          <div className="text-center">Total</div>
          </div>
        </div>
    </div>
  ))
}

const Archaeologists = () => (
  <div className="relative w-full h-full px-4">
    
    <div className="flex my-3">
      <span className="mr-2 text-lg">Archaeologists</span>
      <img src={question} alt="" className="" />
    </div>
    <ArchaeologistList />
  </div>
)


export default Archaeologists