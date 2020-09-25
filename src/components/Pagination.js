import { Pagination } from 'semantic-ui-react'
import styled from '@emotion/styled'

import makeImportant from './utils/makeImportant'

const style = ({ theme }) => ({
  backgroundColor: makeImportant(theme.bgAccent),
  '.item': {
    color: makeImportant(theme.fgAccent),
  },
  '.active.item': {
    borderColor: makeImportant(theme.fgAccent),
  },
})

export default styled(Pagination)(style)
