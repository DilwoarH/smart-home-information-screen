import React, { Component } from 'react';
import './train-lines.css';
import moment from 'moment';
import 'whatwg-fetch'; 

class TrainLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isUpdating: false,
      error: false,
      lastUpdated: this.getLastUpdatedTime(),
      TrainLines: []
    };
  }

  checkTrainLines() {
    fetch('https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ TrainLines: result, isLoaded: true });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }

  getLastUpdatedTime() {
    return moment().format('h:mm A');
  }

  componentDidMount() {
    this.checkTrainLines();
    this.interval = setInterval(() => this.checkTrainLines(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Train line status loading...</div>;
    } else {
      const { lastUpdated, TrainLines } = this.state;
      return (
        <div className="TrainLinesWrapper">
          <h3>Train line status</h3>
          <table className="TrainLinesTable">
            <tbody>
              { TrainLines.map( line => (
                <tr key={line.id}>
                  <td>{line.name}</td>
                  <td className={"TrainLinesTable__Status--"+ line.lineStatuses[0].statusSeverity}>{line.lineStatuses[0].statusSeverityDescription}</td>
                </tr>
              )) }
            </tbody>
          </table>
          <small>Last updated: {lastUpdated}</small>
        </div>
      );
    }
  }
}

export default TrainLines;
