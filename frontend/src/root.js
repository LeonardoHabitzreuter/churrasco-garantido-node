import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import App from './app'
import reducers from 'redux-flow/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore)

class Root extends PureComponent {
  render () {
    return (
      <Provider store={createStoreWithMiddleware(reducers, devTools)}>
        <App />
      </Provider>
    )
  }
}

export default Root
