import React  from 'react'
import { useData } from '../BlockChainContext'
import useArweave from '../customHooks/useArweave'
import Title from '../layout/Title'
import question from '../../assets/images/question.svg'
import { useSarcophagi } from '../BlockChainContext/useSarcophagi'
import { SARCOPHAGI_STATUS_MESSAGES } from '../../constants'
import { useResurrectionTimer } from '../customHooks/useTimers'

const PendingActionSarcophagus = (sarcophagus, status, error) => {
  return (
    <div className="absolute top-0 -mt-3" style={{right: '1rem'}}>
      Pending
    </div>
    )
}

const MinedSarcophagus = ({sarcophagus}) => {
  return (
    <div className="absolute top-0 -mt-3" style={{right: '1rem'}}>
      Success
    </div>
  )
}

const Sarcophagus = ({sarcophagus}) => {
  const { status, error } = useArweave(sarcophagus.AssetDoubleHash, sarcophagus.name)
  const { timeTillResurrection } = useResurrectionTimer(sarcophagus.resurrectionTime)

  return (
    <div className="border border-gray-500 text-white text-md flex px-4 my-3 items-center relative" style={{height: '4.375rem', width: '24.6875rem'}}>
      <div>
          <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
          <div className="text-sm" style={{lineHeight: '1.0625rem'}}>Resurrection: {timeTillResurrection}</div>
      </div>
      {status === SARCOPHAGI_STATUS_MESSAGES.STATUS_SUCCESS 
        ? (<MinedSarcophagus sarcophagus={sarcophagus} />)
        : (<PendingActionSarcophagus sarcophagus={sarcophagus} error={error} status={status} />)
      }
  </div>
  )
}

const SarcophagiList = () => {
  const { sarcophagusContract } = useData()
  const { sarcophagi } = useSarcophagi(sarcophagusContract)
  return (
    <div className="" style={{width: '24.6875rem'}}>
      <div className="flex">
        <Title type="subOne" title={`Sarcophagi (${sarcophagi.length})`} />
        <img alt="" src={question} className="ml-2"/>
      </div>
      <div className="mt-8">
        {sarcophagi.map((sarcophagus, i) => <Sarcophagus key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} />)}
      </div>
    </div>
  )
}
export default SarcophagiList
