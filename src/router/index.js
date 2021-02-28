import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import Body from '../components/Body'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
const AppRouter = () => (
  <Router>
    <PageHeader />
    <Switch>
      <Body />
    </Switch>
    <Footer />
  </Router>
)

export default AppRouter