import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const environment = process.env.REACT_APP_ENV || "unknown";
    const port = environment === "main" ? 3000 : 3001;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Welcome to React [{environment} branch], port: {port}
        </p>
      </div>
    );
  }
}

export default App;
