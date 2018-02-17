import Alert from 'components/alert'
import Form from 'components/form'
import React, { PureComponent } from 'react'
import api from 'utils/api'
import Loader from 'components/loader'

class SignUpForm extends PureComponent {
  state = {
    showLoader: false,
    showErrorAlert: false,
    messages: [],
    messagesStyle: 'danger'
  }

  signup ({ name, email, password, confirmPassword }) {
    this.setState({ showLoader: true })
    api
      .signup({ name, email, password, confirmPassword })
      .then(() => {
        this.props.onSignUp()
      })
      .catch(e => {
        this.setState({
          showLoader: false,
          messages: e.response ? e.response.data.errors : ['Aconteceu um erro ao tentar criar conta no sistema, tente novamente'],
          showErrorAlert: true
        })
      })
  }

  render () {
    return (
      <div>
        <Loader loading={this.state.showLoader} />
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
            minLength: 6,
            value: ''
          }, {
            labelName: 'Email',
            name: 'email',
            type: 'email',
            required: true,
            value: ''
          }, {
            labelName: 'Senha',
            name: 'password',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20,
            value: ''
          }, {
            labelName: 'Confirme sua senha',
            name: 'confirmPassword',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20,
            value: ''
          }]}
          onSubmit={userData => this.signup(userData)}
          buttonName='Criar conta'
        />
      </div>
    )
  }
}

SignUpForm.defaultProps = {
  onSignUp: () => {}
}

export default SignUpForm
