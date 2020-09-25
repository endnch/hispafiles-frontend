/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React from 'react'
import { jsx } from '@emotion/core'

import { Parser as HtmlToReactParser } from 'html-to-react'
import { Popup } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

import PostMeta from './PostMeta'
import threadStyle from '../pages/Thread.style'

import renderUtility from './utils/renderUtility'
import makeImportant from './utils/makeImportant'
import settings from '../settings'

const style = (theme) => ({
  ...threadStyle(theme),
  background: makeImportant(theme.pbBackground),
  color: makeImportant(theme.pbForeground),
  border: makeImportant(`1px solid ${theme.pbBorder}`),
})

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
            <span>
              ({post.file.size}
              {post.file.resolution && <span>, {post.file.resolution}</span>}
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

const Backlink = ({ thread, backlink, setActivePosts, backlinks }) => {
  const trigger = (
    <a
      href={`#${backlink}`}
      onClick={() => setActivePosts({ [backlink]: true })}
    >{`>>${backlink}`}</a>
  )

  return (
    <Popup
      css={style}
      basic
      flowing
      size="small"
      position="bottom left"
      pinned
      trigger={trigger}
    >
      <PostContent thread={thread} backlink={backlink} backlinks={backlinks} />
    </Popup>
  )
}

export default Backlink
