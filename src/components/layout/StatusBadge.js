import Tippy from '@tippyjs/react'
import React from 'react'
import errorIcon from '../../assets/images/error.svg'
import classnames from 'classnames'
import { RECIPIENT_STATUSES } from '../../constants'

const base = 'ml-3 mt-1 py-1 px-2 text-gray-900 text-2xs rounded self-end'
const bgRed = 'bg-red'
const bgGray = 'bg-gray-300'
const bgYellow = 'bg-yellow'
const bgGreen = 'bg-green'
const bgWhite = 'bg-white'

const Content = ({ status}) => (
  <div>{ status }</div>
)

const StatusBadge = ({ status, error, isActive=false, isArchived=false }) => (
    <Tippy content={<Content status={status} />} className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900">
      <div 
        className={error ? classnames(base, bgRed) : status === RECIPIENT_STATUSES.UNWRAPPED ? classnames(base, bgWhite) : isActive ?  classnames(base, bgGreen) : isArchived ?  classnames(base, bgGray) : classnames(base, bgYellow)}
        style={{width: 'fit-content'}}>
          { error ? (
            <div className="flex items-center">
              <img alt="" src={errorIcon} className="mr-2"/>
              <div className="leading-4">Error</div>
            </div>
          ) : status === RECIPIENT_STATUSES.UNWRAPPED ? 'Unwrapped' : isActive ? "Active" : isArchived ? "Archived" : "Pending" }
      </div>
      </Tippy>
)

export default StatusBadge