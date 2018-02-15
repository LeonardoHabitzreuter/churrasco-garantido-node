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
      <div className='col-sm-8'>
        <PageHeader>Meus pedidos - Empresa {this.state.teste}</PageHeader>
        <Table
          columns={[{ description: 'Código do pedido', key: 'code' }, { description: 'Quantidade', key: 'amount' }]}
          lines={this.state.orders}
        />
      </div>
    )
  }
}

export default MyOrders
