import React from 'react'
import { v4 as uuid } from 'uuid'

import PostMeta from './PostMeta'
import Renderer from './Renderer'
import Backlink from './Backlink'

import settings from '../settings'

const Post = React.forwardRef(
  ({ thread, post, backlinks, activePosts, setActivePosts }, ref) => {
    return (
      <>
        {thread.postId !== post.postId && <PostMeta thread={thread} post={post} />}
        {post.file && (
          <>
            <span className="filesize">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${settings.site.url}/${post.file.url}`}
              >
                {post.file.url.split('/').reverse()[0]}
              </a>
              <span style={{ fontSize: '85%' }}>
                ({post.file.size}
                {post.file.resolution && (
                  <span className="moculto">, {post.file.resolution}</span>
                )}
                {post.file.name && <span className="nombrefile">, {post.file.name}</span>}
                )
              </span>
            </span>
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${settings.site.url}/${post.file.url}`}
            >
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
        <span
          id={post.postId}
          style={{ position: 'relative', bottom: '128px', display: 'block' }}
          ref={activePosts[post.postId] ? ref : undefined}
        ></span>
        {thread.postId === post.postId && <PostMeta thread={thread} post={post} />}
        <blockquote style={{ wordWrap: 'break-word' }}>
          {post.dado && (
            <>
              <font color="red">
                <img src={`${settings.site.url}/images/dado.png`} alt="" />
                &nbsp;{'= '}
                <b>{post.dado}</b>
              </font>
              <br />
              <br />
            </>
          )}
          {post.fortuna && (
            <>
              <font color="red">
                <b>Tu fortuna: {post.fortuna}</b>
                <br />
                <br />
              </font>
            </>
          )}
          {
            <Renderer
              thread={thread}
              post={post}
              text={post.message}
              postId={post.postId}
              setActivePosts={setActivePosts}
              backlinks={backlinks}
            />
          }
          <br />
          <br />
          {backlinks[post.postId] && (
            <div className="replybacklinks">
              {backlinks[post.postId].map((backlink) => (
                <Backlink
                  key={uuid()}
                  thread={thread}
                  backlink={backlink}
                  setActivePosts={setActivePosts}
                  backlinks={backlinks}
                />
              ))}
            </div>
          )}
        </blockquote>
      </>
    )
  }
)

export default Post
