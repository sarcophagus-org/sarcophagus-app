import Tippy from '@tippyjs/react'
import React from 'react'
import errorIcon from '../../assets/images/error.svg'
import classnames from 'classnames'

const base = 'ml-3 mt-1 py-1 px-2 text-gray-900 text-2xs rounded self-end'
const bgRed = 'bg-red'
const bgGray = 'bg-gray-300'
const bgYellow = 'bg-yellow'
const bgGreen = 'bg-green'

const Content = ({ status, error }) => (
  <div>{ error || status }</div>
)

const StatusBadge = ({ status, error, isActive=false, isOver=false }) => (
    <Tippy content={<Content status={status} error={error} />} className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900">
      <div 
        className={error ?  classnames(base, bgRed) : isActive ?  classnames(base, bgGreen) : isOver ?  classnames(base, bgGray) : classnames(base, bgYellow)} 
        style={{width: 'fit-content'}}>
          { error ? (
            <div className="flex items-center">
              <img alt="" src={errorIcon} className="mr-2"/>
              <div className="leading-4">Error</div>
            </div>
          ) : isActive ? "Active" : isOver ? "Over" : "Pending" }
      </div>
      </Tippy>
)

export default StatusBadge