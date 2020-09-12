import React, { useEffect, useState } from 'react'
import { Container, Item, Icon, Pagination } from 'semantic-ui-react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

import NotFound from './NotFound'

import { allowList, boardsMap } from './boards'
import settings from './settings'

const AllThreads = () => {
    const board = useParams().board
    const page = parseInt(useParams().page) || 1
    const [threads, setThreads] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const history = useHistory();

    useEffect(() => {
        (async () => {
            window.scrollTo(0, 0)

            const response = await fetch(`${settings.site.url}/api/hispafiles/${board}/${page}`)
            const data = await response.json()
            setThreads(data.threads)
            setTotalPages(data.totalPages)
        })()
      }, [page, board])

    if (!allowList.includes(board)) {
        return <NotFound />
    }
    
    const handlePaginationChange = (e, { activePage }) => {
        history.push(`/${board}/${activePage}`)
    }
    
    return (
        <Container>
            <center>
                <h1>{`/${board}/ - ${boardsMap[board].title}`}</h1>
            </center>
            <Item.Group>
            {
                threads.map(thread => <Item key={ uuid() } as={ Link } to={`/${thread.board}/res/${thread.postId}`}>
                    { thread.file && <Item.Image src={`${settings.site.url}/${thread.file.thumb}`} /> }
                    <Item.Content>
                        <Item.Header>{ thread.subject }</Item.Header>
                        <Item.Meta>
                            <Icon name='comments' />{ thread.replyCount + 'respuestas.' } 
                            <Icon name='wait' />{ moment(thread.date).format('DD/MM/YY HH:mm') }
                        </Item.Meta>
                        <Item.Description>{ thread.message.substring(0, 256) }</Item.Description>
                        <Item.Extra>Archivado por última vez { moment(thread.lastUpdate).format('DD/MM/YY HH:mm') }</Item.Extra>
                    </Item.Content>
                </Item>)
            }
            </Item.Group>
            <center>
                <Pagination pointing secondary activePage={ page } totalPages={ totalPages } onPageChange={ handlePaginationChange }/>
            </center>
        </Container> 
    )
}

export default AllThreads