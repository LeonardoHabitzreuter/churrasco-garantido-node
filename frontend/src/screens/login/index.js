import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import LoginForm from './loginForm'
import SignUpForm from './signupForm'
import Button from 'components/button'
import { PageHeader } from 'react-bootstrap'

class Login extends PureComponent {
  state = {
    userHasAnAccount: true
  }

  redirectToIndex () {
    const { history } = this.props

    history.push('/')
  }

  render () {
    return (
      <div className='col-sm-8'>
        <PageHeader>
          { this.state.userHasAnAccount ? 'Login' : 'Criar nova conta' }
          <Button
            bsStyle='link'
            bsSize='large'
            onClick={() => this.setState({ userHasAnAccount: !this.state.userHasAnAccount })}>
            {this.state.userHasAnAccount ? 'Ainda não possuo uma conta' : 'Já possuo uma conta'}
          </Button>
        </PageHeader>
        {
          this.state.userHasAnAccount
            ? (<LoginForm onLogon={() => this.redirectToIndex()} />)
            : (<SignUpForm onSignUp={() => this.redirectToIndex()} />)
        }
      </div>
    )
  }
}

export default withRouter(Login)
