import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default props => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href='/'>Empresas com Churrasco Garantido</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href='newAccount'>
            Nova conta
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
