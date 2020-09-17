import React from 'react'
import moment from 'moment'

const PostMeta = ({ thread, post }) => {
    return <>
        <label>
            <input type='checkbox' disabled />
            { post.subject && <span className='filetitle'>{ post.subject }</span> }
            { post.flag && 
                <img
                    className='bandera'
                    src={ post.flag }
                    alt={ post.posterContry  }
                    title={ post.posterCountryName } />
            }
            { post.posterName && <span className='postername'>{ post.posterName }</span> }
            { post.anonId && 
                <span className='anonid'
                style={{ backgroundColor: post.anonIdColor }}>{ post.anonId }</span> 
            }
            { post.op && <span className='badge'>OP</span> }
            { post.admin && <span className='badge'>Admin</span> }
            { post.mod && <span className='badge'>Mod</span> }
            { post.guest && <span className='badge'>Guest</span> }
            <span
                className='timer'
                title='Hispachan Files siempre muestra la hora local.'>
                { moment(post.date).format('DD/MM/YY HH:mm') }
            </span>
        </label>
        <span className='reflink'>
            <a
                className='reflink2'
                title='Obtener link a este post'
                href={ `/${thread.board}/res/${thread.postId}#${post.postId}` }
            >/#/</a>
            <span className='reflinks' title='ID de post'>{ post.postId }</span>
        </span>
        <span className='extrabtns'>
            { post.locked && <img alt='Cerrado' src='https://www.hispachan.org/css/locked.gif' /> }
            { post.sticky && <img alt='Hilo fijado' title='Hilo fijo' src='https://www.hispachan.org/css/sticky.gif' /> }
            { post.dice && <img alt='Se permiten dados' title='En este hilo se permite lanzar dados' src='https://www.hispachan.org/buttons/dado.png' /> }
        </span>
        <br />
    </>
}

export default PostMeta