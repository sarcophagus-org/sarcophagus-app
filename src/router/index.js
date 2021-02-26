import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Body from '../components/Body'
import Footer from '../components/Footer'
import Header from '../components/Header'
const AppRouter = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Header />
    <Switch>
      <Body />
    </Switch>
    <Footer />
  </Router>
)

export default AppRouter