import { Item } from 'semantic-ui-react'
import styled from '@emotion/styled'

import makeImportant from './utils/makeImportant'

const style = {
  fgColor: ({ theme }) => ({
    color: makeImportant(theme.fgColor),
  }),
  hover: ({ theme }) => ({
    ':hover .header': {
      color: makeImportant(theme.linkHover),
    },
  }),
}

const customItem = styled(Item)(style.hover)

customItem.Description = styled(Item.Description)(style.fgColor)
customItem.Header = styled(Item.Header)(style.fgColor)
customItem.Meta = styled(Item.Meta)(style.fgColor)

customItem.Content = Item.Content
customItem.Extra = Item.Extra
customItem.Group = Item.Group
customItem.Image = Item.Image

export default customItem
