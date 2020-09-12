import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Topbar from './Topbar'
import Footer from './Footer'
import Api from './Api'
import AllThreads from './AllThreads'
import Boards from './pages/Boards'
import Thread from './Thread'
import Home from './Home'

const App = () => {
  return (
    <Router>
      <Topbar />
      <div id='mainContent'>
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
            <Route path='/:board'>
              <Boards />
            </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}

export default App
