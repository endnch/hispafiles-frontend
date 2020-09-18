import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { boards } from '../boards'

const NavBar = ({ className }) => (
  <Segment className={className}>
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

export default styled(NavBar)`
  color: ${(props) => props.theme.fgColor} !important;
  background: ${(props) => props.theme.pbBackground} !important;
`
