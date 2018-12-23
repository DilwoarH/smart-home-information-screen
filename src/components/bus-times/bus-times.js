import React, { Component } from 'react';
import logo from '../../assets/tfl-logo.png';
import './bus-times.css';

class BusTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="BusTimesWrapper">
        <img src={logo} className="BusTimesLogo" alt="tfl-logo" />
        <div className="BusTimes">
          <table className="BusTimesTable">
            <thead>
              <tr>
                <th>Route number</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BusTimes;
