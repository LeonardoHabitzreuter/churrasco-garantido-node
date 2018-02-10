import Alert from 'components/alert'
import Form from 'components/form'
import React, { Component } from 'react'
import api from 'utils/api'

class LoginForm extends Component {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: 'danger'
  }

  logon ({ email, password }) {
    api
      .logon({ email, password })
      .then(() => {
        this.props.onLogon()
      })
      .catch(e => {
        this.setState({
          messages: e.response ? e.response.data.errors : ['Aconteceu um erro ao tentar logar no sistema, tente novamente'],
          showErrorAlert: true
        })
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
            name: 'email',
            labelName: 'Email',
            type: 'email',
            required: true,
            value: ''
          }, {
            name: 'password',
            labelName: 'Senha',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20,
            value: ''
          }]}
          onSubmit={userData => this.logon(userData)}
          buttonName='Logar'
        />
      </div>
    )
  }
}

LoginForm.defaultProps = {
  onLogon: () => {}
}

export default LoginForm
