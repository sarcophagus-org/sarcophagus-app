import { useEffect, useState } from 'react'
import { useWeb3 } from '../../web3'
import { Contract } from 'ethers'
import { useAddresses } from '../../web3/chains'
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

const useSarcophagusTokenContract = () => {
  const { chainId, signerOrProvider } = useWeb3()
  const addresses = useAddresses(chainId)
  const [sarcophagusTokenContract, setSarcophagusTokenContract] = useState()

  useEffect(() => {
    if (!chainId || !addresses || !signerOrProvider) return
    try {
      const contract = new Contract(addresses.sarcophagusToken, SarcoTokenABI, signerOrProvider)
      setSarcophagusTokenContract(contract)
    } catch (e) {
      console.error('sarco token contract error', e)
    }
  }, [chainId, signerOrProvider, addresses])

  return sarcophagusTokenContract
}

export { 
  useSarcophagusContract,
  useSarcophagusTokenContract,
 }
