import React from 'react'
import { Parser as HtmlToReactParser } from 'html-to-react'
import { Popup } from 'semantic-ui-react'

import PostMeta from './PostMeta'

import renderUtility from './renderUtility'
import settings from './settings'

const PostPopup = ({ thread, backlink }) => {

    const post = thread.replies.find(reply => {
        return reply.postId === parseInt(backlink)
    })

    if (!post) return <p></p>

    const htmlToReactParser = new HtmlToReactParser()
    const reactElement = htmlToReactParser.parse(renderUtility(post.message))

    return <>
        <PostMeta thread={ thread } post={ post } />
        { post.file && <>
            <span className='filesize'>
                <a>{ post.file.url.split('/').reverse()[0] }</a>
                <span style={{ fontSize: '85%' }}>(
                    { post.file.size }
                    { post.file.resolution && <span className='moculto'>, { post.file.resolution }</span> }
                    { post.file.name && <span className='nombrefile'>, { post.file.name }</span> }
                )</span>
            </span>
            <br />
            <a target='_blank' rel="noopener noreferrer" href={ `/${post.file.url}` }>
                <span id={ `thumb${post.postId}` }>
                    <img className='thumb' src={ `${settings.site.url}/${post.file.thumb}` } alt={ post.postId }></img>
                </span>
            </a>
        </> }
        <blockquote style={{ wordWrap: 'break-word' }}>
            { reactElement }
        </blockquote>
    </>
}

const style = {
    maxWidth: '75%',
}

const Backlink = ({ thread, backlink, setActivePosts }) => {
    const trigger = <a href={`#${backlink}`} onClick={ () => setActivePosts({ [backlink]: true }) } >{`>>${backlink}`}</a>
    return (
        <Popup
            basic
            flowing
            size='small'
            position='bottom left'
            style={ style }
            trigger={ trigger }>
                <PostPopup thread={ thread } backlink={ backlink } />
        </Popup>
    )
    // return trigger
}

export default Backlink