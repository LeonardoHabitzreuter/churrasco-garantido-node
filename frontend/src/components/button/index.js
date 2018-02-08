import React from 'react'
import { Button as ReactButton } from 'react-bootstrap'

const Button = props => (
  <ReactButton {...props}>{props.children}</ReactButton>
)

Button.defaultProps = {
  bsStyle: 'primary'
}

export default Button
