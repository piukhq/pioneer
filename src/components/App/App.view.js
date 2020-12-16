import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomePage from 'routes/HomePage'
import PaymentCardsPage from 'routes/PaymentCardsPage'
import LoginPage from 'routes/LoginPage'

import './App.scss'

function AppView () {
  return (
    <div className="bink-app">
      <Router>
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
        </Switch>
      </Router>
    </div>
  )
}

export default AppView
