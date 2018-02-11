import React, { PureComponent } from 'react'
import Button from 'components/button'
import FormGroup from './formGroup'
import { Form as ReactForm } from 'react-bootstrap'

export default class Form extends PureComponent {
  state = {
    fields: []
  }

  componentDidMount () {
    this.setState({ fields: this.props.fields })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ fields: nextProps.fields })
  }

  getValidationState ({ value, required, minLength, maxLength }) {
    if (required && !value) return 'error'
    if (minLength && value.length < minLength) return 'error'
    if (maxLength && value.length > maxLength) return 'error'
    return 'success'
  }

  handleFieldChange (index, value) {
    const fields = this.state.fields.map((element, arrayIndex) => arrayIndex === index ? { ...element, value } : element)
    this.setState({fields})
  }

  getValidationMessage ({ labelName, required, minLength, maxLength }) {
    if (!required && !minLength && !maxLength) return null
    let message = `O campo ${labelName}:`
    message = required ? `${message} É obrigatório.` : message
    message = minLength ? `${message} Deve ter no mínimo ${minLength} caracteres.` : message
    message = maxLength ? `${message} Deve ter no máximo ${maxLength} caracteres.` : message
    return message
  }

  handleSubmit () {
    const currentFieldStates = this.state.fields.map(
      field => field.validation
      ? field.validation(field.value)
      : this.getValidationState({ ...field })
    )
    if (currentFieldStates.some(state => state === 'error')) return

    const fieldData = {}
    this.state.fields.forEach(field => {
      fieldData[field.name] = field.value
    })
    this.props.onSubmit(fieldData)
  }

  render () {
    return (
      <ReactForm horizontal onSubmit={e => { e.preventDefault(); this.handleSubmit() }}>
        {
          this.state.fields.map(({ labelName, name, type, value, validation, ...rest }, index) => (
            <div key={index}>
              <FormGroup
                labelName={labelName}
                name={name}
                type={type}
                value={value}
                onChange={e => this.handleFieldChange(index, e.target.value)}
                validationState={validation ? validation(value) : this.getValidationState({ value, ...rest })}
                validationMessage={validation ? undefined : this.getValidationMessage({ labelName, ...rest })}
              />
            </div>
          ))
        }
        <Button>{this.props.buttonName}</Button>
      </ReactForm>
    )
  }
}
