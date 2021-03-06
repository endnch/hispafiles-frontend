import React from 'react'
import { Container } from 'semantic-ui-react'

import Archiver from '../components/Archiver'
import NavBar from '../components/NavBar'

import settings from '../settings'

const Home = () => {
  return (
    <Container>
      <NavBar />
      <h1>
        {settings.site.title} permite guardar hilos de{' '}
        <a href="https://www.hispachan.org/">hispachan.org</a>.
      </h1>
      <Archiver />
    </Container>
  )
}

export default Home
