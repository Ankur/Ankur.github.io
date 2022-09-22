import React from 'react';
import portrait from './Images/portrait.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={portrait} className="App-logo"/>
        <a className="Linkedin-Link" href="https://www.linkedin.com/in/ankur-j/" target="_blank">Learn more about me</a>
      </header>
    </div>
  );
}

export default App;
