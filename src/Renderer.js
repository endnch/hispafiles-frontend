/**
 * Ayuda a renderizar los mensajes de los posts
 */

import React from 'react'
import { Parser as HtmlToReactParser, ProcessNodeDefinitions } from 'html-to-react'
import { v4 as uuid } from 'uuid'

import Backlink from './Backlink'

import renderUtility from './renderUtility'

const Renderer = ({ thread, text, setActivePosts, backlinks }) => {
  if (text.length === 0) return <></>
  
  const htmlToReactParser = new HtmlToReactParser()
  const isValidNode = () => true
  const processNodeDefinitions = new ProcessNodeDefinitions(React)

  const processingInstructions = [
      {
        shouldProcessNode: node => node.attribs && node.attribs['class'] === 'backlink',
        processNode: node => {
          return  <Backlink
                    key={ uuid() }
                    thread={ thread }
                    backlink={ node.attribs['data-ref'] }
                    setActivePosts={ setActivePosts }
                    backlinks={ backlinks }
                  />
        }
      },
      {
        shouldProcessNode:  () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
  ]

  const reactComponent = htmlToReactParser.parseWithInstructions(
    renderUtility(text),
    isValidNode,
    processingInstructions
  )

  return reactComponent
}

export default Renderer