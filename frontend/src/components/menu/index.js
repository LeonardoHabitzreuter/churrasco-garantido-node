import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default props => (
  <div>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='/'>Empresas com Churrasco Garantido</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href='/'>
              Dashboard
          </NavItem>
          <NavItem eventKey={1} href='registerCompany'>
              Cadastrar empresa
          </NavItem>
          <NavItem eventKey={1} href='newOrder'>
              Novo pedido
          </NavItem>
          <NavItem eventKey={1} href='myOrders'>
              Meus pedidos
          </NavItem>
          <NavItem eventKey={1} href='myAccount'>
              Minha conta
          </NavItem>
          <NavItem eventKey={2} href='logout'>
              Sair
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    {props.children}
  </div>
)
