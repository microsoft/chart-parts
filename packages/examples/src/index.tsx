import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const entryDiv = document.createElement('div')
entryDiv.className = 'app'
document.body.appendChild(entryDiv)

ReactDOM.render(<App />, entryDiv)
