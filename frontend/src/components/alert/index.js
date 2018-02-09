import React from 'react'
import { Alert } from 'react-bootstrap'
import Button from 'components/button'

export default ({ show, style, handleDismiss, messages }) => (
  <div>
    {
    show &&
    <Alert bsStyle={style} onDismiss={handleDismiss}>
      {messages.map(message => (
        <p>
          {message}
        </p>
      ))}
      <Button onClick={handleDismiss}>Fechar</Button>
    </Alert>
    }
  </div>
)