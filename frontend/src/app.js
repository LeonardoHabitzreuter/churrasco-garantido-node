import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'components'
import Dashboard from './screens/dashboard'
import Login from './screens/login'
import Logout from 'components/menu/logout'
import MyAccount from './screens/myAccount'
import RegisterCompany from './screens/registerCompany'
import NewOrder from './screens/newOrder'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/registerCompany' component={RegisterCompany} />
        <Route path='/newOrder' component={NewOrder} />
        <PrivateRoute path='/myAccount' component={MyAccount} />
        <PrivateRoute path='/logout' component={Logout} />
      </Switch>
    </Router>
  )
}

export default App
