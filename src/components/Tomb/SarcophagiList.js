import React from 'react'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import Tabs from './Tabs'
import SarcophagusWrapper from './Embalmer/SarcophagusWrapper'
import RecipientSarcophagusWrapper from './Recipient/SarcophagusWrapper'
import ArchivedSarcophagusWrapper from './Archived/SarcophagusWrapper'
import MockSarcophagus from './MockSarcophagus'
import { useData } from '../BlockChainContext'
import { useWeb3 } from '../../web3'
import { connect } from '../../web3/userSupplied'

const SarcophagiList = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const { account } = useWeb3()
  const { embalmerSarcophagi, archivedSarcophagi, recipientSarcophagi, refresh } = useData()
  return (
    <div className="border-t border-gray-500 md:border-none mt-8 md:mt-0 pt-8 md:pt-0 w-full overflow-x-scroll hide-scrollbar max-w-128">
      <Tabs embalmerCount={embalmerSarcophagi?.length} recipientCount={recipientSarcophagi?.length} archivedCount={archivedSarcophagi?.length}/>

      <div className="mt-8">
        <Route path={`${match.path}`} exact>
          {!account && <MockSarcophagus message="Connect to a wallet to get started" handleClick={() => connect()}/>}
          {account && !embalmerSarcophagi.length && <MockSarcophagus message="Create a sarcophagus" handleClick={() => history.push('/create')} />}
          {embalmerSarcophagi?.map((sarcophagus, i) => <SarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} refresh={refresh} />)}
        </Route>
        <Route path={`${match.path}/resurrect`}>
          {recipientSarcophagi?.map((sarcophagus, i) => <RecipientSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} refresh={refresh}/>)}
        </Route>
        <Route path={`${match.path}/archive`}>
          {archivedSarcophagi?.map((sarcophagus, i) => <ArchivedSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} refresh={refresh} />)}
        </Route>
      </div>
    </div>
  )
}
export default SarcophagiList
