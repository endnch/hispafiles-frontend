/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'

import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { boards } from '../boards'
import makeImportant from './utils/makeImportant'

const style = (theme) => ({
  background: makeImportant(theme.pbBackground),
  color: makeImportant(theme.fgColor),
})

const NavBar = () => (
  <Segment css={style}>
    {boards.map((group, index) => (
      <React.Fragment key={index}>
        [{' '}
        {group.map((board, index) => (
          <React.Fragment key={board.board}>
            <Link to={board.board} title={board.title}>
              {board.board === 'all' ? board.title : board.board}
            </Link>
            {index !== group.length - 1 && ' / '}
          </React.Fragment>
        ))}{' '}
        ]
      </React.Fragment>
    ))}
  </Segment>
)

export default NavBar
