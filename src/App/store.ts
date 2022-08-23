import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from 'App/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('App/rootReducer', () => store.replaceReducer(rootReducer))
}
