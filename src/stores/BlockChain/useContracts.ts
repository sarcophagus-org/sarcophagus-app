import { useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { useWeb3 } from '../../web3'
import { useAddresses } from '../../web3/chains'
import SarcophagusABI from './artifacts/Sarcophagus.abi.json'
import SarcoTokenABI from './artifacts/SarcoToken.abi.json'

const useSarcophagusContract = () => {
  const { chainId, signerOrProvider } = useWeb3()
  const { moduleMap } = useAddresses(chainId)
  const [sarcophagusContract, setSarcophagusContract] = useState<Contract | undefined>(undefined)

  useEffect(() => {
    if (!chainId || !moduleMap || !signerOrProvider) return
    try{
      const contract = new Contract(moduleMap, SarcophagusABI, signerOrProvider)
      setSarcophagusContract(contract)
    } catch (e) {
      console.error('sarco contract error', e)
    }
  }, [chainId, signerOrProvider, moduleMap])

  return sarcophagusContract
}

const useSarcophagusTokenContract = (sarcophagusContract: Contract | undefined) => {
  const { signerOrProvider } = useWeb3()
  const [sarcophagusTokenContract, setSarcophagusTokenContract] = useState<Contract | undefined>(undefined)

  useEffect(() => {
    if (!sarcophagusContract || !signerOrProvider) return

    sarcophagusContract.sarcoToken().then((sarcoTokenAddress: string) => {
      try {
        const contract = new Contract(sarcoTokenAddress, SarcoTokenABI, signerOrProvider)
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
