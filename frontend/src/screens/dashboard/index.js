import Table from 'components/table'
import Button from 'components/button'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const amountLink = (productAmount, onSelect) => (
  <Button
    bsStyle='link'
    onClick={() => onSelect()}
  >
    {productAmount}
  </Button>
)

class Dashboard extends PureComponent {
  state = {
    companySelected: null,
    companies: []
  }

  goToMyOrdersPage (companyId) {
    this.setState({ companySelected: companyId })
  }

  componentDidMount () {
    api
      .get('companies', { populate: 'orders' })
      .then(response => {
        this.setState({
          companies: response.data.map(company => ({
            ...company,
            id: company._id,
            ordersQuantity: amountLink(
              company.orders.length,
              () => this.goToMyOrdersPage(company._id)
            ),
            hasOrdersPending: company.orders.some(order => order.status === 'PENDING')
          }))
        })
      })
  }

  render () {
    return (
      !this.state.companySelected ? (
        <div className='col-sm-8'>
          <PageHeader>Minhas empresas</PageHeader>
          <Table
            columns={[{ description: 'Nome fantasia', key: 'name' }, { description: 'CNPJ', key: 'cnpj' }, { description: 'QTD pedidos', key: 'ordersQuantity' }]}
            lines={this.state.companies}
          />
        </div>
      ) : (
        <Redirect to={{
          pathname: '/myOrders',
          state: { teste: '1' }
        }} />
      )
    )
  }
}

export default Dashboard
