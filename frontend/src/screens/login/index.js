import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import api from 'utils/api'

class Login extends PureComponent {
  login = () => {
    api.logon()
    this.redirectToReferrer()
  }

  redirectToReferrer = () => {
    const { history } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    history.push(from.pathname)
  }

  render () {
    return (
      <button onClick={this.login}>Entrar</button>
    )
  }
}

export default withRouter(Login)
