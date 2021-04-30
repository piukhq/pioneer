import 'url-search-params-polyfill'
import ResizeObserver from 'resize-observer-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'components/App'
import reportWebVitals from './reportWebVitals'
import configureStore from './store/configureStore'

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
