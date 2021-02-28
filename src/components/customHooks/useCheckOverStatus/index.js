import { OVER_STATUSES } from "../../../constants"
import { useEffect, useState } from 'react'

const useCheckOverStatus = (sarcophagus, archaeologists) => {
  const [ currentStatus, setStatus ] = useState(OVER_STATUSES.DEFAULT)

  useEffect(() => {
    for(let i = 0; i <= archaeologists.length - 1; i++) {
      if(archaeologists[i].accusedIdentifiers.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(OVER_STATUSES.ACCUSED)
          break;
        }
        else if(archaeologists[i].canceledIdentifiers.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(OVER_STATUSES.CANCELED)
          break;
        }
        else if(archaeologists[i].cleanupIdentifiers.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(OVER_STATUSES.CLEANED)
          break;
        } else {
          setStatus(OVER_STATUSES.BURIED)
        }
    }

  },[archaeologists, sarcophagus])

    return { currentStatus }
}

export { useCheckOverStatus }