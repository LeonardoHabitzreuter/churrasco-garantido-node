import Alert from 'components/alert'
import DropDown from 'components/dropdown'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'

class NewOrder extends PureComponent {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    companies: []
  }

  componentDidMount () {
    api
      .get('companies')
      .then(response => {
        this.setState({
          companies: response.data.map(company => company.name)
        })
      })
  }

  render () {
    return (
      <div className='col-sm-8'>
        <PageHeader>Novo pedido</PageHeader>
        <Alert
          show={this.state.showErrorAlert}
          style={this.state.messagesStyle}
          handleDismiss={() => this.setState({ showErrorAlert: false })}
          messages={this.state.messages}
        />
        <DropDown title='Empresas' items={this.state.companies} />
      </div>
    )
  }
}

export default NewOrder
