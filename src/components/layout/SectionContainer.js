import React from 'react'
import classnames from 'classnames'

const base = "py-12 pr-2"
const borderBottom = "border-b border-gray-500"

const SectionContainer = ({border=true, children}) => (
  <div className={border ? classnames(base, borderBottom) : base} >
    {children}
  </div>
)

export default SectionContainer