import React from 'react'
import classnames from 'classnames'

const base = "py-12 pr-2 relative border-b border-gray-500"

const SectionContainer = ({transition=true, addClass, children, ...rest}) => (
  <div className={!transition ? classnames(base, addClass) : classnames(base, 'ease-in-transition', addClass)} {...rest}>
    {children}
  </div>
)

export default SectionContainer