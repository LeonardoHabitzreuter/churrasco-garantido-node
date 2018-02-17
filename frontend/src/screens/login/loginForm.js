import Alert from 'components/alert'
import Form from 'components/form'
import React, { Component } from 'react'
import api from 'utils/api'
import Loader from 'components/loader'

class LoginForm extends Component {
  state = {
    showLoader: false,
    showErrorAlert: false,
    messages: [],
    messagesStyle: 'danger'
  }

  logon ({ email, password }) {
    this.setState({ showLoader: true })
    api
      .logon({ email, password })
      .then(() => {
        this.props.onLogon()
      })
      .catch(e => {
        this.setState({
          showLoader: false,
          messages: e.response ? e.response.data.errors : ['Aconteceu um erro ao tentar logar no sistema, tente novamente'],
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
