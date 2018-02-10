import React, {Component} from 'react'
import api from 'utils/api'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  render () {
    api.logout()
    return (
      <Redirect to={{
        pathname: '/login'
      }} />
    )
  }
}

export default Logout
