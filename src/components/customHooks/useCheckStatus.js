import { useEffect, useState } from "react"
import { MESSAGES } from "../../constants";
import useStatusCallbacks from "../Tomb/useStatusCallbacks";
import { utils } from "ethers";


const useCheckStatus = (assetDoubleHash=false, sarcophagus) => {
  const [ doubleHashUint ] = useState(Buffer.from(utils.arrayify(assetDoubleHash)))
  const [ data, setData] = useState(false)
  const [ isSarcophagusMined, setSarcophagusMined ] = useState(false)
  const [ archResponse, setArchResponse ] = useState({})
  const [ message, setMessages ] = useState(MESSAGES.STATUS_PENDING)
  const [ error, setError ] = useState(false)

  const { checkFileMinedStatus, checkForSarcophagus, sendFileToService } = useStatusCallbacks(setSarcophagusMined, setMessages, setError, setArchResponse, archResponse, data)


  // check local storage for stored data on sarcophagi if exists
  useEffect(() => {
    if(!doubleHashUint) return
    try {
      const storedData = localStorage.getItem(doubleHashUint.toLocaleString())
      const parseData = JSON.parse(storedData)
      // if there is no stored data then process should be finished This will probably need to more indepth check
      if(!storedData) {
          // check for state of 2 on sarcophagus for unwrapping
          if(sarcophagus?.state === 2) {
            return
          }
          // check for Asset ID on sarcophagus
          if(sarcophagus?.assetId) {
            setMessages(MESSAGES.STATUS_FINISH)
            return
          }
      } else {

        // if there is an AssetId skip to checking mining status
        if(parseData?.AssetId) {
          setArchResponse(parseData)
          return
        }
        setData(parseData)
        return
      }
    } catch {
      setError('There was a problem with file')
    }
  }, [doubleHashUint, sarcophagus])

  // check localStorage data on sarcophagus
  useEffect(() => {
    if(!data) return
    if(error) return
    checkForSarcophagus()
  }, [data, checkForSarcophagus, error])

  // send file is not sent
  useEffect(() => {
    if(!isSarcophagusMined) return
    if(error) return
    sendFileToService()
  },[sendFileToService, isSarcophagusMined, error])

  // check file mining status
  useEffect(() => {
    if(!archResponse?.AssetId) return
    if(error) return
    checkFileMinedStatus()
  }, [checkFileMinedStatus, archResponse, error])

  // console.log('STATUS', message)
  // console.log('ERROR', error)
  return { message, error }
}

export default useCheckStatus