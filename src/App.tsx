import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProfileList from './ProfileList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TweetList/>
        </header>
      </div>
    );
  }
}

export default App;