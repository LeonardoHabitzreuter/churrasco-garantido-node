import Button from 'components/button'
import Alert from 'components/alert'
import React, { PureComponent } from 'react'
import api from 'utils/api'

class SignUpForm extends PureComponent {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showErrorAlert: false,
    errorMessages: []
  }

  signup () {
    api
      .signup(this.state)
      .then(() => this.props.onSignUp())
      .catch(e => {
        this.setState({ ...this.state, errorMessages: e.response.data.errors, showErrorAlert: true })
      })
  }

  render () {
    return (
      <div>
        <form className='form-horizontal' onSubmit={e => { e.preventDefault(); this.signup() }}>
          <div className='col-sm-12'>
            <label className='col-sm-6'>Nome:</label>
            <input className='col-sm-6'
              type='text'
              value={this.state.name}
              onChange={e => this.setState({ ...this.state, name: e.target.value })}
              placeholder='Digite seu nome'
            />
          </div>
          <div className='col-sm-12'>
            <label className='col-sm-6'>Email:</label>
            <input className='col-sm-6'
              type='text'
              value={this.state.email}
              onChange={e => this.setState({ ...this.state, email: e.target.value })}
              placeholder='Digite seu email'
            />
          </div>
          <div className='col-sm-12'>
            <label className='col-sm-6'>Senha:</label>
            <input className='col-sm-6'
              type='password'
              value={this.state.password}
              onChange={e => this.setState({ ...this.state, password: e.target.value })}
              placeholder='Digite sua senha'
            />
          </div>
          <div className='col-sm-12'>
            <label className='col-sm-6'>Confirme sua senha:</label>
            <input className='col-sm-6'
              type='password'
              value={this.state.confirmPassword}
              onChange={e => this.setState({ ...this.state, confirmPassword: e.target.value })}
              placeholder='Confirme sua senha'
            />
          </div>
          <Button>Criar Conta</Button>
        </form>
        <Alert show={this.state.showErrorAlert} style='danger' handleDismiss={() => this.setState({ ...this.state, showErrorAlert: false })} messages={this.state.errorMessages} />
      </div>
    )
  }
}

export default SignUpForm
