import React from 'react'
import { useData } from '../BlockChainContext'
import Title from '../layout/Title'
import { useSarcophagi } from '../BlockChainContext/useSarcophagi'
import SarcophagusContainer from './SarcophagusContainer'
import Tooltip from '../layout/Tooptip'


const SarcophagiList = () => {
  const { sarcophagusContract } = useData()
  const { sarcophagi, pendingCount } = useSarcophagi(sarcophagusContract)
  return (
    <div className="border-t border-gray-500 md:border-none mt-8 md:mt-0 pt-8 md:pt-0 w-full" style={{maxWidth: '24.6875rem'}}>
      <div className="flex justify-between">
        <div className="flex">
          <Title type="subOne" title={`Sarcophagi (${sarcophagi?.length})`} />
          <Tooltip>
            <div>Active sarcophagi</div>
            <div>Current status and resurrection time will be displayed</div>
          </Tooltip>
        </div>
        <div className="flex">
          <Title type="subOne" title={`Inactive: (${pendingCount})`} />
          <Tooltip>
          <div>Inactive sarcophagi</div>
          <div>Click to view previous sarcophagi details</div>
          </Tooltip>
        </div>
      </div>
      <div className="mt-8">
        {sarcophagi?.map((sarcophagus, i) => <SarcophagusContainer key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} />)}
      </div>
    </div>
  )
}
export default SarcophagiList
