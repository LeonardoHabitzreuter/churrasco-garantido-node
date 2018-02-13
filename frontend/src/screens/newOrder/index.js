import Alert from 'components/alert'
import DropDown from 'components/dropdown'
import Button from 'components/button'
import Table from 'components/table'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader, Label } from 'react-bootstrap'
import { head, some } from 'lodash'

const InputGroup = ({ labelName, children }) => (
  <div className='col-sm-3'>
    <h3><Label>{labelName}</Label></h3>
    {children}
  </div>
)

const PRODUCTS = ['Skol', 'Brahma', 'Stella']

class NewOrder extends PureComponent {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    companies: [],
    selectedCompany: null,
    selectedProduct: 0,
    productAmount: 1
  }

  componentDidMount () {
    api
      .get('companies')
      .then(response => {
        this.setState({
          companies: response.data.map(company => company.name),
          selectedCompany: head(response.data) ? 0 : null
        })
      })
  }

  saveNewOrder () {
    api
    .post('orders', {
      author: api.getUser(),
      company: '5a808c3c8fab410d0ac98897',
      products: [{
        name: 'Carvao'
      }, {
        name: 'Carvao'
      }]
    })
  }

  addProduct () {
    const messages = []
    if (this.state.selectedCompany === null) messages.push('Por favor, selecione uma empresa para qual você quer fazer o pedido.')
    if (+this.state.productAmount < 1) messages.push('Por favor, selecione uma quantidade de produtos maior que 0.')
    if (some(messages)) {
      this.setState({ showErrorAlert: true, messages, messagesStyle: 'danger' })
      return
    }

    console.log('salvar')
  }

  render () {
    return (
      <div className='col-sm-8 full-width' style={({ display: 'inline-grid' })} >
        <PageHeader>Novo pedido</PageHeader>
        <Alert
          show={this.state.showErrorAlert}
          style={this.state.messagesStyle}
          handleDismiss={() => this.setState({ showErrorAlert: false })}
          messages={this.state.messages}
        />
        <div>
          <InputGroup labelName='Empresa'>
            <DropDown
              id='companiesDropdown'
              selectedIndex={this.state.selectedCompany}
              items={this.state.companies}
              onChange={selectedCompany => this.setState({ selectedCompany })}
            />
          </InputGroup>
          <InputGroup labelName='Produto'>
            <DropDown
              id='productsDropdown'
              selectedIndex={this.state.selectedProduct}
              items={PRODUCTS}
              onChange={selectedProduct => this.setState({ selectedProduct })}
            />
          </InputGroup>
          <InputGroup labelName='Quantidade'>
            <input
              type='number'
              value={this.state.productAmount}
              min='1'
              onChange={e => this.setState({ productAmount: e.target.value })}
            />
          </InputGroup>
          <InputGroup labelName={`${this.state.productAmount} ${PRODUCTS.find((element, index) => index === this.state.selectedProduct)}`}>
            <Button
              className='d-flex align-items-center'
              onClick={() => this.addProduct()}
              bsStyle='success'
              type='button'
            >
            Adicionar
            </Button>
          </InputGroup>
        </div>
        <div style={({ paddingTop: '5rem' })}>
          <Table
            columns={[{ description: 'Empresa', key: 'company' }, { description: 'Produto', key: 'product' }, { description: 'Quantidade', key: 'amount' }]}
            lines={[{ company: 'Ambev', product: 'Stella', amount: 5 }, { company: 'Ambev', product: 'Budweiser', amount: 5 }]}
          />
        </div>
      </div>
    )
  }
}

export default NewOrder
