import Table from 'components/table'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'

class MyOrders extends PureComponent {
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
      <div>
        <PageHeader>Meus pedidos - Empresa</PageHeader>
        <Table
          columns={[{ description: 'Código do pedido', key: 'code' }, { description: 'Quantidade', key: 'amount' }]}
          lines={this.state.orders}
        />
      </div>
    )
  }
}

export default MyOrders
