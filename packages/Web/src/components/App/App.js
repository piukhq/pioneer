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
import LoginPage from 'routes/LoginPage'
import MembershipCardAddPage from 'routes/MembershipCardAddPage'
import MagicLinkPage from 'routes/MagicLinkPage'
import TypographyPage from 'routes/TypographyPage'
import Footer from 'components/Footer'

import { useIdleTimer } from 'react-idle-timer'
import { idleTimerSettings, useActivityCheck } from 'hooks/useActivityMonitoring'
import { useSnowfallAppropriateness } from 'hooks/useSnowfallAnimation'
import { NavigationSideEffects } from 'hooks/useNavigationSideEffects'

import Snowfall from 'react-snowfall'

import styles from './App.module.scss'

function App () {
  const Router = window.binkConfigNoMemoryRouting ? BrowserRouter : MemoryRouter
  const { shouldDisplaySnowfall } = useSnowfallAppropriateness()

  const { setIdle, setActive } = useActivityCheck()
  useIdleTimer({
    ...idleTimerSettings,
    onActive: setActive,
    onIdle: setIdle,
  })

  return (
    <div className={cx('bink-app', styles.root)}>
      { shouldDisplaySnowfall && (
        <div className={styles['root__snow-fall']}>
          <Snowfall />
        </div>
      ) }

      <Router basename={process.env.PUBLIC_URL}>
        <NavigationSideEffects />
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
