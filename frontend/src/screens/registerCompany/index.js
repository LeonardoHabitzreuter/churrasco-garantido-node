import Alert from 'components/alert'
import Form from 'components/form'
import { PageHeader } from 'react-bootstrap'
import React, {PureComponent} from 'react'
import api from 'utils/api'
import cnpjValid from 'utils/cnpjValidator'
import Loader from 'components/loader'

class RegisterCompany extends PureComponent {
  state = {
    showLoader: false,
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    name: '',
    cnpj: ''
  }

  saveCompany ({ name, cnpj }) {
    this.setState({ showLoader: true })
    api
        .post(`companies`, { name, cnpj })
        .then(() => {
          this.setState({
            showLoader: false,
            messages: ['Empresa cadastrada com sucesso!'],
            showErrorAlert: true,
            messagesStyle: 'success',
            name: '',
            cnpj: ''
          })
        })
        .catch(e => {
          this.setState({
            showLoader: false,
            messages: e.response ? e.response.data.errors : ['Aconteceu um erro ao tentar cadastrar a empresa, tente novamente'],
            showErrorAlert: true,
            messagesStyle: 'danger',
            name,
            cnpj
          })
        })
  }

  render () {
    return (
      <div className='col-sm-8'>
        <PageHeader>Cadastrar empresa</PageHeader>
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
            minLength: 4,
            maxLength: 30,
            value: this.state.name
          }, {
            labelName: 'CNPJ',
            name: 'cnpj',
            type: 'text',
            value: this.state.cnpj,
            validation: value => cnpjValid(value) ? 'success' : 'error'
          }]}
          onSubmit={companyData => this.saveCompany(companyData)}
          buttonName='Cadastrar'
        />
      </div>
    )
  }
}

export default RegisterCompany
