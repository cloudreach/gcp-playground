/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { withTrackingOnPress } from './hoc/withTrackingOnPress'
import { withSla } from './hoc/withSla'
import { useStopTrace } from './hooks/useStopTrace'

// * Mocking firebase SDKs for demo purposes
const firebase = {
  analytics: () => ({
    logEvent: (...args) => console.log(...args)
  }),
  perf: () => ({
    startTrace: async name => {
      console.log(`=== Starting trace ${name} ===`)
      return {
        stop: async () => {
          console.log(`=== Stopping trace ${name} ===`)
        }
      }
    }
  })
}

// * Example of "Tracked CTA" component using Firebase Analytics
const TrackedButton = withTrackingOnPress(
  firebase.analytics(),
  ({ onPress }) => <button onClick={onPress}>Click Me For a logged event</button>
)

// * Example of a "SLA Traced" component using Firebase Performance Monitoring
const TracedComponent = withSla(
  firebase.perf(),
  ({ doStopTrace }) => {
    // * just some text to indicate trace has "stopped"
    const [text, setText] = useState('Waiting for trace to "stop"...')
    
    useStopTrace(
      doStopTrace,
      () => new Promise(resolve => {
        // * simulate fetching data and call provided callback when done "fetching"
        setTimeout(async () => {
          setText('Trace has been "stopped" (open your console)')
          resolve()
        }, 3000)
      })
    )
  
    return <div>{text}</div>
  }
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TrackedButton event="awesome_event" eventParams={{ foo: 'bar' }} onPress={() => console.log('do something from pressing button')} />
        <br />
        <TracedComponent traceName="traced_component_sla" />
      </header>
    </div>
  )
}

export default App
