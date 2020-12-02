import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomePage from 'routes/HomePage'
import PaymentCardsPage from 'routes/PaymentCardsPage'

function App () {
  return (
    <div className="bink-app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/payment-cards">
            <PaymentCardsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
