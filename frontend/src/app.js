import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'components'
import Dashboard from './screens/dashboard'
import Login from './screens/login'
import Logout from 'components/menu/logout'
import MyAccount from './screens/myAccount'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/logout' component={Logout} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/myAccount' component={MyAccount} />
      </Switch>
    </Router>
  )
}

export default App
