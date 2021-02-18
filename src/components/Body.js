import React from 'react'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import CreateSarcophagus from './create'
import Tomb from './Tomb'

const Body = () => {
  const { url } = useRouteMatch()
  return (
    <div className="border border-gray-500 p-4 mx-4 mb-8 mt-20 md:mt-0 overflow-x-scroll hide-scrollbar" style={{minHeight: 'calc(100vh - 16rem)'}}>
      <Route path={`${url}`} exact>
        <Redirect to="/tomb" />
      </Route>
      <Route path={`${url}tomb`} component={Tomb} />
      <Route path={`${url}create`} component={CreateSarcophagus} exact />
      {/* <Route path="/horus" component={<div></div>}/> */}
    </div>
  )
}
export default Body