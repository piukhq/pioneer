import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import syncApiKeyToLocalStorage from 'middleware/syncApiKeyToLocalStorage'
import rootReducer from './reducers'

export default function configureAppStore (preloadedState) {
  // Possible to add additional controllers to dictate what aspects of the redux store is recorded in Sentry
  const sentryReduxEnhancer = Sentry.createReduxEnhancer()

  const store = configureStore({
    reducer: rootReducer,
    middleware: [syncApiKeyToLocalStorage, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [sentryReduxEnhancer],
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
