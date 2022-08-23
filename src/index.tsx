import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from 'App/store'
import {App} from 'App/App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const rerenderEntireTree = () => {
  root.render(
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>,
  )
  reportWebVitals()
}

rerenderEntireTree()

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('App/App', () => rerenderEntireTree())
}