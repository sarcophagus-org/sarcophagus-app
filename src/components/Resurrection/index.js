import { utils } from 'ethers'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSarcophagusContract } from '../BlockChainContext/contracts'
import { useRecipientSarcophagi } from '../BlockChainContext/useRecipientSarcophagi'
import RecipientSarcophagusWrapper from '../Tomb/Recipient/SarcophagusWrapper'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}
const Resurrection = () => {
    const sarcophagusContract = useSarcophagusContract()

    // retrieve keys from query
    let query = useQuery()
    const recipientPrivateKey = query.get('recipientPrivateKey')
    const keys = { recipientPrivateKey }

    // takes private key param and converts to address

    // TODO will need to update this component to have input field
    const address = recipientPrivateKey ? utils.computeAddress(recipientPrivateKey) : "0x000000000000000000"
    const { recipientSarcophagi } = useRecipientSarcophagi(sarcophagusContract, address)
    
    
    return (
        <div className="mx-auto" style={{width: '36rem'}}>
           {recipientSarcophagi?.map((sarcophagus, i) => <RecipientSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} keys={keys}/>)}
        </div>
    )
}

export default Resurrection