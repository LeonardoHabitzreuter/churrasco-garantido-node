import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import api from 'utils/api'

class Login extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      senha: ''
    }
  }

  logar() {
    api.logon(this.state)
    this.redirectToReferrer()
  }

  redirectToReferrer = () => {
    const { history } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    history.push(from.pathname)
  }

  render () {
    return (
      <form onSubmit={e => { e.preventDefault; this.logar() }}>
        <input type='text' value={this.state.email} onChange={e => this.setState({ ...this.state, email: e.target.value })} placeholder='Digite seu email'/>
        <input type='password' value={this.state.senha} onChange={e => this.setState({ ...this.state, senha: e.target.value })} placeholder='Digite sua senha'/>
        <button>Entrar</button>
      </form>
    )
  }
}

export default withRouter(Login)
