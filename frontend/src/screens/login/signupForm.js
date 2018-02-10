import Alert from 'components/alert'
import Form from 'components/form'
import React, { PureComponent } from 'react'
import api from 'utils/api'

class SignUpForm extends PureComponent {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: ''
  }

  signup () {
    api
      .signup(this.state)
      .then(() => {
        this.setState({
          messagesStyle: 'success',
          messages: ['Conta criada com sucesso'],
          showErrorAlert: true
        }, this.props.onSignUp)
      })
      .catch(e => {
        this.setState({ messagesStyle: 'danger', messages: e.response.data.errors, showErrorAlert: true })
      })
  }

  render () {
    return (
      <div>
        <Alert
          show={this.state.showErrorAlert}
          style={this.state.messagesStyle}
          handleDismiss={() => this.setState({ showErrorAlert: false })}
          messages={this.state.messages}
        />
        <Form
          fields={[{
            labelName: 'Nome',
            name: 'name',
            type: 'text',
            required: true,
            minLength: 6
          }, {
            labelName: 'Email',
            name: 'email',
            type: 'email',
            required: true
          }, {
            labelName: 'Senha',
            name: 'password',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20
          }, {
            labelName: 'Confirme sua senha',
            name: 'confirmPassword',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20
          }]}
          onSubmit={this.signup}
          buttonName='Criar conta'
        />
      </div>
    )
  }
}

export default SignUpForm
