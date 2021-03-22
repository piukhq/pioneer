import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import rootReducer from './reducers'
import syncApiKeyToLocalStorage from 'middleware/syncApiKeyToLocalStorage'

export default function configureAppStore (preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [syncApiKeyToLocalStorage, ...getDefaultMiddleware()],
    preloadedState,
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
