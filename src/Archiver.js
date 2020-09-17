import React, { useEffect, useState, useRef } from 'react'
import { Input, Segment, Progress, Grid, Image, Icon, Button } from 'semantic-ui-react'
import io from 'socket.io-client'
import urlParse from 'url-parse'
import styled from 'styled-components'

import CopyButton from './CopyButton'

import settings from './settings'

const HispaProgress = styled(Progress)`
    .label {
        color: ${props => props.theme.fgColor} !important;
    }
`

const Archiver = () => {
    const socket = useRef(null)
    const [thread, setThread] = useState({})
    const [input, setInput] = useState('')
    const [endUrl, setEndUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [inputLoading, setInputLoading] = useState(false)
    const [inputEnabled, setInputEnabled] = useState(true)
    const [done, setDone] = useState(false)
    const [indicating, setIndicating] = useState(true)
    const [label, setLabel] = useState('Procesando URL...')
    const [showThread, setShowThread] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    
    useEffect(() => {
        socket.current = io(settings.site.url)

        socket.current.on('queueSuccess', threadData => {
            setThread(threadData)
            setShowThread(true)
        })

        socket.current.on('progressReport', updateProgress)

        socket.current.on('archiverDone', () => {
            setProgress(100)
            setInputLoading(false)
            setInputEnabled(true)
            setDone(true)
            setIndicating(false)
            setLabel('Terminado')
        })

        return () => {
            if (socket.current.connected) socket.current.disconnect()
        }
    }, [])

    const updateProgress = (text, current, total) => {
        setLabel('Guardando archivos...')
        setProgress( (current / total) * 100 )
    }

    const checkUrl = url => {
        url = urlParse(url)
        if (url.hostname !== 'www.hispachan.org') {
            console.log('Esta URL no pertenece a Hispachan ni a Hispachan Files')
            return false
        }
        if (!/\/(.+)\/res\/(\d+)(\.html)?/.test(url.pathname)) {
            console.log('Esta URL no pertenece a ningún hilo.')
            return false
        }
        setEndUrl(window.location.origin + url.pathname)
        return true
    }

    const reset = () => {
        setProgress(0)
        setIndicating(true)
        setLabel('Procesando URL...')
        setShowThread(false)
        setShowProgress(true)
    }

    const queueThread = () => {
        if (input.length === 0) return

        if (!checkUrl(input)) {
            setInputLoading(false)
            setInputEnabled(true)
            return
        }

        if (socket.current.connected) {
            setInputLoading(true)
            setInputEnabled(false)
            socket.current.emit('queueThread', input)
            reset()
        } 
    }

    return <>
        <Input
            fluid
            icon={<Icon name='save' inverted circular link onClick={ queueThread } />}
            onChange={ (e, data) => setInput(data.value) }
            loading={ inputLoading }
            disabled={ !inputEnabled }
            placeholder='Introduce una URL de Hispachan' />
        <div>
            { showProgress && <HispaProgress indicating={ indicating } success={ done } percent={ progress }>{ label }</HispaProgress> } 
            { showThread && <Segment>
                <Grid>
                    <Grid.Column width='3'>
                        <Image src={ `${thread.file.thumb}` } />
                    </Grid.Column>
                    <Grid.Column width='13'>
                        <h2>{ thread.subject || thread.url }</h2>
                        <p><Icon name='comments' />{ thread.replyCount } Respuestas</p>
                        { done 
                        ? <p><Icon name='check circle' color='green' /> Hilo almacenado correctamente</p>
                        : <p>Se almacenará en esta url:</p> }
                        <Input fluid>
                            <Input readOnly style={{ width: '100%' }}>{ endUrl }</Input>
                            <CopyButton text={ endUrl } />
                            <Button as='a' target='_blank' href={ endUrl } title='Ir al hilo' attached='right' icon='external' />
                        </Input>
                    </Grid.Column>
                </Grid>
                { !done && <center>Puedes cerrar esta ventana. El hilo seguirá en la cola de almacenamiento.</center> }
            </Segment> }
        </div>
    </>
}

export default Archiver