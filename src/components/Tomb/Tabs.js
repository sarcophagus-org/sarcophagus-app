import React from 'react'
import Tooltip from '../layout/Tooltip'
import Title from '../layout/Title'
import { NavLink, useRouteMatch } from 'react-router-dom'

const Tabs = ({embalmerCount, recipientCount, archivedCount}) => {
  const match = useRouteMatch()
  return (
    <div className="flex items-center justify-center lg:justify-between flex-wrap md:flex-nowrap gap-4">
      <NavLink activeClassName="border-b-2 border-white" className="px-2 pb-4 cursor-pointer whitespace-nowrap flex justif-center items-center flex-shrink-0" to={`${match.path}`} exact>
        <Title type="subOne" title={`Sarcophagi (${embalmerCount || 0})`} />
        <Tooltip content={
          <div>
            <div>Active sarcophagi</div>
            <div>View current status and resurrected time</div>
          </div>
        } />
      </NavLink>
      <NavLink activeClassName="border-b-2 border-white" className="px-2 pb-4 cursor-pointer whitespace-nowrap flex justif-center items-center flex-shrink-0" to={`${match.path}/resurrect`}>
        <Title type="subOne" title={`Resurrected: (${recipientCount || 0})`} />
        <Tooltip content={
          <div>
            <div>Received Sarcophagi</div>
            <div>View received Sarcophagi details</div>
          </div>
        } />
      </NavLink>
      <NavLink activeClassName="border-b-2 border-white" className="px-2 pb-4 cursor-pointer whitespace-nowrap flex justif-center items-center flex-shrink-0" to={`${match.path}/archive`}>
        <Title type="subOne" title={`Archived: (${archivedCount || 0})`} />
        <Tooltip content={<div>
          <div>Inactive sarcophagi</div>
          <div>View past Sarcophagi</div>
        </div>
        } />
      </NavLink>
    </div>
  )
}

export default Tabs