import React from 'react'
import {
  MemoryRouter,
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import cx from 'classnames'

// This scss import should be defined before any component import. This way any styling defined in base.scss
// will be overwritten by styles defined in components
import './base.scss'

import HomePage from 'routes/HomePage'
import MembershipPlansPage from 'routes/MembershipPlansPage'
import MembershipCardsPage from 'routes/MembershipCardsPage'
import MembershipCardPage from 'routes/MembershipCardPage'
import PaymentCardsPage from 'routes/PaymentCardsPage'
import LoginPage from 'routes/LoginPage'
import MembershipCardAddPage from 'routes/MembershipCardAddPage'

import MagicLinkPage from 'routes/MagicLinkPage'
import TypographyPage from 'routes/TypographyPage'

import logo from 'images/footer-logo.png'
import styles from './App.module.scss'

function App () {
  const Router = window.binkConfigNoMemoryRouting ? BrowserRouter : MemoryRouter

  return (
    <div className={cx('bink-app', styles.root)}>
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
      <section className={styles['root__logo-container']}>
        <a href="https://www.bink.com" target="_blank" rel="noreferrer">
          <img alt="Powered By Bink" src={logo} className={styles.root__logo} />
        </a>
      </section>
    </div>
  )
}

export default App
