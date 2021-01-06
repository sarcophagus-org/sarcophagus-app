import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    }
  }
}

const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions })

const useUserSuppliedConnect = () => {
  const [ userSupplied, setUserSupplied ] = useState({})
  const [ provider, setProvider ] = useState(false)
  const [ userSuppliedNext, setUserSuppliedNext ] = useState(false)
  const { ethereum } = window

  const createUserSupplied = useCallback(async (provider) => {
    const web3 = new ethers.providers.Web3Provider(provider)
    const network = await web3.getNetwork()
    const account = await web3.listAccounts()
    return { account: account[0], library: web3, chainId: network.chainId, active: !!account}
  },[])

  useEffect(() => {
    // connect to metamask and account if already connected
    if(web3Modal.cachedProvider && ethereum) {
        createUserSupplied(ethereum).then(userObj => {
          if(!!userObj.account){
            setProvider(ethereum)
            setUserSupplied(userObj)
          } else setUserSuppliedNext(true)
        })
    }    
  }, [ethereum, createUserSupplied])

    // listen for connect event and sets userSupplied object
    web3Modal.on('connect', async (provider) => {
      const userObj = await createUserSupplied(provider)
      setUserSupplied(userObj)
    })


  useEffect(() => {
    // listen for account changes
    if(provider && ethereum) {
      provider.on('accountsChanged', accounts => {
        if(accounts.length === 0) {
          setUserSupplied(userSupplied => {return {...userSupplied, account: accounts[0]}} )
          setUserSuppliedNext(true)
        }
        if(accounts.length >= 1) {
          setUserSupplied(userSupplied => {return {...userSupplied, account: accounts[0]}} )
        }
      })
      ethereum.on('chainChanged', async () => {
        // listen for provider changes 
        const userObj = await createUserSupplied(provider)
        setUserSupplied(userSupplied => {return  {...userSupplied, userObj }} )
      })
    }
  },[ provider, ethereum, createUserSupplied ])

  
  return { userSupplied, userSuppliedNext }
}

const connect = async () => {
  web3Modal.clearCachedProvider();
  web3Modal.connect().catch(console.error)
}

export { useUserSuppliedConnect, connect }
