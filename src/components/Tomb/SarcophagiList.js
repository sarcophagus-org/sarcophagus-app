import React from 'react'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import Tabs from './Tabs'
import SarcophagusWrapper from './Embalmer/SarcophagusWrapper'
import RecipientSarcophagusWrapper from './Recipient/SarcophagusWrapper'
import OverSarcophagusWrapper from './Over/SarcophagusWrapper'
import MockSarcophagus from './MockSarcophagus'
import { useData } from '../BlockChainContext'
import { connect } from '../../web3/userSupplied'
import { useWeb3 } from '../../web3'


const SarcophagiList = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const { account } = useWeb3()
  const { embalmerSarcophagi, overSarcophagi, recipientSarcophagi, refresh } = useData()

  return (
    <div className="border-t border-gray-500 md:border-none mt-8 md:mt-0 pt-8 md:pt-0 w-full overflow-x-scroll hide-scrollbar" style={{maxWidth: '34.4375rem'}}>
      <Tabs embalmerCount={embalmerSarcophagi?.length} recipientCount={recipientSarcophagi?.length} overCount={overSarcophagi?.length}/>

      <div className="mt-8">
        <Route path={`${match.path}`} exact>
          {!account && <MockSarcophagus message="Connect to a wallet to get started" handleClick={() => connect()}/>}
          {account && !embalmerSarcophagi.length && <MockSarcophagus message="Create an sarcophagus" handleClick={() => history.push('/create')} />}
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
