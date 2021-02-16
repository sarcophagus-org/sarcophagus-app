import React from 'react'
import Tabs from './Tabs'
import SarcophagusWrapper from './Embalmer/SarcophagusWrapper'
import RecipientSarcophagusWrapper from './Recipient/SarcophagusWrapper'
import OverSarcophagusWrapper from './Over/SarcophagusWrapper'
import { useData } from '../BlockChainContext'
import { useRecipientSarcophagi } from '../BlockChainContext/useRecipientSarcophagi'
import { useEmbalmerSarcophagi } from '../BlockChainContext/useEmbalmerSarcophagi'
import { Route, useRouteMatch } from 'react-router-dom'


const SarcophagiList = () => {
  const match = useRouteMatch()
  const { sarcophagusContract } = useData()
  const { embalmerSarcophagi, overSarcophagi, getSarcophagiCount } = useEmbalmerSarcophagi(sarcophagusContract)
  const { recipientSarcophagi, getRecipientSarcophagiCount } = useRecipientSarcophagi(sarcophagusContract)

  const refresh = () => {
    getSarcophagiCount()
    getRecipientSarcophagiCount()
  }

  return (
    <div className="border-t border-gray-500 md:border-none mt-8 md:mt-0 pt-8 md:pt-0 w-full" style={{maxWidth: '34.4375rem'}}>
      <Tabs embalmerCount={embalmerSarcophagi?.length} recipientCount={recipientSarcophagi?.length} overCount={overSarcophagi?.length}/>

      <div className="mt-8">
        <Route path={`${match.path}`} exact>
          {embalmerSarcophagi?.map((sarcophagus, i) => <SarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} refresh={refresh} />)}
        </Route>
        <Route path={`${match.path}/received`}>
          {recipientSarcophagi?.map((sarcophagus, i) => <RecipientSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} refresh={refresh}/>)}
        </Route>
        <Route path={`${match.path}/over`}>
          {overSarcophagi?.map((sarcophagus, i) => <OverSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} refresh={refresh} />)}
        </Route>
      </div>
    </div>
  )
}
export default SarcophagiList
