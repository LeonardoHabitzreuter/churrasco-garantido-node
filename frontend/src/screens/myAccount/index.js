import Alert from 'components/alert'
import Form from 'components/form'
import React, {PureComponent} from 'react'
import api from 'utils/api'

class MyAccount extends PureComponent {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  componentDidMount () {
    api
      .get(`users/${api.getUser()}`)
      .then(response => {
        const { _id: id, name, email } = response.data
        this.setState({
          name,
          email
        }, () => {
          this.id = id
        })
      })
  }

  saveUser ({ name, email, password, confirmPassword }) {
    api
        .put(`users/${this.id}`, { name, email, password, confirmPassword })
        .then(() => {
          this.setState({
            messages: ['Dados atualizados com sucesso!'],
            showErrorAlert: true,
            messagesStyle: 'success'
          })
        })
        .catch(e => {
          this.setState({
            messages: e.response ? e.response.data.errors : ['Aconteceu um erro na atualização dos dados, tente novamente'],
            showErrorAlert: true,
            messagesStyle: 'danger'
          })
        })
  }

  render () {
    return (
      <div className='col-sm-8'>
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
            value: this.state.name
          }, {
            labelName: 'Email',
            name: 'email',
            type: 'email',
            required: true,
            value: this.state.email
          }, {
            labelName: 'Senha',
            name: 'password',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20,
            value: this.state.password
          }, {
            labelName: 'Confirme sua senha',
            name: 'confirmPassword',
            type: 'password',
            required: true,
            minLength: 6,
            maxLength: 20,
            value: this.state.confirmPassword
          }]}
          onSubmit={userData => this.saveUser(userData)}
          buttonName='Atualizar conta'
        />
      </div>
    )
  }
}

export default MyAccount
