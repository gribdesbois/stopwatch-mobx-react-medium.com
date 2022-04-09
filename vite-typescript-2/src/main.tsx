import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { configure } from 'mobx'
import App from './App'
import { TimerStore } from './stores/TimerStore'

configure({
  enforceActions: 'observed',
})
const timerStore = new TimerStore()

ReactDOM.render(
  <App timerStore={timerStore} />,
  document.getElementById('root')
)
