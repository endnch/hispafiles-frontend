import React from 'react'

import { Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import SearchBar from './SearchBar'
import Menu from './Menu'

import settings from '../settings'
import topIcon from '../img/top_icn.png'

const Topbar = ({ openSettings }) => {
  return (
    <Menu>
      <Menu.Item as={Link} to="/">
        <Image src={topIcon} />
        {settings.site.title}
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <SearchBar />
        </Menu.Item>
        <Menu.Item as="a" onClick={openSettings}>
          <Icon name="settings" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Topbar
