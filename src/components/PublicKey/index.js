import { utils } from 'ethers'
import React, { useState } from 'react'
import { useWeb3 } from '../../web3'
import Button from '../layout/Button'
import Title from '../layout/Title'
import icon from '../../assets/images/copy.svg'
import { toast } from 'react-toastify'

const PublicKey = () => {
  const [ publicKey, setPublicKey ] = useState('')
  const { account, signerOrProvider } = useWeb3()

  const getPublicKey = async () => {
    try {
      const msg = "Hello from the Sarcophagus! Sign this message to retrieve your account's public key"
      const msgHash = utils.hashMessage(msg);
      const msgHashBytes = utils.arrayify(msgHash);
      const signature = await signerOrProvider.signMessage("Hello from the Sarcophagus! Sign this message to retrieve your account's public key")
      const recoveredPubKey = utils.recoverPublicKey(msgHashBytes, signature);
      setPublicKey(recoveredPubKey)
    } catch (error) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.error('We can encrypt anything without the key.');
      } else {
        console.error(error);
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey)
    toast.dark('Copied to clipboard', {autoClose: 2000})
  }
  return (
    <div className="p-4 flex gap-4 flex-wrap md:flex-nowrap justify-center md:justify-start">
      <div className="mr-4 mt-2 text-base w-104 md:w-128">
        <div>To receive and decrypt a Sarcophagus after it's been resurrected, the embalmber needs your public key</div>
        <div className="mt-4">1. Log with account that will receive Sarcophagus</div>
        <div className="mt-4">2. Click the button to retreive your public key</div>
        <div className="mt-4">2. Give your public key to the embalmer</div>
        <Button isDisabled={!account} _classnames="mt-4" type="button" onClick={getPublicKey} label="Get Public Key"/>
      </div>

      <div className="flex flex-col items-center mt-2 relative">
        {publicKey && 
          <>
            <div className="absolute right-1 top-1" onClick={handleCopy}>
                <img src={icon} alt="" className=""/>
            </div>
            <Title title="Your Public Key" type="subOne"/>
            <div className="border-t-2 border-b-2 border-gray-300 py-8 mt-4">
              <div className="bg-black w-104 break-words text-md p-4"> {publicKey} </div>
            </div> 
          </>
        }
      </div>
    </div>
  )
}

export default PublicKey