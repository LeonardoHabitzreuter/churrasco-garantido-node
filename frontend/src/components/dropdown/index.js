import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default ({ title, items }) => {
  console.log(items)
  return (
    <DropdownButton bsStyle='default' title={title} id={title}>
      {
        items.map((item, index) => (
          <MenuItem key={index} eventKey={index}>{item}</MenuItem>
        ))
      }
      <MenuItem eventKey='3' active>Active Item</MenuItem>
    </DropdownButton>
  )
}
