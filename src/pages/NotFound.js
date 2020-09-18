import React from 'react'
import { Image } from 'semantic-ui-react'

import image from '../img/404.png'

const NotFound = () => {
  return (
    <center>
      <Image src={image} />
      <h1>Página no encontrada</h1>
    </center>
  )
}

export default NotFound
