import React from 'react'
import { Menu, Input, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom"

import settings from './settings'
import topIcon from './top_icn.png'

const Topbar = () => {
  return (
    <Menu fixed='top' inverted id='mainMenu'>
        <Menu.Item as={Link} to='/'>
            <Image src={topIcon} />
            { settings.site.title }
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item>
                <Input icon='search' placeholder='Buscar Hilos...' />
            </Menu.Item>
            <Menu.Item>
                <Icon name='sidebar' />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
  )
}

export default Topbar