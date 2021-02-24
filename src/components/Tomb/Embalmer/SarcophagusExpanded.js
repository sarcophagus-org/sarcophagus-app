import React from 'react'
import { STATUSES } from '../../../constants'

import Tooltip from '../../layout/Tooltip'
import Button from '../../layout/Button'
import { useData } from '../../BlockChainContext'
import Rewrap from './Rewrap'

const Sign = ({sarcophagus, setCurrentStatus, refresh, toggle}) => { 
    const { updateSarcophagus, cancelSarcophagus } = useData()

    const handleUpdate = async () => {
        await updateSarcophagus(sarcophagus, setCurrentStatus, refresh, toggle)
    }

    const handleCancel = async () => {
        await cancelSarcophagus(sarcophagus, toggle, refresh)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full relative gap-8" style={{height: '12.0625rem'}}>
            <Button type="button" onClick={handleUpdate} label="Sign" />
            <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleCancel}>
                <span className="mr-2">Cancel this sarcophagus</span>
                <Tooltip>
                    {`< Content >`}
                </Tooltip>
            </div>
        </div>
    )
}

const ErrorOptions = ({sarcophagus, refresh, toggle, error}) => {
    const { cancelSarcophagus } = useData()
    const handleCancel = async () => {
        await cancelSarcophagus(sarcophagus, refresh, toggle)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8" style={{height: '12.0625rem'}}>
            <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleCancel}>
                <span className="mr-2">Cancel this sarcophagus</span>
                <Tooltip>
                    {`< Content >`}
                </Tooltip>
            </div>
        </div>
    )
}

const WindowClosed = ({sarcophagus, toggle, refresh, archaeologist}) => {
    const { cancelSarcophagus, cleanSarcophagus } = useData()
    const handleCancel = async () => {
        cancelSarcophagus(sarcophagus, refresh, toggle)
    }

    const handleClean = async () => {
        cleanSarcophagus(sarcophagus, archaeologist, refresh, toggle)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full relative gap-8" style={{height: '12.0625rem'}}>
        <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleClean}>
            <span className="mr-2">Clean this sarcophagus</span>
            <Tooltip>
                {`< Content >`}
            </Tooltip>
        </div>
        <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleCancel}>
            <span className="mr-2">Cancel this sarcophagus</span>
            <Tooltip>
                {`< Content >`}
            </Tooltip>
        </div>
    </div>
        )
}

const SarcophagusExpanded = ({ sarcophagus, archaeologist, currentStatus, error, setCurrentStatus, toggle, refresh }) => {
    return (
        <div className="text-white text-md relative flex flex-col overflow-x-scroll hide-scrollbar" style={{maxWidth: '34.4375rem'}}>
            {error && <ErrorOptions sarcophagus={sarcophagus} refresh={refresh} toggle={toggle} error={error}/>}
            {/* If resurrection window is closed*/}
            {currentStatus === STATUSES.WINDOW_CLOSED && <WindowClosed sarcophagus={sarcophagus} archaeologist={archaeologist} refresh={refresh} toggle={toggle} />}
            {/* If status is signing needed */}
            {currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN && <Sign sarcophagus={sarcophagus} setCurrentStatus={setCurrentStatus} refresh={refresh} toggle={toggle} />}
            {/* if active then allow rewrap */}
            {currentStatus === STATUSES.PROCESS_COMPLETE && !!archaeologist &&  <Rewrap sarcophagus={sarcophagus} archaeologist={archaeologist} setCurrentStatus={setCurrentStatus} toggle={toggle} refresh={refresh} />}

        </div>
    )}

export default SarcophagusExpanded 