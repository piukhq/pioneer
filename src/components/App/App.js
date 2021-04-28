import React from 'react'
import {
  MemoryRouter,
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import HomePage from 'routes/HomePage'
import MembershipPlansPage from 'routes/MembershipPlansPage'
import MembershipCardsPage from 'routes/MembershipCardsPage'
import MembershipCardPage from 'routes/MembershipCardPage'
import PaymentCardsPage from 'routes/PaymentCardsPage'
import LoginPage from 'routes/LoginPage'
import MembershipCardAddPage from 'routes/MembershipCardAddPage'

import MagicLinkPage from 'routes/MagicLinkPage'
import TypographyPage from 'routes/TypographyPage'

import './App.scss'

console.log('App.js y 5')

function App () {
  let Router
  // this probably should be controlled via env variable. To figure out best approach
  const embedded = window.location.hostname === 'www.wasabi.uk.com'
  if (embedded) {
    Router = MemoryRouter
  } else {
    Router = BrowserRouter
  }

  return (
    <div className="bink-app">
      <Router basename={process.env.PUBLIC_URL}>
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
          <Route path="/magic-link/:magicLinkToken">
            <MagicLinkPage />
          </Route>
          <Route path="/membership-cards">
            <MembershipCardsPage />
          </Route>
          <Route path="/membership-card/add/:planId">
            <MembershipCardAddPage />
          </Route>
          <Route path="/membership-card/:id">
            <MembershipCardPage />
          </Route>
          <Route path="/membership-plans">
            <MembershipPlansPage />
          </Route>
          <Route path="/typography">
            <TypographyPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
