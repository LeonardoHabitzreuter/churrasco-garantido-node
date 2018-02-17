import Table from 'components/table'
import Alert from 'components/alert'
import Button from 'components/button'
import api from 'utils/api'
import React, { Component } from 'react'
import { PageHeader, Label } from 'react-bootstrap'
import Loader from 'components/loader'

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

let company = null

class MyOrders extends Component {
  constructor (props) {
    super(props)
    const redirectedFromAnotherPage = !!props.location.state
    if (redirectedFromAnotherPage) {
      company = {
        id: props.location.state.companyId,
        name: props.location.state.companyName
      }
    }
  }

  state = {
    showLoader: false,
    showAlert: false,
    messages: [],
    messagesStyle: '',
    companyCNPJ: '',
    orderCode: '',
    allOrders: [],
    orders: []
  }

  componentDidMount () {
    this.setState({ showLoader: true })
    const filters = !company
      ? { creator: api.getUser(), populate: 'company' }
      : { creator: api.getUser(), populate: 'company', company: company.id }

    api
      .get('orders', filters)
      .then(response => {
        this.setState({
          showLoader: false,
          allOrders: response.data,
          orders: response.data
        })
      })
      .catch(() => this.setState({
        showLoader: false,
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
    this.setState({ showLoader: true })
    const updatedOrder = { ...order, status: 'FINISHED' }
    api
      .put(`orders/${order._id}`, updatedOrder)
      .then(() => {
        this.setState({
          showLoader: false,
          messages: ['Ordem cancelada com sucesso!'],
          showAlert: true,
          messagesStyle: 'success',
          orders: this.modifyOrderInList(updatedOrder)
        })
      })
      .catch(e => {
        this.setState({
          showLoader: false,
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

  // filtro feito em memória pelo fato do usuário só ver as suas empresas.
  // O mesmo poderia ser feito via requisição REST passando como querystring o seguinte Regex:
  // code__regex=/974(codigo do pedido tem que conter 974 para satisfazer a consulta)
  filter () {
    if (!this.state.orderCode && !this.state.companyCNPJ) return this.setState({ orders: this.state.allOrders })

    const fieldMatchFilter = (filter, field) => !filter || field.toString().includes(filter)

    this.setState({ orders: this.state.allOrders.filter(order => {
      return fieldMatchFilter(this.state.orderCode, order.code) && fieldMatchFilter(this.state.companyCNPJ, order.company.cnpj)
    })})
  }

  render () {
    return (
      <div className='col-sm-8' style={({ display: 'inline-grid' })} >
        <PageHeader>Meus pedidos{company ? ` - Empresa ${company.name}` : ''}</PageHeader>
        <Loader loading={this.state.showLoader} />
        <Alert
          show={this.state.showAlert}
          style={this.state.messagesStyle}
          handleDismiss={() => this.setState({ showAlert: false })}
          messages={this.state.messages}
        />
        <div>
          {
            !company &&
            <div className='col-sm-4'>
              <h3><Label>CNPJ</Label></h3>
              <input
                type='text'
                value={this.state.companyCNPJ}
                min='1'
                onChange={e => this.setState({ companyCNPJ: e.target.value })}
              />
            </div>
          }
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
