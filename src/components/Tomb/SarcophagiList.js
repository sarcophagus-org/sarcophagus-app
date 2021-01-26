import React from 'react'
import { useData } from '../BlockChainContext'
import useArweave from '../customHooks/useArweave'
import Title from '../layout/Title'
import question from '../../assets/images/question.svg'

const Sarcophagus = ({sarcophagus}) => {
  const { status } = useArweave(sarcophagus)
  return (
    <div className="border border-gray-500 text-white text-md flex px-4 my-3 items-center" style={{height: '4.375rem', width: '24.6875rem'}}>
      <div>
          <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
          <div className="text-sm" style={{lineHeight: '1.0625rem'}}>Resurrection: </div>
      </div>
      <div>
          {status}
      </div>
  </div>
  )
}

const SarcophagiList = () => {
  const { sarcophagi } = useData()
  
  return (
    <div className="">
      <div className="flex">
        <Title type="subOne" title={`Sarcophagi (${sarcophagi.length})`} />
        <img alt="" src={question} className="ml-2"/>
      </div>
      <div className="mt-8">
        { sarcophagi.map((sarcophagus, i) => <Sarcophagus key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} />)}
      </div>
    </div>
  )
}
export default SarcophagiList
