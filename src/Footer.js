import React from 'react'
import settings from './settings'
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div id='footer'>
        <center>
            Hispachan Files es un proyecto no-oficial y es completamente ajeno a la administración de <a href="https://www.hispachan.org/">hispachan.org</a>.
            <br />
            <a href={'mailto:' + settings.misc.email}>Contacto</a>
            {' '}/{' '}<a href='https://github.com/HispachanFiles/HispachanFiles'>GitHub</a>
            { settings.features.apiEnabled && <>{' '}/{' '}<Link to='/api'>API</Link></> }
        </center>
    </div>
  )
}

export default Footer