import Table from 'components/table'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'

let company = {
  id: '',
  name: ''
}

class MyOrders extends PureComponent {
  constructor (props) {
    super(props)
    company = {
      id: props.location.state.companyId,
      name: props.location.state.companyName
    }
  }

  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    orders: []
  }

  componentDidMount () {
    api
      .get('orders')
      .then(response => {
        this.setState({
          orders: response.data
        })
      })
  }

  render () {
    return (
      <div className='col-sm-8'>
        <PageHeader>Meus pedidos - Empresa {company.name}</PageHeader>
        <Table
          columns={[{ description: 'Código do pedido', key: 'code' }, { description: 'Quantidade', key: 'amount' }]}
          lines={this.state.orders}
        />
      </div>
    )
  }
}

export default MyOrders
