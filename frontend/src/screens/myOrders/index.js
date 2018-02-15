import Table from 'components/table'
import Button from 'components/button'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'

const CancelLink = onSelect => (
  <Button
    bsStyle='link'
    onClick={() => onSelect()}
  >
    Cancelar
  </Button>
)

const ProductsList = products => (
  <div className='text'>
    {products.map(product => (
      <p key={product._id}>{product.amount}x {product.name}</p>
    ))}
  </div>
)

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

  cancelOrder (orderId) {
    console.log('cancel')
    console.log(orderId)
  }

  componentDidMount () {
    api
      .get('orders', { creator: api.getUser() })
      .then(response => {
        console.log(response.data)
        this.setState({
          orders: response.data.map(order => ({
            id: order._id,
            code: order.code,
            products: ProductsList(order.products),
            actions:
              order.status === 'PENDING'
              ? CancelLink(
                  () => this.calcelOrder(order._id)
              ) : (
                'Cancelar'
              )
          }))
        })
      })
  }

  render () {
    return (
      <div className='col-sm-8'>
        <PageHeader>Meus pedidos - Empresa {company.name}</PageHeader>
        <Table
          columns={[{ description: 'Código do pedido', key: 'code' }, { description: 'Itens', key: 'products' }, { description: 'Ações', key: 'actions' }]}
          lines={this.state.orders}
        />
      </div>
    )
  }
}

export default MyOrders
