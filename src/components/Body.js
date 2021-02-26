import React from 'react'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import CreateSarcophagus from './create'
import Tomb from './Tomb'
import Resurrection from './Resurrection'
import AccuseArchaeologist from './Accuse'

const Body = () => {
  const { url } = useRouteMatch()
  return (
    <div className="border border-gray-500 p-4 mx-4 mb-8 mt-20 md:mt-0 overflow-x-scroll hide-scrollbar" style={{minHeight: 'calc(100vh - 16rem)'}}>
      <Route path={`${url}`} exact>
        <Redirect to="/tomb" />
      </Route>
      <Route path={`${url}tomb`} render={(routerProps) => <Tomb routerProps={routerProps}/>} />
      <Route path={`${url}create`} render={(routerProps) => <CreateSarcophagus routerProps={routerProps}/>} exact />
      <Route path={`${url}resurrection`} render={(routerProps) => <Resurrection routerProps={routerProps}/>} exact />
      <Route path="/horus" render={(routerProps) => <AccuseArchaeologist routerProps={routerProps}/>} exact />
    </div>
  )
}
export default Body