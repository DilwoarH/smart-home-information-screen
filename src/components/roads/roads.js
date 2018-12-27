import React, { Component } from 'react';
import './roads.css';
import moment from 'moment';
import 'whatwg-fetch'; 

class Roads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: this.config(),
      isLoaded: false,
      error: false,
      lastUpdated: this.getLastUpdatedTime(),
      Roads: []
    };
  }

  config() {
    return process.env.REACT_APP_ROAD_DATA ? process.env.REACT_APP_ROAD_DATA : "";
  }

  checkRoads() {
    const { config } = this.state;
    if (config.length === 0) return;
    fetch(`https://api.tfl.gov.uk/road/`+config)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ 
            Roads: result, 
            isLoaded: true,
            lastUpdated: this.getLastUpdatedTime()
          });
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
    this.checkRoads();
    this.interval = setInterval(() => this.checkRoads(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isLoaded, error, Roads } = this.state;

    if (Roads.length === 0) {
      return <div>No roads configured. Please set up environment before starting.</div>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Road status loading...</div>;
    } else {
      const { lastUpdated } = this.state;
      return (
        <div className="RoadsWrapper">
          <h3>Roads status</h3>
          <table className="RoadsTable">
            <tbody>
              { (Roads ? Roads : []).map( road => (
                <tr key={road.id}>
                  <td>{road.displayName}</td>
                  <td className={"Roads__Status Roads__Status--"+ road.statusSeverity}>{road.statusSeverity}</td>
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

export default Roads;
