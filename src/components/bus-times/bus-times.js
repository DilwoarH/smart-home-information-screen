import React, { Component } from 'react';
import './bus-times.css';
import moment from 'moment';
import 'whatwg-fetch'; 

class BusTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: this.getBusStopConfig(),
      isLoaded: false,
      isUpdating: false,
      error: false,
      lastUpdated: this.getLastUpdatedTime(),
      busStops: [],
      busTimes: []
    };
  }

  getBusStopConfig() {
    return JSON.parse(process.env.REACT_APP_BUS_STOP_DATA);
  }

  getBusTimes(busStopId) {
    const { busTimes, isUpdating } = this.state;

    if (busTimes[busStopId] && !isUpdating) return;

    busTimes[busStopId] = [];

    fetch(`https://api.tfl.gov.uk/StopPoint/${busStopId}/arrivals?mode=bus`)
      .then(res => res.json())
      .then(
        (result) => {
          var busRoutes = {};
          busTimes[busStopId] = [];

          result.forEach(bus => {
            busRoutes[bus.lineId] = busRoutes[bus.lineId] ? busRoutes[bus.lineId] : {
              route: bus.lineId,
              times: []
            };
            var _time = {
              direction: bus.destinationName,
              expectedArrival: bus.expectedArrival
            };
            busRoutes[bus.lineId].times.push(_time);
            busRoutes[bus.lineId].times = busRoutes[bus.lineId].times.sort((a, b) => a.expectedArrival > b.expectedArrival);
          });      

          Object.keys(busRoutes).forEach(route => {
            busTimes[busStopId].push(busRoutes[route]);
          });

          this.setState({ busTimes: busTimes });
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

  checkBusStops() {
    this.setState({ isUpdating: true });
    const { config } = this.state;
    config.forEach(stop => {
      this.getBusTimes(stop.id);
    })
    this.setState({lastUpdated: this.getLastUpdatedTime(), isUpdating: false});
  }

  componentDidMount() {
    this.checkBusStops();
    this.interval = setInterval(() => this.checkBusStops(), 60000);
    this.setState({ isLoaded: true });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Bus times loading...</div>;
    } else {
      const { lastUpdated, busTimes, config } = this.state;
      return (
        <div className="BusTimesWrapper">
          <div className="BusTimes">
            { config.map(stop => (
              <div className="BusStopSection" key={stop.id}>
                <h3>{stop.title}</h3>
                <table className="BusTimesTable">
                  <tbody>
                    { (busTimes[stop.id] ? busTimes[stop.id] : [] ).map( 
                      departure => (
                        <tr key={`departure-${Math.random()}`}>
                          <td><h2>{departure.route}</h2></td>
                          <td>
                            <ul>
                              {departure.times.map(
                                dateTime => (
                                  <li key={`time-${Math.random()}`}>
                                    <strong>{moment(dateTime.expectedArrival).fromNow()} </strong> 
                                    - <small className="BusTimesDirection">{dateTime.direction}</small>
                                  </li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                      )
                    )}
                    { (busTimes[stop.id] && busTimes[stop.id].length === 0) &&
                      <tr>
                        <td>No buses currently scheduled for this route.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            ))}
            <small>Last updated: {lastUpdated}</small>
          </div>
        </div>
      );
    }
  }
}

export default BusTimes;
