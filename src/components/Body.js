import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import CreateSarcophagus from './create'
import Tomb from './Tomb'
import Resurrection from './Resurrection'
import AccuseArchaeologist from './Accuse'

const Body = () => {
  return (
    <div className="border border-gray-500 p-4 mx-4 mb-8 mt-0 overflow-x-scroll hide-scrollbar" style={{minHeight: 'calc(100vh - 16rem)'}}>
      <Route path={`/`} exact>
        <Redirect to="/tomb" />
      </Route>
      <Route path={`/tomb`} component={Tomb} />
      <Route path={`/create`} component={CreateSarcophagus} exact />
      <Route path={`/resurrection`} component={Resurrection} exact />
      <Route path="/horus" component={AccuseArchaeologist} exact />
    </div>
  )
}
export default Body