import { BigNumber, utils } from 'ethers'
import { toast } from 'react-toastify'
import { ACCUSAL_SUCCESSFUL, ACCUSAL_UNSUCCESSFUL, ACTIONS, SARCOPHAGUS_CREATING, STATUSES, TRANSACTION_REJECTED } from '../../../constants'
import { formatCustomResurrectionTime } from "../../../utils/datetime";
import { initialValues } from '../../Accuse/initialValues';
import { useTransaction } from '../BlockChainContext/transaction';

const useSarcophagus = (sarcophagusContract) => {
  const { contractCall } = useTransaction()

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, history, refresh) => {
      /* Create Sarco Transaction */
      try {
        const txReceipt = await sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.address, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
        console.info("CREATE TX HASH", txReceipt.hash)
        
        /* Send File to Archaeologist */
        const storageObject = {action: ACTIONS.SARCOPHAGUS_CREATED, sarcophagusName: sarcophagusName, doubleEncryptedFile: doubleEncryptedFile, endpoint: archaeologist.endpoint, txReceipt: txReceipt}
        localStorage.setItem(assetDoubleHash, JSON.stringify(storageObject))
        toast.dark(SARCOPHAGUS_CREATING)
          
        await refresh()
        await history.replace('/')
        } catch(e) {
          if(e?.code === 4001) {
            toast.error(TRANSACTION_REJECTED)
          }
          else if(e?.error?.code === -32603) {
            if(e?.error?.message === "execution reverted: revert resurrection time must be in the future") {
              toast.error('Resurrection time must be in the future')
            }
            if(e?.error?.message === "execution reverted: ERC20: transfer amount exceeds balance") {
              toast.error('Sarco balance too low to execute transaction')
            }
          }
          else {
            toast.error('There was a problem creating sarcophagus')
            console.error("There was a problem creating sarcophagus:", e)
          }
        }
  }

  const updateSarcophagus = (sarcophagus, setCurrentStatus, refresh, toggle, setError) => {
    try {

      const doubleHashUint = Buffer.from(utils.arrayify(sarcophagus.AssetDoubleHash))
      const storage = localStorage.getItem(doubleHashUint.toLocaleString())
      const parsedStorage = JSON.parse(storage)

      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = parsedStorage
      NewPublicKey = Buffer.from(NewPublicKey, 'base64')

      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
        toggle()
      }

      const successCallback = ({transactionHash}) => {
        console.info("UPDATE TX HASH", transactionHash)
        refresh()
      }

      contractCall(sarcophagusContract.updateSarcophagus, 
        [ NewPublicKey, AssetDoubleHash, AssetId, V, R, S ], 
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
         'Transaction failed...', 'Transaction successful',
        successCallback)
    } catch (e) {
      if(e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED)
      } 
      else if(e?.error?.message === "execution reverted: public key already used") {
          toast.error('Public key already used')
          setCurrentStatus('')
          setError('Public key already used')
      }
      else {
        toast.error('There was a problem updating sarcophagus')
        console.error('There was a problem updating sarcophagus', e)
      }
    }
  }

  const rewrapSarcophagus = (sarcophagus, values, refresh, toggle, setCurrentStatus, refreshTimers) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { bounty, diggingFee, resurrectionTime, custom } = values

      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))

      let resurrectionTimeUTC = custom ? formatCustomResurrectionTime(resurrectionTime) : BigNumber.from(resurrectionTime / 1000)

      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())

      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
        toggle()
      }

      const successCallback = ({transactionHash}) => {
        console.info("REWRAP TX HASH", transactionHash)
        refresh()
        refreshTimers()
      }
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      contractCall(sarcophagusContract.rewrapSarcophagus, 
        [ doubleHashUint, resurrectionTimeUTC, diggingFeeBN, bountyBN ], 
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
         'Transaction failed...', 'Transaction successful',
        successCallback)

    } catch (e) {
      if(e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED)
      } 
      else if(e?.error?.code === -32603) {
        if(e?.error?.message === "execution reverted: revert resurrection time must be in the future") {
          toast.error('Resurrection time must be in the future')
        }
        if(e?.error?.message === "execution reverted: ERC20: transfer amount exceeds balance") {
          toast.error('Sarco balance too low to execute transaction')
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


      const pendingCallback = () => {
        toggle()
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      }

      const successCallback = ({transactionHash}) => {
        console.info("BURY TX HASH", transactionHash)
        localStorage.removeItem(doubleHashUint.toLocaleString())
        refresh()
        refreshTimers()
      }

      contractCall(sarcophagusContract.burySarcophagus, 
        [ doubleHashUint ], 
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
         'Transaction failed...', 'Transaction successful',
        successCallback)
    } catch (e) {
      if(e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED)
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

      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
        toggle()
      }

      const successCallback = ({transactionHash}) => {
        console.info("CLEAN TX HASH", transactionHash)
        localStorage.removeItem(doubleHashUint.toLocaleString())
        refresh()
        refreshTimers()
      }

      contractCall(sarcophagusContract.cleanUpSarcophagus, 
        [ doubleHashUint, address], 
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
         'Transaction failed...', 'Transaction successful',
        successCallback)

    } catch (e) {
      if(e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED)
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
      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
        toggle()
      }

      const successCallback = ({transactionHash}) => {
        console.info("CANCEL TX HASH", transactionHash)
        localStorage.removeItem(doubleHashUint.toLocaleString())
        refresh()
        refreshTimers()
      }

      contractCall(sarcophagusContract.cancelSarcophagus, 
        [ doubleHashUint ], 
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
         'Transaction failed...', 'Transaction successful',
        successCallback)
    } catch (e) {
      if(e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED)
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

      const pendingCallback = () => {
        toast.dark('Checking accusal', {toastId: 'accusalPending'})
      }

      const successCallback = ({transactionHash}) => {
        console.info("Accuse TX HASH", transactionHash)
        resetForm(initialValues)
      }

      contractCall(sarcophagusContract.accuseArchaeologist, 
        [ identifierUint, singleHashUint, address ], 
        'Checking accusal',
        pendingCallback,
        ACCUSAL_UNSUCCESSFUL, ACCUSAL_SUCCESSFUL,
        successCallback)
    } catch (e) {
      if(e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED)
      } else {
        console.error('Accused Unsuccessful: ', e)
      }
      
    }
  
  }

  return { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, burySarcophagus, rewrapSarcophagus, accuseArchaeologist }

}



export {
  useSarcophagus
}