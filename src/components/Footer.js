import React from 'react'
import settings from '../settings'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = ({ className }) => {
  return (
    <div className={className}>
      <center>
        Hispachan Files es un proyecto no-oficial y es completamente ajeno a la
        administración de <a href="https://www.hispachan.org/">hispachan.org</a>
        .
        <br />
        <a href={'mailto:' + settings.misc.email}>Contacto</a>
        {' / '}
        <a href="https://github.com/HispachanFiles/HispachanFiles">GitHub</a>
        {settings.features.apiEnabled && (
          <>
            {' / '}
            <Link to="/api">API</Link>
          </>
        )}
      </center>
    </div>
  )
}

export default styled(Footer)`
  padding-top: 2em;
  padding-bottom: 2em;
  color: ${(props) => props.theme.fgColor};
  a {
    color: ${(props) => props.theme.linkColor};
  }
  a:hover {
    color: ${(props) => props.theme.linkHover};
  }
`
