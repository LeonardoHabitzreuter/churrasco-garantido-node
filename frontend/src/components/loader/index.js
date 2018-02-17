import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = props => (
  <div className='sweet-loading'>
    <ClipLoader
      color='#123abc'
      {...props}
    />
  </div>
)

export default Loader
