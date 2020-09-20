import React, { useEffect, useState } from 'react'
import { Container, Item, Icon, Pagination } from 'semantic-ui-react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import settings from '../settings'

const Search = ({ className }) => {
  const query = useParams().query
  const page = parseInt(useParams().page) || 1
  const [threads, setThreads] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      window.scrollTo(0, 0)

      const response = await fetch(
        `${settings.site.url}/api/hispafiles/search/${query}/${page}`
      )
      const data = await response.json()
      setThreads(data.threads)
      setTotalPages(data.totalPages)
      setLoading(false)
    })()
  }, [page, query])

  const handlePaginationChange = (e, { activePage }) => {
    history.push(`/search/${query}/${activePage}`)
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
      <Helmet>
        <title>
          Resultados de la búqueda: {query} - {settings.site.title}
        </title>
      </Helmet>
      <center>
        <h1>{`Resultados de la búsqueda: ${query}`}</h1>
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

export default styled(Search)`
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
