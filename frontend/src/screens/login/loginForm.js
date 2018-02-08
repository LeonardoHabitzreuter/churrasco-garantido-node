import Button from 'components/button'
import React, { PureComponent } from 'react'
import api from 'utils/api'

class LoginForm extends PureComponent {
  state = {
    email: '',
    password: ''
  }

  logon () {
    api.logon(this.state)
    this.props.onLogon()
  }

  render () {
    return (
      <form onSubmit={e => { e.preventDefault(); this.logon() }}>
        <input type='text' value={this.state.email} onChange={e => this.setState({ ...this.state, email: e.target.value })} placeholder='Digite seu email'/>
        <input type='password' value={this.state.password} onChange={e => this.setState({ ...this.state, password: e.target.value })} placeholder='Digite sua senha'/>
        <Button>Entrar</Button>
      </form>
    )
  }
}

export default LoginForm
