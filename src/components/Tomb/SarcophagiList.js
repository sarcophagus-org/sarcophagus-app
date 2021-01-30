import React from 'react'
import { useData } from '../BlockChainContext'
import useCheckStatus from '../customHooks/useCheckStatus'
import Title from '../layout/Title'
import question from '../../assets/images/question.svg'
import { useSarcophagi } from '../BlockChainContext/useSarcophagi'
import { MESSAGES } from '../../constants'
import ResurrectionTimer from './ResurrectionTimer'
import Button from '../layout/Button'

const PendingActionSarcophagus = ({sarcophagus, message, error, handleApprove}) => {
  return (
    <div className="absolute top-0 -mt-3" style={{right: '1rem'}}>
      {message === MESSAGES.STATUS_AWAITING_APPROVAL 
      ? (
        <Button onClick={handleApprove} label="Approve" />
        ) : (
        <>{message}</>
      )}
    </div>
    )
}

const CompletedSarcophagus = ({sarcophagus}) => {
  // TODO Will need to add active and disabled states
  return (
    <div className="absolute top-0 -mt-3" style={{right: '1rem'}}>
      {">"} <span className="text-white underline">Rewrap</span>
    </div>
  )
}

const Sarcophagus = ({sarcophagus, updateSarcophagus}) => {
  const { message, error } = useCheckStatus(sarcophagus.AssetDoubleHash, sarcophagus)
  const handleApprove = async () => {
    await updateSarcophagus(sarcophagus)
  }
  return (
    <div className="border border-gray-500 text-white text-md flex px-4 my-4 items-center relative" style={{height: '4.375rem', width: '24.6875rem'}}>
      <div>
          <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
          <ResurrectionTimer resurrectionTime={sarcophagus.resurrectionTime} />
      </div>
      {message === MESSAGES.STATUS_FINISH 
        ? (<CompletedSarcophagus sarcophagus={sarcophagus} />)
        : (<PendingActionSarcophagus sarcophagus={sarcophagus} error={error} message={message} handleApprove={handleApprove}/>)
      }
  </div>
  )
}

const SarcophagiList = () => {
  const { sarcophagusContract, updateSarcophagus } = useData()
  const { sarcophagi, pendingCount } = useSarcophagi(sarcophagusContract)
  return (
    <div className="" style={{width: '24.6875rem'}}>
      <div className="flex justify-between">
        <div className="flex">
          <Title type="subOne" title={`Sarcophagi (${sarcophagi?.length})`} />
          <img alt="" src={question} className="ml-2"/>
        </div>
        <Title type="subOne" title={`Pending: (${pendingCount})`} />
      </div>
      <div className="mt-8">
        {sarcophagi?.map((sarcophagus, i) => <Sarcophagus key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} updateSarcophagus={updateSarcophagus}/>)}
      </div>
    </div>
  )
}
export default SarcophagiList
