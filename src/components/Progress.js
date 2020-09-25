import { Progress } from 'semantic-ui-react'
import styled from '@emotion/styled'

import makeImportant from './utils/makeImportant'

const style = ({ theme }) => ({
  '.label': {
    color: makeImportant(theme.fgColor),
  },
})

const customProgress = styled(Progress)(style)

export default customProgress
