import React, { Component } from 'react';
import './App.css';
import './assets/foundation/foundation.css'
import Clock from './components/clock/clock';
import Date from './components/date/date';
import BusTimes from './components/bus-times/bus-times';

class App extends Component {

  checkIfAuthenticated() {
    if ( window.sessionStorage.getItem('_auth') === "true" ) return true;

    var secret = window.prompt('What is your secret?');
    if (secret === process.env.REACT_APP_SECRET) {
      window.sessionStorage.setItem('_auth', "true");
      return true;
    }

    return false;
  }

  render() {
    if (!this.checkIfAuthenticated()) return <div>Access denied.</div>;

    return (
      <div className="App">
        <div className="grid-x">
          <div className="cell large-8">
            <Clock />
            <Date />
          </div>
          <div className="cell large-4">
            <BusTimes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
