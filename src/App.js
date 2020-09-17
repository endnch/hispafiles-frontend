import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import Topbar from './Topbar'
import Footer from './Footer'
import Api from './Api'
import AllThreads from './AllThreads'
import Thread from './Thread'
import Home from './Home'
import SettingsModal from './SettingsModal'

import styles from './styles'
import settings from './settings'

const MainContent = styled.div`
  padding-top: 128px;
  a {
    color:  ${props => props.theme.linkColor};
  }
  a:hover {
    color:  ${props => props.theme.linkHover};
  }
  h1 {
    color:  ${props => props.theme.fgColor};
    font-weight: 100;
}
`

const App = () => {
  const [style, setStyle] = useState(localStorage.getItem('style') || settings.defaultStyle)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openSettings = () => {
    setSettingsOpen(true)
  }

  const changeStyle = style => {
    document.body.style.background = styles[style].bgColor
    setStyle(style)
  }

  useEffect(() => {
    document.body.style.background = styles[style].bgColor
  }, [])

  return (
    <ThemeProvider theme={ styles[style] }>

      <SettingsModal
        open={ settingsOpen }
        setOpen={ setSettingsOpen }
        style={ style }
        changeStyle={ changeStyle }
      />
      
      <Router>
        <Topbar openSettings={ openSettings } />
        <MainContent>
          <Switch>
              <Route path='/api'>
                <Api />
              </Route>
              <Route path='/:board/res/:th'>
                <Thread />
              </Route>
              <Route path='/:board/:page?'>
                <AllThreads />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
          </Switch>
        </MainContent>
        <Footer />
      </Router>

    </ThemeProvider>
  )
}

export default App
