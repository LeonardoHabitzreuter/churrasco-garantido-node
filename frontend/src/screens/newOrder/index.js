import Alert from 'components/alert'
import DropDown from 'components/dropdown'
import Button from 'components/button'
import api from 'utils/api'
import React, { PureComponent } from 'react'
import { PageHeader, Label } from 'react-bootstrap'

class NewOrder extends PureComponent {
  state = {
    showErrorAlert: false,
    messages: [],
    messagesStyle: '',
    companies: []
  }

  componentDidMount () {
    // api
    //   .get('companies')
    //   .then(response => {
    //     this.setState({
    //       companies: response.data.map(company => company.name)
    //     })
    //   })
    this.setState({
      companies: ['Ambev', 'Vonpar']
    })
  }

  render () {
    return (
      <div className='col-sm-8'>
        <PageHeader>Novo pedido</PageHeader>
        <Alert
          show={this.state.showErrorAlert}
          style={this.state.messagesStyle}
          handleDismiss={() => this.setState({ showErrorAlert: false })}
          messages={this.state.messages}
        />
        <div className='col-sm-12'>
          <div className='col-sm-3'>
            <h3><Label>Empresa</Label></h3>
            <DropDown id='companiesDropdown' selected='Ambev' items={this.state.companies} />
          </div>
          <div className='col-sm-3'>
            <h3><Label>Produto</Label></h3>
            <DropDown id='productsDropdown' selected='Skol' items={['Skol', 'Brahma', 'Stella']} />
          </div>
          <div className='col-sm-3'>
            <h3><Label>Quantidade</Label></h3>
            <input type='number' />
          </div>
          <div className='col-sm-3'>
            <Button className='d-flex align-items-center' bsStyle='success' type='button'>Adicionar</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewOrder
