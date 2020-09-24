import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Provider } from 'react-redux'

import App from './App'
import store from './app/store'

import 'semantic-ui-css/semantic.min.css'
import 'lightbox-react/style.css'

moment.locale('es', {
  relativeTime: {
    future: 'dentro de %s',
    past: 'hace %s',
    s: 'algunos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
