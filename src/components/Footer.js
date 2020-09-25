import React from 'react'
import { Link } from 'react-router-dom'

import settings from '../settings'

const Footer = () => {
  return (
    <div style={{ paddingTop: '2em', paddingBottom: '2em' }}>
      <center>
        Hispachan Files es un proyecto no-oficial y es completamente ajeno a la
        administración de <a href="https://www.hispachan.org/">hispachan.org</a>
        .
        <br />
        <a href={'mailto:' + settings.misc.email}>Contacto</a>
        {' / '}
        <a href="https://github.com/endnch/hispafiles-frontend">GitHub</a>
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

export default Footer
