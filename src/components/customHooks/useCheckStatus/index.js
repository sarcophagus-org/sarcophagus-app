import { useEffect, useState } from "react"
import { utils } from "ethers";
import useSarcophagusCheck from "./useSarcophagusCheck";
import useFileSentCheck from "./useFileSentCheck";
import useFileMiningCheck from "./useFileMiningCheck";
import { isTimePast } from '../../../utils/datetime'
import { ACTIONS, STATUSES } from '../../../constants'
import { useWeb3 } from "../../../web3";
import { toast } from "react-toastify";

const useCheckStatus = (sarcophagus, refresh) => {
  const [ data, setData] = useState(false)
  const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
  const [ error, setError ] = useState(false)
  const [ archResponse, setArchResponse ] = useState(false)
  const { provider } = useWeb3()

  useEffect(() => {
    if(error) {
      setCurrentStatus(false)
    }
  },[ error ])

  // check localStorage data on sarcophagus
  const { isSarcophagusMined } = useSarcophagusCheck(data, sarcophagus.AssetDoubleHash, setCurrentStatus, error, setError, refresh)

  // send file if not sent
  const { sentArchResponse } = useFileSentCheck(isSarcophagusMined, data, setCurrentStatus, error, setError)

  // check file mining status
  useFileMiningCheck(sentArchResponse || archResponse, setCurrentStatus, error, setError, sarcophagus.name)

  // check local storage for stored data on sarcophagi if exists
  useEffect(() => {
    const checkState = async () => {
      const doubleHashUint = Buffer.from(utils.arrayify(sarcophagus.AssetDoubleHash))
      const storedData = localStorage.getItem(doubleHashUint.toLocaleString())
      const parseData = JSON.parse(storedData)
      // if resurrection window is closed
      if(isTimePast(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow)) {
        setCurrentStatus(STATUSES.WINDOW_CLOSED)
        return
      }
      // if there is no stored data then process should be finished This will probably need to more indepth check
      if(!storedData) {
          // check for state of 2 on sarcophagus for unwrapping should not be here
          if(sarcophagus?.state === 2) {
            console.error('Should never see this')
            return
          }
          // if no assetId on sarcophagus, mark as finished
          if(sarcophagus?.assetId) {
            setCurrentStatus(STATUSES.PROCESS_COMPLETE)
            return
          } else {
            return
          }
      } 
      else {
        // check action
        // if there is an AssetId skip to checking mining status
        if(parseData?.action === ACTIONS.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED ) {
          setArchResponse(parseData)
          return
        } else {
          // sets storages data to start process from start
          setData(parseData)
          return
        }
      } 
    }
    checkState()
  }, [sarcophagus, provider, refresh])
  
  useEffect(() => {
    if(currentStatus === STATUSES.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED) {
      toast.dark(STATUSES.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED, {toastId: 'FileAccepted'})
    }
    if(currentStatus === STATUSES.ARWEAVE_PENDING){
      toast.dark(STATUSES.ARWEAVE_PENDING,  {toastId: 'ArweavePending'})
    }
    if(currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN){
      toast.dark(STATUSES.SARCOPHAGUS_AWAIT_SIGN, {toastId: 'SigningNeeded'})
    }
    if(error) {
      toast.error(error, {toastId:error, autoClose: false})
    }
  }, [currentStatus, error])

  return { currentStatus, setCurrentStatus, error, setError }
}

export default useCheckStatus