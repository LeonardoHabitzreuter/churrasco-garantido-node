import React from 'react'
import { Button as ReactButton } from 'react-bootstrap'
import styles from './button.styl'
import classnames from 'classnames'

const Button = ({ children, customStyle, ...rest }) => (
  <ReactButton className={classnames(styles[rest.bsStyle], customStyle)} {...rest}>{children}</ReactButton>
)

Button.defaultProps = {
  bsStyle: 'primary',
  type: 'submit'
}

export default Button
