import React, { Component } from 'react';
import './App.css';
import './assets/foundation/foundation.css'
import Clock from './components/clock/clock';
import Date from './components/date/date';
import BusTimes from './components/bus-times/bus-times';
import TrainLines from './components/train-lines/train-lines';
import Roads from './components/roads/roads';
import logo from './assets/tfl-logo.png';

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
          <div className="cell large-4">
            <Clock />
            <Date />
          </div>
          <div className="cell large-4">
            <img src={logo} className="TflLogo" alt="tfl-logo" />
          </div>
          <div className="cell large-4">
            <Roads />
          </div>
        </div>
        
        <div className="grid-x">
          <div className="cell large-4">
            
          </div>
          <div className="cell large-4">
            <BusTimes />
          </div>
          <div className="cell large-4">
            <TrainLines />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
