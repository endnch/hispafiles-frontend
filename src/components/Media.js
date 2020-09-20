import React, { useState } from 'react'
import Lightbox from 'lightbox-react'

import settings from '../settings'

const Media = ({ post }) => {
  const [open, setOpen] = useState(false)

  const extension = post.file.url.split('.').reverse()[0]

  const content =
    extension === 'mp4' || extension === 'webm' ? (
      <center
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <video controls autoPlay style={{ maxHeight: '100%', maxWidth: '100%' }}>
          <source src={`${settings.site.url}/${post.file.url}`} />
        </video>
      </center>
    ) : (
      `${settings.site.url}/${post.file.url}`
    )

  return (
    <span onClick={() => setOpen(true)}>
      <img
        className="thumb"
        src={`${settings.site.url}/${post.file.thumb}`}
        alt={post.postId}
      />
      {open && <Lightbox mainSrc={content} onCloseRequest={() => setOpen(false)} />}
    </span>
  )
}

export default Media