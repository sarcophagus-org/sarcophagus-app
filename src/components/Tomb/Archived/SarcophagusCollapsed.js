import Tippy from '@tippyjs/react'
import React from 'react'
import { truncate } from '../../../utils'
import StatusBadge from '../../layout/StatusBadge'

const SarcophagusCollapsed = ({ sarcophagus : {name, state}, currentStatus}) => (
    <div className="border border-gray-500 text-white text-md flex px-4 my-8 pt-2 justify-between relative max-w-128" style={{height: '4.375rem'}}>
        <div>
            {name.length > 30
                ? (
                    <Tippy content={name} className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900 break-words whitespace-pre-wrap">
                        <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{truncate(name, 25, "...", 18)}</div>
                    </Tippy>
                )
                : (
                    <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{name}</div>
            )}
        </div>

        <div className="flex flex-col">
            <StatusBadge status={currentStatus} isArchived={state === 2} />
        </div>
    </div>
)

export default SarcophagusCollapsed