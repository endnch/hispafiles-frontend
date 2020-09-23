import React from 'react'
import { Modal, TransitionablePortal, Form, Checkbox } from 'semantic-ui-react'

import styles from '../styles'

const SettingsModal = ({
  open,
  setOpen,
  style,
  changeStyle,
  relativeTime,
  setRelativeTime,
}) => {
  const closeModal = () => {
    setOpen(false)
  }

  const openModal = () => {
    setOpen(true)
  }

  const handleChange = (e, data) => {
    changeStyle(data.value)
    localStorage.setItem('style', data.value)
  }

  const handleCheckBoxChange = (e, data) => {
    setRelativeTime(data.checked)
    localStorage.setItem('relativeTime', data.checked)
  }

  const options = Object.keys(styles).map((key) => ({
    key,
    text: key,
    value: key,
  }))

  return (
    <TransitionablePortal open={open}>
      <Modal onOpen={openModal} onClose={closeModal} open={open}>
        <Modal.Header>Opciones</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Dropdown
              label="Estilo"
              value={style}
              fluid
              selection
              options={options}
              onChange={handleChange}
            ></Form.Dropdown>
            <Checkbox
              label="Usar fechas relativas"
              checked={relativeTime}
              onChange={handleCheckBoxChange}
            />
          </Form>
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  )
}

export default SettingsModal
