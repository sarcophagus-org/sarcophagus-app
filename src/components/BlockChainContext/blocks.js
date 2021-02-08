import { useEffect, useState } from "react"
import { useWeb3 } from "../../web3"

const useCurrentBlock = () => {
    const [currentBlock, setCurrentBlock] = useState(0)
    const { provider } = useWeb3()
  
    useEffect(() => {
      if (!provider) return
  
      provider.getBlockNumber().then(blockNumber => {
        setCurrentBlock(blockNumber)
      }).catch(console.error)
  
      const getBlockNumber = blockNumber => {
        setCurrentBlock(blockNumber)
      }
  
      provider.on('block', getBlockNumber)
  
      return () => {
        provider.removeListener('block', getBlockNumber)
      }
    }, [provider])
  
    return currentBlock
  }

export {
    useCurrentBlock
}