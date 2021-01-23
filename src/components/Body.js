import React from 'react'
import { Route } from 'react-router-dom'
import CreateSarcophagus from './create'
import Tomb from './Tomb'

const Body = () => (
  <div className="border border-gray-500 ml-12 p-4 mb-8">
    {/* <Route path="/" exact component={<div></div>} /> */}
    <Route path="/" component={Tomb} exact/>
    <Route path="/create" component={CreateSarcophagus} exact />
    {/* <Route path="/rewrap" component={<div></div>}/> */}
  </div>
)

export default Body