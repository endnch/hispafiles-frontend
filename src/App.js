import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Global } from '@emotion/core'

import { selectStyle } from './features/settings/settingsSlice'

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

const globalStyle = (theme) => ({
  a: {
    color: theme.linkColor,
  },
  'a:hover': {
    color: theme.linkHover,
  },
  body: {
    background: theme.bgColor,
    color: theme.fgColor,
  },
  h1: {
    fontWeight: 100,
  },
})

const App = () => {
  const style = useSelector(selectStyle)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openSettings = () => {
    setSettingsOpen(true)
  }

  return (
    <ThemeProvider theme={styles[style]}>
      <Helmet>
        <title>
          {settings.site.title} - {settings.site.subtitle}
        </title>
      </Helmet>

      <Global styles={globalStyle} />
      <SettingsModal open={settingsOpen} setOpen={setSettingsOpen} />

      <Router>
        <Topbar openSettings={openSettings} />
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
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
