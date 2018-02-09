import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'
import Menu from 'components/menu'

const renderApp = (NextApp) => {
  render(
    <AppContainer>
      <div>
        <Menu />
        <NextApp />
      </div>
    </AppContainer>,
    document.querySelector('[data-js="app"]')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}
