import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import api from 'utils/api'

class PrivateRoute extends PureComponent {
  state = {
    currentUser: ''
  }

  componentWillMount () {
    this.setState({ currentUser: api.getUser() })
  }

  render () {
    const { component: Component, ...rest } = this.props
    const { currentUser } = this.state
    console.log(currentUser)
    const isAuth = !!currentUser

    return (
      <Route {...rest} render={props => (
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
      )} />
    )
  }
}

export { PrivateRoute }
