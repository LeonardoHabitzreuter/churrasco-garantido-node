import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

const getSelectedItemFromIndex = (items, selectedIndex) => items.find((element, index) => index === selectedIndex)

const Dropdown = ({ id, selectedIndex, items, onChange }) => (
  <DropdownButton bsStyle='default' title={getSelectedItemFromIndex(items, selectedIndex) || ''} id={id}>
    {
      // ToDo alterar map por index
      items.map((item, index) => (
        index !== selectedIndex && <MenuItem onSelect={key => onChange(key)} key={index} eventKey={index}>{item}</MenuItem>
      ))
    }
    <MenuItem eventKey={selectedIndex} active>{getSelectedItemFromIndex(items, selectedIndex)}</MenuItem>
  </DropdownButton>
)

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number,
  items: PropTypes.array,
  onChange: PropTypes.func
}

Dropdown.defaultProps = {
  items: [],
  selectedIndex: null,
  onChange: () => {}
}

export default Dropdown
