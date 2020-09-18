import React, { useEffect, useState } from 'react'
import { Container, Item, Icon, Pagination } from 'semantic-ui-react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import styled from 'styled-components'

import NotFound from './NotFound'

import { allowList, boardsMap } from '../boards'
import settings from '../settings'

const AllThreads = ({ className }) => {
  const board = useParams().board
  const page = parseInt(useParams().page) || 1
  const [threads, setThreads] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      window.scrollTo(0, 0)

      const response = await fetch(`${settings.site.url}/api/hispafiles/${board}/${page}`)
      const data = await response.json()
      setThreads(data.threads)
      setTotalPages(data.totalPages)
      setLoading(false)
    })()
  }, [page, board])

  const handlePaginationChange = (e, { activePage }) => {
    history.push(`/${board}/${activePage}`)
  }

  if (!allowList.includes(board)) {
    return <NotFound />
  }

  if (loading)
    return (
      <div>
        <br />
        <center>
          <h1>(...)</h1>
        </center>
      </div>
    )

  return (
    <Container className={className}>
      <center>
        <h1>{`/${board}/ - ${boardsMap[board].title}`}</h1>
        <Pagination
          pointing
          secondary
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePaginationChange}
        />
      </center>
      <Item.Group>
        {threads.map((thread) => (
          <Item key={uuid()} as={Link} to={`/${thread.board}/res/${thread.postId}`}>
            {thread.file && (
              <Item.Image src={`${settings.site.url}/${thread.file.thumb}`} />
            )}
            <Item.Content>
              <Item.Header>{thread.subject}</Item.Header>
              <Item.Meta>
                <Icon name="comments" />
                <span>{thread.replyCount + ' respuestas.'} </span>
                <Icon name="wait" />
                <span>{moment(thread.date).format('DD/MM/YY HH:mm')}</span>
              </Item.Meta>
              <Item.Description>{thread.message.substring(0, 256)}</Item.Description>
              <Item.Extra>
                Archivado por última vez{' '}
                {moment(thread.lastUpdate).format('DD/MM/YY HH:mm')}
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      <center>
        <Pagination
          pointing
          secondary
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePaginationChange}
        />
      </center>
    </Container>
  )
}

export default styled(AllThreads)`
  .ui.items > .item .meta,
  .ui.items > .item > .content > .header,
  .ui.items > .item > .content > .description {
    color: ${(props) => props.theme.fgColor};
  }

  .ui.items a.item:hover .content .header {
    color: ${(props) => props.theme.linkHover};
  }

  /* Paginación */
  .ui.pagination.pointing.secondary.menu {
    background-color: ${(props) => props.theme.bgAccent};

    a.item,
    a.item:hover {
      color: ${(props) => props.theme.fgAccent};
    }

    a.item:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    .active.item {
      border-color: ${(props) => props.theme.fgAccent};
    }
  }
  /* Paginación */

  .wait.icon {
    margin-right: 0.3em;
  }
`
