import React from 'react'
import classnames from 'classnames'

const Error = ({ extraPadding, children }) => (
    <div className={classnames(extraPadding, "text-xs text-red")}>
       { children }
    </div>
)


export default Error