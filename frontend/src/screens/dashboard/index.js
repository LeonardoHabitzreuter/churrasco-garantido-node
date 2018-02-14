import Table from 'components/table'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'

class Dashboard extends PureComponent {
  state = {
    companies: []
  }

  componentDidMount () {
    teste = [{
      _id: '1875468',
      code: '1',
      cnpj: '241236501007',
      orders: [{
        _id: '1',
        status: 'PENDING'
      }, {
        _id: '2',
        statue: 'FINISHED'
      }]
    }, {
      _id: '18754645',
      code: '2',
      cnpj: '658901007',
      orders: [{
        _id: '1',
        status: 'FINISHED'
      }, {
        _id: '2',
        statue: 'CANCELED'
      }]
    }]
    //api
      //.get('companies?populate=orders')
      //.then(response => {
        this.setState({
          //companies: response.data.map(company => ({
					companies: teste.map(company => ({
            ...company,
            ordersQuantity: company.orders.length,
            hasOrdersPending: company.orders.some(order => order.status === 'PENDING')
          }))
        })
     // })
  }

  render () {
    return (
      <div>
        <PageHeader>Minhas empresas</PageHeader>
        <Table
          columns={[{ description: 'Nome fantasia', key: 'name' }, { description: 'CNPJ', key: 'cnpj' }, { description: 'QTD pedidos', key: 'ordersQuantity' }]}
          lines={this.state.orders}
        />
      </div>
    )
  }
}

export default Dashboard
