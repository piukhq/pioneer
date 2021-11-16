import React, { useEffect } from 'react'
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
import LoginPage from 'routes/LoginPage'
import MembershipCardAddPage from 'routes/MembershipCardAddPage'
import MagicLinkPage from 'routes/MagicLinkPage'
import TypographyPage from 'routes/TypographyPage'
import Footer from 'components/Footer'
import { useSelector } from 'react-redux'
import { selectors as versionSelectors } from 'ducks/version'

import { useIdleTimer } from 'react-idle-timer'
import { useSetStatus, idleTimerSettings, useHandleOnActive } from 'hooks/useCheckIdle'

import styles from './App.module.scss'

function App () {
  const Router = window.binkConfigNoMemoryRouting ? BrowserRouter : MemoryRouter

  const { setIdle, setActive } = useSetStatus()

  useIdleTimer({
    ...idleTimerSettings,
    onActive: setActive,
    onIdle: setIdle,
  })

  const isIdle = useSelector(state => versionSelectors.isIdle(state))
  const clientVersion = useSelector(state => versionSelectors.clientVersion(state))
  const { handleOnActive } = useHandleOnActive()
  useEffect(() => {
    !isIdle && typeof clientVersion === 'string' && handleOnActive()
  }, [isIdle, clientVersion, handleOnActive])

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
      {Config.isMerchantChannel && <Footer />}
    </div>
  )
}

export default App
