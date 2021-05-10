import 'url-search-params-polyfill'
import 'custom-event-polyfill'
import ResizeObserver from 'resize-observer-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'components/App'
import reportWebVitals from './reportWebVitals'
import configureStore from './store/configureStore'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import Config from 'Config'

Sentry.init({
  dsn: 'https://0526306eb4e946c49b13604301365d31@o503751.ingest.sentry.io/5725548',
  integrations: [new Integrations.BrowserTracing()],
  // Used to set depth limit to redux store recorded state recorded in Senrty
  normalizeDepth: 10,
  // e.g. `bink staging`
  environment: `${Config.theme} ${Config.env}`,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

// todo: probably polyfills should be moved into a separate file. To decide where that file should be located.
if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver
}

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('bink-app-root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
