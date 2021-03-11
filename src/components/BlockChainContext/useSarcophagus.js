import { BigNumber, utils } from 'ethers'
import { toast } from 'react-toastify'
import { ACTIONS, STATUSES } from '../../constants'
import { formatCustomResurrectionTime } from "../../utils/datetime";
import { initialValues } from '../Accuse/initialValues';

const useSarcophagus = (sarcophagusContract) => {

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, history, refresh) => {
      /* Create Sarco Transaction */
      try {
        const txReceipt = await sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.address, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
        console.info("CREATE TX HASH", txReceipt.hash)
        
        /* Send File to Archaeologist */
        const storageObject = {action: ACTIONS.SARCOPHAGUS_CREATED, sarcophagusName: sarcophagusName, doubleEncryptedFile: doubleEncryptedFile, endpoint: archaeologist.endpoint, txReceipt: txReceipt}
        localStorage.setItem(assetDoubleHash, JSON.stringify(storageObject))
        toast.dark('Creating Sarcophagus')
          
        await refresh()
        await history.replace('/')
        } catch(e) {
          if(e?.code === 4001) {
            toast.error('Transaction Rejected')
          } 
          else if(e?.code === -32603) {
            if(e?.data?.message === "execution reverted: revert resurrection time must be in the future") {
              toast.error('Resurrection time must be in the future')
            }
          }
          else {
            toast.error('There was a problem creating sarcophagus')
            console.error("There was a problem creating sarcophagus:", e)
          }
        }
  }

  const updateSarcophagus = async (sarcophagus, setCurrentStatus, refresh, toggle, setError) => {
    try {

      const doubleHashUint = Buffer.from(utils.arrayify(sarcophagus.AssetDoubleHash))
      const storage = localStorage.getItem(doubleHashUint.toLocaleString())
      const parsedStorage = JSON.parse(storage)

      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = parsedStorage
      NewPublicKey = Buffer.from(NewPublicKey, 'base64')
      const txReceipt = await sarcophagusContract.updateSarcophagus(NewPublicKey, AssetDoubleHash, AssetId, V, R, S)
      console.info("UPDATE TX HASH", txReceipt.hash)
      // Mine Transaction

      const storageObject = { action: ACTIONS.TRANSACTION_MINING_IN_PROGRESS, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refresh()
      await toggle()
    } catch (e) {
      if(e?.code === 4001) {
        toast.error('Transaction Rejected')
      } 
      else if(e?.code === -32603) {
        if(e?.message === "execution reverted: public key already used") {
          toast.error('Public key already used')
          setCurrentStatus('')
          setError('Public key already used')
        }
      }
      else {
        toast.error('There was a problem updating sarcophagus')
        console.error('There was a problem updating sarcophagus', e)
      }
    }
  }

  const rewrapSarcophagus = async (sarcophagus, values, refresh, toggle, setCurrentStatus, refreshTimers) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { bounty, diggingFee, resurrectionTime, custom } = values

      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))

      let resurrectionTimeUTC = custom ?
        formatCustomResurrectionTime(resurrectionTime) :
        BigNumber.from(resurrectionTime / 1000)

      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())

      const txReceipt = await sarcophagusContract.rewrapSarcophagus(doubleHashUint, resurrectionTimeUTC, diggingFeeBN, bountyBN)
      console.info("REWRAP TX HASH", txReceipt.hash)
      // create storage object for rewraping
      const storageObject = { action: ACTIONS.TRANSACTION_MINING_IN_PROGRESS, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refreshTimers()
      refresh()
      await toggle()
    } catch (e) {
      if(e?.code === 4001) {
        toast.error('Transaction Rejected')
      } 
      else if(e?.code === -32603) {
        if(e?.data?.message === "execution reverted: revert resurrection time must be in the future") {
          toast.error('Resurrection time must be in the future')
        }
      }
      else {
        toast.error('There was a problem rewrapping sarcophagus')
        console.error('There was a problem rewrapping sarcophagus', e)
      }
    }

  }

  const burySarcophagus = async (sarcophagus, setCurrentStatus, refresh, toggle, refreshTimers) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.burySarcophagus(doubleHashUint)
      console.info("BURY TX HASH", txReceipt.hash)

      const storageObject = { action: ACTIONS.TRANSACTION_MINING_IN_PROGRESS, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refreshTimers()
      refresh()
      await toggle()

    } catch (e) {
      if(e?.code === 4001) {
        toast.error('Transaction Rejected')
      }
       else {
        toast.error('There was a problem buring sarcophagus')
        console.error('There was a problem buring sarcophagus', e)
      }
    }
  }

  const cleanSarcophagus = async (sarcophagus, setCurrentStatus, archaeologist, toggle, refresh, refreshTimers) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { address } = archaeologist
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.cleanUpSarcophagus(doubleHashUint, address)
      console.info("CLEAN TX HASH", txReceipt.hash)

      const storageObject = { action: ACTIONS.TRANSACTION_MINING_IN_PROGRESS, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refreshTimers()
      refresh()
      await toggle()
    } catch (e) {
      if(e?.code === 4001) {
        toast.error('Transaction Rejected')
      } else {
        toast.error('There was a problem cleaning sarcophagus')
        console.error('There was a problem cleaning sarcophagus', e)
      }
    }
  }

  const cancelSarcophagus = async (sarcophagus, setCurrentStatus, toggle, refresh, refreshTimers) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.cancelSarcophagus(doubleHashUint)
      console.info("CANCEL TX HASH", txReceipt.hash)

      const storageObject = { action: ACTIONS.TRANSACTION_MINING_IN_PROGRESS, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refreshTimers()
      refresh()
      await toggle()
    } catch (e) {
      if(e?.code === 4001) {
        toast.error('Transaction Rejected')
      } else {
        toast.error('There was a problem canceling sarcophagus')
        console.error('There was a problem canceling sarcophagus', e)
      }
      
    }
  }

  const accuseArchaeologist = async (values, resetForm) => {
    try{ 

      const { singleHash, identifier, address } = values
      const identifierUint = Buffer.from(utils.arrayify(identifier))
      const singleHashUint = Buffer.from(utils.arrayify(singleHash))
      const txReceipt = await sarcophagusContract.accuseArchaeologist(identifierUint, singleHashUint, address)
      console.info("Accuse TX HASH", txReceipt.hash)
      await resetForm(initialValues)
      toast.error('The accusal was successful', {toastId: 'accuseFail', position: 'top-center', autoClose: 5000})
    } catch (e) {
      if(e?.code === 4001) {
        toast.error('Transaction Rejected')
      } else {
        toast.error('The accusal was unsuccessful', {toastId: 'accuseFail', position: 'top-center', autoClose: 5000})
        console.error('Accused Unsuccessful: ', e)
      }
      
    }
  
  }

  return { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, burySarcophagus, rewrapSarcophagus, accuseArchaeologist }

}



export {
  useSarcophagus
}