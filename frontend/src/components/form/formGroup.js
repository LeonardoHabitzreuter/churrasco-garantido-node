import React from 'react'
import { Col, FormGroup as ReactFormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const FormGroup = ({ name, type, value, onChange, validationState, validationMessage }) => {
  return (
    <ReactFormGroup
      className='col-sm-12'
      controlId={name}
      validationState={validationState}
    >
      <Col componentClass={ControlLabel} sm={2}>{name}</Col>
      <Col sm={10}>
        <FormControl
          type={type}
          value={value}
          onChange={onChange}
        />
        <FormControl.Feedback />
        {validationMessage && <HelpBlock>{validationMessage}</HelpBlock>}
      </Col>
    </ReactFormGroup>
  )
}

export default FormGroup
