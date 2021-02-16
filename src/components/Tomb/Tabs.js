import React from 'react'
import Tooltip from '../layout/Tooltip'
import Title from '../layout/Title'
import { NavLink, useRouteMatch } from 'react-router-dom'

const Tabs = ({embalmerCount, recipientCount, overCount}) => {
  const match = useRouteMatch()
    return (
        <div className="flex justify-between">
        <NavLink activeClassName="border-b-2 border-white" className="flex px-2 pb-4 cursor-pointer" to={`${match.path}`} exact>
          <Title type="subOne" title={`Sarcophagi (${embalmerCount || 0})`} />
          <Tooltip>
            <div>Active sarcophagi</div>
            <div>Current status and resurrection time will be displayed</div>
          </Tooltip>
        </NavLink>
        <NavLink activeClassName="border-b-2 border-white" className="flex px-2 pb-4 cursor-pointer" to={`${match.path}/received`}>
          <Title type="subOne" title={`Received: (${recipientCount || 0})`} />
          <Tooltip>
          <div>Received Sarcophagi</div>
          <div>Click to view received sarcophagi details</div>
          </Tooltip>
        </NavLink>
        <NavLink activeClassName="border-b-2 border-white" className="flex px-2 pb-4 cursor-pointer" to={`${match.path}/over`}>
          <Title type="subOne" title={`Over: (${overCount || 0})`} />
          <Tooltip>
          <div>Inactive sarcophagi</div>
          <div>Click to view previous sarcophagi details</div>
          </Tooltip>
        </NavLink>
      </div>
    )
}

export default Tabs