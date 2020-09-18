import React from 'react'
import { Parser as HtmlToReactParser } from 'html-to-react'
import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import PostMeta from './PostMeta'

import renderUtility from './utils/renderUtility'
import settings from '../settings'

const PostContent = ({ thread, backlink, backlinks }) => {
  const post = thread.replies.find((reply) => {
    return reply.postId === parseInt(backlink)
  })

  if (!post) return <p></p>

  const htmlToReactParser = new HtmlToReactParser()
  const reactElement = htmlToReactParser.parse(renderUtility(post.message))

  return (
    <>
      <PostMeta thread={thread} post={post} />
      {post.file && (
        <>
          <span className="filesize">
            <a>{post.file.url.split('/').reverse()[0]}</a>
            <span style={{ fontSize: '85%' }}>
              ({post.file.size}
              {post.file.resolution && (
                <span className="moculto">, {post.file.resolution}</span>
              )}
              {post.file.name && <span className="nombrefile">, {post.file.name}</span>})
            </span>
          </span>
          <br />
          <a target="_blank" rel="noopener noreferrer" href={`/${post.file.url}`}>
            <span id={`thumb${post.postId}`}>
              <img
                className="thumb"
                src={`${settings.site.url}/${post.file.thumb}`}
                alt={post.postId}
              ></img>
            </span>
          </a>
        </>
      )}
      <blockquote style={{ wordWrap: 'break-word' }}>
        {reactElement}
        <br />
        <br />
        {backlinks[post.postId] && (
          <div className="replybacklinks">
            {backlinks[post.postId].map((backlink) => (
              <a key={uuid()}>{`>>${backlink}`}</a>
            ))}
          </div>
        )}
      </blockquote>
    </>
  )
}

const StyledPopup = styled(Popup)`
  background: ${(props) => props.theme.pbBackground} !important;
  color: ${(props) => props.theme.pbForeground} !important;
  border: 1px solid ${(props) => props.theme.pbBorder} !important;

  a {
    color: ${(props) => props.theme.linkColor};
  }

  .unkfunc {
    background: inherit;
    color: ${(props) => props.theme.greentext};
  }

  .redtext {
    color: #e0727f;
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

  .thumb {
    border: none;
    float: left;
    margin-top: 2px;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
    max-height: 250px;
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

const Backlink = ({ thread, backlink, setActivePosts, backlinks }) => {
  const trigger = (
    <a
      href={`#${backlink}`}
      onClick={() => setActivePosts({ [backlink]: true })}
    >{`>>${backlink}`}</a>
  )

  return (
    <StyledPopup
      basic
      flowing
      size="small"
      position="bottom left"
      pinned
      trigger={trigger}
    >
      <PostContent thread={thread} backlink={backlink} backlinks={backlinks} />
    </StyledPopup>
  )
}

export default Backlink
