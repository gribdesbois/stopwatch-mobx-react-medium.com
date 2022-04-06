import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { useStrict } from 'mobx'
import App from './App'
import { TimerStore } from './stores/TimerStore'

const timerStore = new TimerStore()

ReactDOM.render(
  <App timerStore={timerStore} />,
  document.getElementById('root')
)
