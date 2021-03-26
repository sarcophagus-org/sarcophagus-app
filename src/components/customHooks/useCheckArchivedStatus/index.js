import { ARCHIVED_STATUSES } from "../../../constants"
import { useEffect, useState } from 'react'

const useCheckArchivedStatus = (sarcophagus, archaeologists) => {
  const [ currentStatus, setStatus ] = useState(ARCHIVED_STATUSES.DEFAULT)

  useEffect(() => {
    for(let i = 0; i <= archaeologists.length - 1; i++) {
      if(archaeologists[i].accusedIdentifiers?.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(ARCHIVED_STATUSES.ACCUSED)
          break;
        }
        else if(archaeologists[i].canceledIdentifiers?.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(ARCHIVED_STATUSES.CANCELED)
          break;
        }
        else if(archaeologists[i].cleanupIdentifiers?.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(ARCHIVED_STATUSES.CLEANED)
          break;
        }
        else if(archaeologists[i].successesIdentifiers?.includes(sarcophagus.AssetDoubleHash)) {
          setStatus(ARCHIVED_STATUSES.UNWRAPPED)
          break;
        }
        else {
          setStatus(ARCHIVED_STATUSES.BURIED)
        }
    }

  },[archaeologists, sarcophagus])

    return { currentStatus }
}

export { useCheckArchivedStatus }