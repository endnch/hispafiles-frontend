import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'

import Topbar from './components/Topbar'
import Footer from './components/Footer'
import SettingsModal from './components/SettingsModal'

import Api from './pages/Api'
import AllThreads from './pages/AllThreads'
import Thread from './pages/Thread'
import Home from './pages/Home'
import Search from './pages/Search'

import styles from './styles'
import settings from './settings'

const MainContent = styled.div`
  padding-top: 128px;
  a {
    color: ${(props) => props.theme.linkColor};
  }
  a:hover {
    color: ${(props) => props.theme.linkHover};
  }
  h1 {
    color: ${(props) => props.theme.fgColor};
    font-weight: 100;
  }
`

const App = () => {
  const [style, setStyle] = useState(
    localStorage.getItem('style') || settings.defaultStyle
  )
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openSettings = () => {
    setSettingsOpen(true)
  }

  const changeStyle = (style) => {
    document.body.style.background = styles[style].bgColor
    setStyle(style)
  }

  useEffect(() => {
    document.body.style.background = styles[style].bgColor
  }, [])

  return (
    <ThemeProvider theme={styles[style]}>
      <Helmet>
        <title>
          {settings.site.title} - {settings.site.subtitle}
        </title>
      </Helmet>

      <SettingsModal
        open={settingsOpen}
        setOpen={setSettingsOpen}
        style={style}
        changeStyle={changeStyle}
      />

      <Router>
        <Topbar openSettings={openSettings} />
        <MainContent>
          <Switch>
            <Route path="/api">
              <Api />
            </Route>
            <Route path="/search/:query/:page?">
              <Search />
            </Route>
            <Route path="/:board/res/:th">
              <Thread />
            </Route>
            <Route path="/:board/:page?">
              <AllThreads />
            </Route>
            <Route exact path="/">
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
