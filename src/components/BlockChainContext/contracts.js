import { useEffect, useState } from 'react'
import { useWeb3 } from '../../web3'
import { Contract } from 'ethers'
import { useAddresses } from '../../web3/chains'
import Sarcophagus from '../../build/Sarcophagus.json'
import SarcophagusToken from '../../build/SarcophagusToken.json'

const useSarcophagusContract = () => {
  const { chainId, signerOrProvider } = useWeb3()
  const addresses = useAddresses(chainId)
  const [sarcophagusContract, setSarcophagusContract] = useState()

  useEffect(() => {
    if (!chainId || !addresses || !signerOrProvider) return

    setSarcophagusContract(new Contract(addresses.sarcophagus, Sarcophagus.abi, signerOrProvider))
  }, [chainId, signerOrProvider, addresses])

  return sarcophagusContract
}

const useSarcophagusTokenContract = () => {
  const { chainId, signerOrProvider } = useWeb3()
  const addresses = useAddresses(chainId)
  const [sarcophagusTokenContract, setSarcophagusTokenContract] = useState()

  useEffect(() => {
    if (!chainId || !addresses || !signerOrProvider) return

    setSarcophagusTokenContract(new Contract(addresses.sarcophagusToken, SarcophagusToken.abi, signerOrProvider))
  }, [chainId, signerOrProvider, addresses])

  return sarcophagusTokenContract
}

const useDecimals = (contract) => {
  const [decimals, setDecimals] = useState(0)

  useEffect(() => {
    if (!contract) return

    contract.decimals().then(decimals => {
      setDecimals(decimals)
    }).catch(console.error)
  }, [contract])

  return decimals
}

export { 
  useSarcophagusContract,
  useSarcophagusTokenContract,
  useDecimals
 }
