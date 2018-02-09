import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'components'
import Main from './screens'
import Login from './screens/login'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/' component={Main} />
      </Switch>
    </Router>
  )
}

export default App
