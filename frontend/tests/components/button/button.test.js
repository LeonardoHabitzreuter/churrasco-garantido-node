import React from 'react'
import { shallow } from 'enzyme'
import Button from '../../../src/components/button'

test('should has submit type and primary style as default props', () => {
  const wrapper = shallow(<Button />)
  expect(wrapper.find('Button').props()).toMatchObject({
    type: 'submit',
    bsStyle: 'primary'
  })
})

test('should has the same type and style passed through the props', () => {
  const wrapper = shallow(<Button type='button' bsStyle='danger' />)
  expect(wrapper.find('Button').props()).toMatchObject({
    type: 'button',
    bsStyle: 'danger'
  })
})
