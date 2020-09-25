import { Menu } from 'semantic-ui-react'
import styled from '@emotion/styled'

import makeImportant from './utils/makeImportant'

const style = {
  menu: ({ theme }) => ({
    background: makeImportant(theme.bgAccent),
  }),
  item: ({ theme }) => ({
    color: makeImportant(theme.fgAccent),
  }),
}

const customMenu = styled(Menu)(style.menu)
customMenu.Item = styled(Menu.Item)(style.item)
customMenu.Menu = Menu.Menu

export default customMenu
