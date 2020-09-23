import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import Post from '../components/Post'

import settings from '../settings'

const Thread = ({ className, relativeTime }) => {
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

  if (loading)
    return (
      <div>
        <br />
        <center>
          <h1>(...)</h1>
        </center>
      </div>
    )

  const title = thread.subject
    ? thread.subject
    : thread.message.length <= 50
    ? thread.message
    : thread.message.substring(0, 50) + '...'

  return (
    <div className={className}>
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
          relativeTime={relativeTime}
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
                      relativeTime={relativeTime}
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

export default styled(Thread)`
  & {
    padding-bottom: 0.5em;
    color: ${(props) => props.theme.fgColor};
    font-size: 90%;
  }

  .replymode {
    background: ${(props) => props.theme.bgAccent};
    color: ${(props) => props.theme.fgAccent};
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 120%;
  }

  .thumb {
    border: none;
    float: left;
    margin-top: 2px;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
    max-height: 250px;
  }

  table {
    margin: 4px;
  }

  .doubledash {
    color: ${(props) => props.theme.doubledash};
    vertical-align: top;
  }

  blockquote:last-child {
    margin-bottom: 0em;
  }

  .reply {
    background: ${(props) => props.theme.pbBackground};
    color: ${(props) => props.theme.pbForeground};
    border: 1px solid ${(props) => props.theme.pbBorder};
    padding: 5px;
  }

  hr {
    height: 1px;
    background-color: ${(props) => props.theme.dividerColor};
    border: none;
  }

  .unkfunc {
    background: inherit;
    color: ${(props) => props.theme.greentext};
  }

  .redtext {
    color: #e0727f;
  }

  .filetitle {
    color: ${(props) => props.theme.filetitle};
    font-weight: bold;
  }

  input[type='checkbox'],
  .filetitle,
  img.bandera,
  span.anonid,
  span.timer,
  a.reflink2,
  .filesize a,
  .badge,
  .postername,
  .reflinks {
    margin-right: 0.3em;
  }

  .filesize {
    margin-left: 20px;
  }

  .anonid {
    display: inline-block;
    font-size: 80%;
    padding: 2px 5px;
    border-radius: 4px;
    text-shadow: 1px 1px black;
    color: white;
  }

  .badge {
    display: inline-block;
    font-size: 80%;
    background: ${(props) => props.theme.badgeBg};
    color: ${(props) => props.theme.badgeColor};
    padding: 2px 5px;
    border-radius: 4px;
  }

  .timer {
    font-size: 90%;
  }

  .replybacklinks {
    font-size: 85%;
  }

  .highlight {
    background: ${(props) => props.theme.highlightBg};
    color: ${(props) => props.theme.highlightFg};
    border: 1px solid ${(props) => props.theme.highlightBo};
    border-radius: 5px;
  }

  .postername {
    font-weight: bold;
    color: ${(props) => props.theme.postername};
  }

  .code {
    background: ${(props) => props.theme.codeBg};
    border: 1px solid ${(props) => props.theme.codeBorder};
    overflow: auto;
    padding: 10px !important;
    max-width: 102% !important;
    max-height: 400px;
    font-family: monospace;
    white-space: pre-wrap;
    overflow-x: hidden;
    font-size: 120%;
    margin-top: 10px;
    margin-bottom: -5px;
  }
`
