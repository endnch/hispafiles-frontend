import React from 'react'
import { Container } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import NotFound from '../NotFound'

import boards from '../boards'

const Boards = () => {
    const { board } = useParams()
    const allowList = boards.reduce((acc, cur) => [...acc, ...cur]).map(x => x.board);
  
    if (!allowList.includes(board)) {
      return <NotFound />
    }
  
    return (
      <Container>
        <h1>Tablón: { board }</h1>
      </Container> 
    )
  }

export default Boards