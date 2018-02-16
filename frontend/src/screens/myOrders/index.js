import Table from 'components/table'
import Alert from 'components/alert'
import Button from 'components/button'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader, Label } from 'react-bootstrap'

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
    showAlert: false,
    messages: [],
    messagesStyle: '',
    companyCNPJ: '',
    orderCode: '',
    orders: []
  }

  componentDidMounts () {
    const filters = company.id
      ? { creator: api.getUser(), company: company.id }
      : { creator: api.getUser() }

    api
      .get('orders', filters)
      .then(response => {
        this.setState({
          orders: response.data
        })
      })
      .catch(() => this.setState({
        messages: ['Aconteceu um erro ao buscar os pedidos desta empresa, tente novamente'],
        showAlert: true,
        messagesStyle: 'danger'
      }))
  }

  modifyOrderInList (orderToModify) {
    return this.state.orders.map(order =>
      order._id === orderToModify._id
      ? orderToModify
      : order
    )
  }

  cancelOrder (order) {
    const updatedOrder = { ...order, status: 'FINISHED' }
    api
      .put(`orders/${order._id}`, updatedOrder)
      .then(() => {
        this.setState({
          messages: ['Ordem cancelada com sucesso!'],
          showAlert: true,
          messagesStyle: 'success',
          orders: this.modifyOrderInList(updatedOrder)
        })
      })
      .catch(e => {
        this.setState({
          messages: e.response ? e.response.data.errors : ['Aconteceu um erro cancelar a ordem, tente novamente'],
          showAlert: true,
          messagesStyle: 'danger'
        })
      })
  }

  getOrdersToMountTable () {
    return this.state.orders.map(order => ({
      id: order._id,
      code: order.code,
      products: ProductsList(order.products),
      actions:
        order.status === 'PENDING'
        ? CancelLink(
            () => this.cancelOrder(order)
        ) : (
          'Cancelar'
        )
    }))
  }

  render () {
    return (
      <div className='col-sm-8' style={({ display: 'inline-grid' })} >
        <PageHeader>Meus pedidos{company.name ? ` - Empresa ${company.name}` : ''}</PageHeader>
        <Alert
          show={this.state.showAlert}
          style={this.state.messagesStyle}
          handleDismiss={() => this.setState({ showAlert: false })}
          messages={this.state.messages}
        />
        <div>
          <div className='col-sm-4'>
            <h3><Label>CNPJ</Label></h3>
            <input
              type='text'
              value={this.state.companyCNPJ}
              min='1'
              onChange={e => this.setState({ companyCNPJ: e.target.value })}
            />
          </div>
          <div className='col-sm-4'>
            <h3><Label>Pedido</Label></h3>
            <input
              type='text'
              value={this.state.orderCode}
              min='1'
              onChange={e => this.setState({ orderCode: e.target.value })}
            />
          </div>
          <div className='col-sm-4'>
            <h3><Label>Açoes</Label></h3>
            <Button
              onClick={() => this.filter()}
              type='button'
            >
            Filtrar
            </Button>
          </div>
        </div>
        <div style={({ paddingTop: '5rem' })} >
          <Table
            columns={[{ description: 'Código do pedido', key: 'code' }, { description: 'Itens', key: 'products' }, { description: 'Ações', key: 'actions' }]}
            lines={this.getOrdersToMountTable()}
          />
        </div>
      </div>
    )
  }
}

export default MyOrders
