import { useState, useEffect } from 'react'
import { BigNumber } from 'ethers'
import { useWeb3 } from '../../web3'


const useSarcoAllowance = ( sarcophagusContract, sarcophagusTokenContract ) => {
    const { account } = useWeb3()
    const [ allowance, setAllowance ] = useState(BigNumber.from(0))

    useEffect(() => {
        if(!account || !sarcophagusContract || !sarcophagusTokenContract) return
        sarcophagusTokenContract.allowance(account, sarcophagusContract?.address).then(allowance => {
            setAllowance(allowance)
        }).catch(e => console.error(e))
    }, [account, sarcophagusContract, sarcophagusTokenContract])
    return allowance
}

export { useSarcoAllowance }