import { useEffect, useState } from "react"
import { utils } from "ethers";
import { STATUSES } from '../../../constants'
import useSarcophagusCheck from "./useSarcophagusCheck";
import useFileSentCheck from "./useFileSentCheck";
import useFileMiningCheck from "./useFileMiningCheck";
import { isTimePast } from '../../../utils/datetime'

const useCheckStatus = (assetDoubleHash=false, sarcophagus, refresh) => {
  const [ doubleHashUint ] = useState(Buffer.from(utils.arrayify(assetDoubleHash)))
  const [ data, setData] = useState(false)
  const [ archResponse, setArchResponse ] = useState({})
  const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
  const [ error, setError ] = useState(false)

  // check localStorage data on sarcophagus
  const { isSarcophagusMined } = useSarcophagusCheck(data, setCurrentStatus, error, setError, doubleHashUint, refresh)

  // send file is not sent
  useFileSentCheck(isSarcophagusMined, setArchResponse, data, setCurrentStatus, error, setError)

  // check file mining status
  useFileMiningCheck(archResponse, setArchResponse, setCurrentStatus, error, setError, sarcophagus.name)

  // check local storage for stored data on sarcophagi if exists
  useEffect(() => {
    if(!doubleHashUint) return
    
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
            console.log('Should never see this')
            return
          }
          // if no assetId on sarcophagus, mark as finished
          if(sarcophagus?.assetId) {
            setCurrentStatus(STATUSES.PROCESS_COMPLETE)
            return
          }
      } else {
        // check action
        if(parseData?.action === 'rewrap') {
          setCurrentStatus(STATUSES.REWRAP_IN_PROGRESS)
          setData(parseData)
          return
        }
        // if there is an AssetId skip to checking mining status
        if(parseData?.AssetId) {
          setArchResponse(parseData)
          return
        } else {
          // sets storages data to start process from start
          setData(parseData)
        }
      }
  }, [doubleHashUint, sarcophagus])
  

  return { currentStatus, setCurrentStatus, error }
}

export default useCheckStatus