import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import LoginForm from './loginForm'
import SignUpForm from './signupForm'
import Button from 'components/button'

class Login extends PureComponent {
  state = {
    userHasAnAccount: true
  }

  redirectToReferrer () {
    const { history } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    history.push(from.pathname)
  }

  render () {
    return (
      <div className='full-width'>
        {
          this.state.userHasAnAccount
            ? (<LoginForm onLogon={() => {}} />)
            // ? (<LoginForm onLogon={() => this.redirectToReferrer()} />)
            // : (<SignUpForm onSignUp={() => this.redirectToReferrer()} />)
            : (<SignUpForm onSignUp={() => {}} />)
        }
        <Button onClick={() => this.setState({ userHasAnAccount: !this.state.userHasAnAccount })}>{this.state.userHasAnAccount ? 'Ainda não possuo uma conta' : 'Já possuo uma conta'}</Button>
      </div>
    )
  }
}

export default withRouter(Login)
