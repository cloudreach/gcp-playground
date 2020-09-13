import React from 'react';
import logo from './logo.svg';
import './App.css';

import { withTrackingOnPress } from './hoc/withTrackingOnPress';

// * Mocking firebase SDKs for demo purposes
const firebase = {
  analytics: () => ({
    logEvent: (...args) => console.log(...args)
  })
}

// * Example of "Tracked CTA" component using Firebase Analytics
const TrackedButton = withTrackingOnPress(
  firebase.analytics(),
  ({ onPress }) => <button onClick={onPress}>Click Me For a logged event</button>
)

const TrackedButton = withTrackingOnPress(analytics, ({ onPress }) => <button onClick={onPress}>Click Me For a logged event</button>)

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
      </header>
    </div>
  );
}

export default App;
