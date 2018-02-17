import Alert from 'components/alert'
import DropDown from 'components/dropdown'
import Button from 'components/button'
import Table from 'components/table'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader, Label } from 'react-bootstrap'
import { head, some } from 'lodash'
import Loader from 'components/loader'

const InputGroup = ({ labelName, children }) => (
  <div className='col-sm-3'>
    <h3><Label>{labelName}</Label></h3>
    {children}
  </div>
)

const PRODUCTS = ['Cerveja', 'Carne', 'Pão de alho', 'Refrigerante', 'Guardanapo', 'Carvão', 'Alcool', 'Churrasqueira']

class NewOrder extends PureComponent {
  state = {
    showLoader: false,
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    companies: [],
    selectedCompany: null,
    selectedProduct: 0,
    productAmount: 1,
    productsAdded: []
  }

  componentDidMount () {
    this.setState({ showLoader: true })
    api
      .get('companies', { creator: api.getUser() })
      .then(response => {
        this.setState({
          showLoader: false,
          companies: response.data,
          selectedCompany: head(response.data) ? 0 : null
        })
      })
      .catch(e => {
        this.setState({
          showLoader: false,
          messages: ['Aconteceu um erro ao buscar as empresas'],
          showErrorAlert: true,
          messagesStyle: 'danger'
        })
      })
  }

  requestNewOrder () {
    const { selectedCompany, productsAdded, companies } = this.state
    const messages = []
    if (selectedCompany === null) messages.push('Por favor, selecione uma empresa para qual você quer fazer o pedido.')
    if (!head(productsAdded)) messages.push('Por favor, adicione produtos na lista.')
    if (some(messages)) {
      this.setState({ showErrorAlert: true, messages, messagesStyle: 'danger' })
      return
    }

    this.setState({ showLoader: true })
    api
      .post('orders', {
        company: companies[selectedCompany]._id,
        products: productsAdded.map(product => ({ name: product.product, amount: product.amount }))
      })
      .then(() => {
        this.setState({
          showLoader: false,
          messages: ['Pedido efetuado com sucesso'],
          showErrorAlert: true,
          messagesStyle: 'success',
          productsAdded: []
        })
      })
      .catch(e => {
        this.setState({
          showLoader: false,
          messages: e.response ? e.response.data.errors : ['Aconteceu um erro ao tentar cadastrar a empresa, tente novamente'],
          showErrorAlert: true,
          messagesStyle: 'danger'
        })
      })
  }

  getSameProductFromTable (productsAdded, selectedProduct) {
    return productsAdded.find(productAdded => productAdded.product === PRODUCTS[selectedProduct])
  }

  addProduct () {
    const { productsAdded, selectedProduct, productAmount } = this.state

    if (+productAmount < 1) {
      this.setState({
        showErrorAlert: true,
        messages: ['Por favor, selecione uma quantidade de produtos maior que 0.'],
        messagesStyle: 'danger'
      })
      return
    }
    const oldProduct = this.getSameProductFromTable(productsAdded, selectedProduct)

    // alterar lista por objeto, lembrar de criar um pr pro lodash
    const updatedProductsList = productsAdded.map(product => (
      product === oldProduct
      ? { ...product, amount: +product.amount + +productAmount }
      : product
      )
    )

    if (!oldProduct) updatedProductsList.push({ product: PRODUCTS[selectedProduct], amount: productAmount })

    this.setState({ productsAdded: updatedProductsList })
  }

  render () {
    return (
      <div className='col-sm-8 full-width' style={({ display: 'inline-grid' })} >
        <PageHeader>Novo pedido</PageHeader>
        <Loader loading={this.state.showLoader} />
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
              items={this.state.companies.map(company => company.name)}
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
            columns={[{ description: 'Produto', key: 'product' }, { description: 'Quantidade', key: 'amount' }]}
            lines={this.state.productsAdded}
          />
        </div>
        <Button
          className='col-sm-2'
          onClick={() => this.requestNewOrder()}
          type='button'
        >
        Fechar pedido
        </Button>
      </div>
    )
  }
}

export default NewOrder
