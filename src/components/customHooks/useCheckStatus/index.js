import { useEffect, useState } from "react"
import { utils } from "ethers";
import useSarcophagusCheck from "./useSarcophagusCheck";
import useFileSentCheck from "./useFileSentCheck";
import useFileMiningCheck from "./useFileMiningCheck";
import { isTimePast } from '../../../utils/datetime'
import { ACTIONS, STATUSES } from '../../../constants'
import { toast } from "react-toastify";

const useCheckStatus = (sarcophagus, refresh) => {
  const [ data, setData] = useState(false)
  const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
  const [ error, setError ] = useState(false)
  const [ archResponse, setArchResponse ] = useState(false)

  useEffect(() => {
    if(error) {
      setCurrentStatus(false)
    }
  },[ error ])

  // check localStorage data on sarcophagus
  const { isSarcophagusMined } = useSarcophagusCheck(data, sarcophagus.AssetDoubleHash, error, setError )

  // send file if not sent
  const { sentArchResponse } = useFileSentCheck(isSarcophagusMined, data, sarcophagus.AssetDoubleHash, setCurrentStatus, error, setError)

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
        refresh()
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
          if(sarcophagus?.assetId && sarcophagus?.privateKey === "0x0000000000000000000000000000000000000000000000000000000000000000") {
            setCurrentStatus(STATUSES.PROCESS_COMPLETE)
            return
          } else {
            setCurrentStatus('')
            return
          }
      } 
      else {
        // check action
        // if there is an AssetId skip to checking mining status
        if(parseData?.action === ACTIONS.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED ) {
          setArchResponse(parseData)
          return
        } 
        else if (parseData?.action === 'delete') {
          setError(parseData.error)
        } else {
          // sets storages data to start process from start
          setData(parseData)
          return
        }
      } 
    }
    checkState()
  }, [sarcophagus, refresh])
  
  useEffect(() => {
    if(currentStatus === STATUSES.UNWRAPPING) {
      setTimeout(() => {
        refresh()
      }, 5000)
    }
    if(currentStatus === STATUSES.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED) {
      toast.dark(STATUSES.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED, {toastId: 'FileAccepted'})
    }
    if(currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN){
      toast.dark(STATUSES.SARCOPHAGUS_AWAIT_SIGN, {toastId: 'SigningNeeded'})
    }
    if(error) {
      console.log('Status Error', error)
    }
  }, [currentStatus, error, refresh])

  return { currentStatus, setCurrentStatus, error, setError }
}

export default useCheckStatus