import React, { useState, useCallback } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import debounce from 'lodash.debounce'

const CopyButton = ({ text }) => {
  const [popupOpen, setPopupOpen] = useState(false)

  const handleOpen = useCallback(
    debounce(
      () => {
        navigator.clipboard.writeText(text).then(() => {
          setPopupOpen(true)
        })

        setTimeout(() => {
          setPopupOpen(false)
        }, 2500)
      },
      2500,
      { leading: true, trailing: false }
    ),
    []
  )

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
