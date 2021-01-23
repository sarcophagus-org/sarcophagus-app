import React from 'react'
import classnames from 'classnames'

const Error = ({ extraPadding, children }) => (
  <div className="relative">
    <div className={classnames("absolute", extraPadding)}>
      <span className="ml-4 text-xs text-red whitespace-nowrap">{ children }</span>
    </div>
  </div>
)


export default Error