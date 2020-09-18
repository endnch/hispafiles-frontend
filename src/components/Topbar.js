import React from 'react'
import { Menu, Input, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import settings from '../settings'
import topIcon from '../img/top_icn.png'

const Topbar = ({ className, openSettings }) => {
  return (
    <Menu className={className} fixed="top">
      <Menu.Item as={Link} to="/">
        <Image src={topIcon} />
        {settings.site.title}
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input transparent icon="search" placeholder="Buscar Hilos..." />
        </Menu.Item>
        <Menu.Item as="a" onClick={openSettings}>
          <Icon name="settings" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default styled(Topbar)`
  background: ${(props) => props.theme.bgAccent} !important;
  .item {
    color: ${(props) => props.theme.fgAccent} !important;
  }
  input,
  input:focus,
  input:focus::placeholder,
  i {
    color: ${(props) => props.theme.fgAccent} !important;
  }
  input::placeholder {
    color: ${(props) => props.theme.fgAccent} !important;
    opacity: 0.5;
  }
`
