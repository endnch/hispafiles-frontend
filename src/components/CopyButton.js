import React, { useState, useRef } from 'react'
import { Button, Popup } from 'semantic-ui-react'

const CopyButton = ({ text }) => {
  const [popupOpen, setPopupOpen] = useState(false)
  const timeout = useRef(null)

  const handleOpen = () => {
    navigator.clipboard.writeText(text).then(() => {
      setPopupOpen(true)
    })

    if (timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      setPopupOpen(false)
    }, 2500)
  }

  const trigger = <Button title="Copiar" attached="right" icon="copy" />

  return (
    <Popup
      trigger={trigger}
      content="Copiado"
      on="click"
      open={popupOpen}
      onOpen={handleOpen}
      position="top right"
    />
  )
}

export default CopyButton
