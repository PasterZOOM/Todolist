import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {App} from './component/App/App'
import {store} from './state/store'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
)
reportWebVitals()
