/** @jsx jsx */
import { jsx } from '@emotion/core'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import Post from '../components/Post'
import Loading from '../components/Loading'
import style from './Thread.style'

import settings from '../settings'

const Thread = () => {
  const { board, th } = useParams()
  const threadId = th.split('.')[0]
  const post = window.location.hash.substring(1)
  const [thread, setThread] = useState({})
  const [loading, setLoading] = useState(true)
  const [backlinks, setBacklinks] = useState({})
  const [activePosts, setActivePosts] = useState(post ? { [post]: true } : {})
  const ref = useRef(null)

  const generateBacklinks = (thread) => {
    const backlinks = {}

    const addBacklink = (from, to) => {
      const postBacklinks = backlinks[from] || []

      if (!postBacklinks.includes(to)) {
        backlinks[from] = [...postBacklinks, to]
      }
    }

    const helper = (text, postId) => {
      text.replace(/>>([r]?[l]?[f]?[q]?[0-9,\-,,]+)/g, (ref) => {
        const rP = ref.substr(2)
        addBacklink(rP, postId)
      })
    }

    helper(thread.message, thread.postId)
    for (const reply of thread.replies) helper(reply.message, reply.postId)

    setBacklinks(backlinks)
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const response = await fetch(
        `${settings.site.url}/api/hispafiles/${board}/res/${threadId}`
      )
      const data = await response.json()
      generateBacklinks(data)
      setThread(data)
      setLoading(false)
      if (post) window.scrollTo(0, ref.current.offsetTop)
    })()
  }, [board, threadId])

  if (loading) {
    return <Loading />
  }

  const title = thread.subject
    ? thread.subject
    : thread.message.length <= 50
    ? thread.message
    : thread.message.substring(0, 50) + '...'

  return (
    <div css={style}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <br />
      <hr />
      <div className="replymode">
        Archivado por última vez {moment(thread.lastUpdate).format('DD/MM/YY HH:mm')}{' '}
        (Hora Local).
      </div>
      <hr />
      <div id={'thread' + thread.postId + thread.board}>
        <Post
          thread={thread}
          post={thread}
          backlinks={backlinks}
          activePosts={activePosts}
          setActivePosts={setActivePosts}
          ref={ref}
        />
        {thread.replies &&
          thread.replies.map((post) => (
            <table
              key={post.postId}
              id={'respuesta' + post.postId}
              className="respuesta post"
            >
              <tbody>
                <tr>
                  <td className="doubledash">{'>>'}</td>
                  <td
                    id={'reply' + post.postId}
                    hf-id={post.postId}
                    className={activePosts[post.postId] ? 'reply highlight' : 'reply'}
                  >
                    <Post
                      thread={thread}
                      post={post}
                      backlinks={backlinks}
                      activePosts={activePosts}
                      setActivePosts={setActivePosts}
                      ref={ref}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
      </div>
      <hr />
    </div>
  )
}

export default Thread
