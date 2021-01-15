import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomePage from 'routes/HomePage'
import MembershipPlansPage from 'routes/MembershipPlansPage'
import MembershipCardsPage from 'routes/MembershipCardsPage'
import MembershipCardPage from 'routes/MembershipCardPage'
import PaymentCardsPage from 'routes/PaymentCardsPage'
import LoginPage from 'routes/LoginPage'

import LoginStatus from 'components/LoginStatus'

import './App.scss'

function App () {
  return (
    <div className="bink-app">
      <Router>
        <LoginStatus />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/payment-cards">
            <PaymentCardsPage />
          </Route>
          <Route path="/membership-cards">
            <MembershipCardsPage />
          </Route>
          <Route path="/membership-card/:id">
            <MembershipCardPage />
          </Route>
          <Route path="/membership-plans">
            <MembershipPlansPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
