import Form from 'components/form'
import React, { PureComponent } from 'react'
import api from 'utils/api'

class LoginForm extends PureComponent {
  logon ({ email, senha }) {
    api.logon({ email, password: senha })
    this.props.onLogon()
  }

  render () {
    return (
      <Form
        fields={[{
          name: 'email',
          type: 'email',
          required: true
        }, {
          name: 'senha',
          type: 'password',
          required: true,
          minLength: 6,
          maxLength: 20
        }]}
        onSubmit={this.logon}
        buttonName='Logar'
      />
    )
  }
}

export default LoginForm
