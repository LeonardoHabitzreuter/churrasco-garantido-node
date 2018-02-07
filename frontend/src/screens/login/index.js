import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import LoginForm from './loginForm'

class Login extends PureComponent {
  redirectToReferrer () {
    const { history } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    history.push(from.pathname)
  }

  render () {
    return (
      <LoginForm onLogon={() => this.redirectToReferrer()} />
    )
  }
}

export default withRouter(Login)
