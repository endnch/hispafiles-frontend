import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Archiver from './Archiver'

import settings from './settings'
import { boards } from './boards'

const Home = () => {
    return <Container>
        <Segment>
        {
            boards.map((group, index) => <React.Fragment key={index}>
            [ {
                group.map((board, index) => <React.Fragment key={board.board}> 
                {' '}<Link to={ '/' + board.board } title={ board.title }>{ board.board === 'all' ? board.title : board.board }</Link>
                { (index !== group.length - 1) && <>{' '}/</> }
                </React.Fragment>)
            } ]
            </React.Fragment>)
        }
        </Segment>
        <h1>{ settings.site.title } permite guardar hilos de <a href='https://www.hispachan.org/'>hispachan.org</a>.</h1>
        <Archiver />
    </Container>
}

export default Home