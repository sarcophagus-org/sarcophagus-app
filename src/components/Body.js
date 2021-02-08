import React from 'react'
import { Route } from 'react-router-dom'
import CreateSarcophagus from './create'
import Tomb from './Tomb'

const Body = () => (
  <div className="border border-gray-500 p-4 mx-4 mb-8 mt-20 md:mt-0" style={{minHeight: 'calc(100vh - 16rem)'}}>
    <Route path="/" component={Tomb} exact/>
    <Route path="/create" component={CreateSarcophagus} exact />
    {/* <Route path="/resurrect" component={<div></div>}/> */}
  </div>
)

export default Body