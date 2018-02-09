import React, { PureComponent } from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const CustomizedFormGroup = ({ name, type, value, onChange, validationState }) => {
  return (
    <FormGroup
      className='col-sm-12'
      controlId={name}
      validationState
    >
      <ControlLabel className='col-sm-6'>{name}</ControlLabel>
      <div className='col-sm-6'>
        <FormControl
          type={type}
          value={value}
          onChange={onChange}
        />
        <FormControl.Feedback />
      </div>
    </FormGroup>
  )
}

export default class Form extends PureComponent {
  state = {
    password: '',
    email: ''
  }

  getValidationState () {
    const length = this.state.password.length
    if (length > 10) return 'success'
    if (!length) return 'error'
  }

  render () {
    return (
      <form className='form-horizontal' onSubmit={e => { e.preventDefault(); this.props.onSubmit() }}>
        <CustomizedFormGroup
          name='senha'
          type='password'
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          validationState={this.getValidationState()}
        />
        <CustomizedFormGroup
          name='email'
          type='email'
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          validationState={this.getValidationState()}
        />
      </form>
    )
  }
}
