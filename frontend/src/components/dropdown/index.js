import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Dropdown = ({ id, selected, items }) => (
  <DropdownButton bsStyle='default' title={selected} id={id}>
    {
      items.map((item, index) => (
        item !== selected && <MenuItem onSelect={e => console.log(e)} key={index} eventKey={index}>{item}</MenuItem>
      ))
    }
    <MenuItem eventKey={items.findIndex(item => item === selected)} active>{selected}</MenuItem>
  </DropdownButton>
)

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string,
  items: PropTypes.array
}

Dropdown.defaultProps = {
  items: [],
  selected: ''
}

export default Dropdown
