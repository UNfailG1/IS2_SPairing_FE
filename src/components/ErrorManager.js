import React from 'react'
import NotFound from './NotFound'

const ErrorManager = ( { status } ) => {

  switch(status){

    case 0:
      return (<h1>Disconnected</h1>)

    case 404:
      return(<NotFound />)

    default:
      return (<h2>New error: { status }</h2>)
  }
}

export default ErrorManager
