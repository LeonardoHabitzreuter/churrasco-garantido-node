import Table from 'components/table'
import Alert from 'components/alert'
import Button from 'components/button'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const AmountLink = (productAmount, onSelect) => (
  <Button
    bsStyle='link'
    onClick={() => onSelect()}
  >
    {productAmount}
  </Button>
)

class Dashboard extends PureComponent {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    selectedCompany: null,
    companies: []
  }

  goToMyOrdersPage (companyId) {
    this.setState({ selectedCompany: this.state.companies.find(company => company.id === companyId) })
  }

  companyHasOrdersPending (company) {
    return company.orders.some(order => order.status === 'PENDING')
  }

  componentDidMount () {
    api
      .get('companies', { populate: 'orders', creator: api.getUser() })
      .then(response => {
        this.setState({
          companies: response.data.map(company => ({
            cnpj: company.cnpj,
            name: company.name,
            id: company._id,
            ordersQuantity:
              this.companyHasOrdersPending(company)
              ? AmountLink(
                  company.orders.length,
                  () => this.goToMyOrdersPage(company._id)
              ) : (
                company.orders.length
              )
          }))
        })
      })
      .catch(e => {
        this.setState({
          messages: ['Aconteceu um erro ao buscar as empresas'],
          showErrorAlert: true,
          messagesStyle: 'danger'
        })
      })
  }

  render () {
    return (
      !this.state.selectedCompany ? (
        <div className='col-sm-8'>
          <PageHeader>Minhas empresas</PageHeader>
          <Alert
            show={this.state.showErrorAlert}
            style={this.state.messagesStyle}
            handleDismiss={() => this.setState({ showErrorAlert: false })}
            messages={this.state.messages}
          />
          <Table
            columns={[{ description: 'Nome fantasia', key: 'name' }, { description: 'CNPJ', key: 'cnpj' }, { description: 'QTD pedidos', key: 'ordersQuantity' }]}
            lines={this.state.companies}
          />
        </div>
      ) : (
        <Redirect to={{
          pathname: 'myOrders',
          state: {
            companyName: this.state.selectedCompany.name,
            companyId: this.state.selectedCompany.id
          }
        }} />
      )
    )
  }
}

export default Dashboard
