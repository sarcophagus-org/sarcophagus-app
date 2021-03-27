import { useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { useWeb3 } from '../../../web3'
import { useAddresses } from '../../../web3/chains'
import SarcophagusABI from './artifacts/SarcophagusABI.json'
import SarcoTokenABI from './artifacts/SarcoTokenABI.json'

const useSarcophagusContract = () => {
  const { chainId, signerOrProvider } = useWeb3()
  const addresses = useAddresses(chainId)
  const [sarcophagusContract, setSarcophagusContract] = useState()

  useEffect(() => {
    if (!chainId || !addresses || !signerOrProvider) return
    try{
      const contract = new Contract(addresses.sarcophagus, SarcophagusABI, signerOrProvider)
      setSarcophagusContract(contract)
    } catch (e) {
      console.error('sarco contract error', e)
    }
  }, [chainId, signerOrProvider, addresses])

  return sarcophagusContract
}

const useSarcophagusTokenContract = (sarcophagusContract) => {
  const { signerOrProvider } = useWeb3()
  const [sarcophagusTokenContract, setSarcophagusTokenContract] = useState()

  useEffect(() => {
    if (!sarcophagusContract || !signerOrProvider) return

    sarcophagusContract.sarcoToken().then(sarcoToken => {
      try {
        const contract = new Contract(sarcoToken, SarcoTokenABI, signerOrProvider)
        setSarcophagusTokenContract(contract)
      } catch (e) {
        console.error('sarco token contract error', e)
      }
    }).catch(console.error)
  }, [sarcophagusContract, signerOrProvider])

  return sarcophagusTokenContract
}

export { 
  useSarcophagusContract,
  useSarcophagusTokenContract,
 }
