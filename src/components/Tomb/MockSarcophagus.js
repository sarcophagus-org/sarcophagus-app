import React from 'react'
import arrowRight from '../../assets/images/arrowRight.svg'
import { TIMER_DEFAULT } from '../../constants'
import StatusBadge from '../layout/StatusBadge'

const MockSarcophagus = ({message, handleClick}) => {
    return (
        <div className="border border-white text-white text-md flex px-4 my-8 pt-2 justify-between relative" style={{height: '4.375rem', maxWidth: '34.4375rem'}}>
            <div className="text-center h-full w-full text-white absolute z-30 top-0 left-0 flex justify-center items-center cursor-pointer" onClick={handleClick}>{message}</div>
            <div className="flex flex-col opacity-25">
                <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>Sarcophagus Name</div>
                <div className={`text-sm text-gray-300`} style={{lineHeight: '1.0625rem'}}>
                    Resurrection: {TIMER_DEFAULT}
                </div>
            </div>

            <div className="flex flex-col opacity-30">
                <div className="flex cursor-pointer">
                    <img alt="" src={arrowRight} className="mr-2" />
                    <span>Rewrap</span>
                </div>
                <StatusBadge status='' isActive={true} isOver={false} error={false} />
            </div>
        </div>
    )
}

export default MockSarcophagus