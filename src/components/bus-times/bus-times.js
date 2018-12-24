import React, { Component } from 'react';
import logo from '../../assets/tfl-logo.png';
import './bus-times.css';
import moment from 'moment';

class BusTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app_id: process.env.REACT_APP_TRANSPORT_APP_ID,
      app_key: process.env.REACT_APP_TRANSPORT_API_KEY,
      isCheckingPeriod: this.isCheckingPeriod(),
      config: this.getBusStopConfig(),
      isLoaded: false,
      error: false,
      lastUpdated: this.getLastUpdatedTime(),
      busStops: [],
      busTimes: []
    };
  }

  getBusStopConfig() {
    return JSON.parse(process.env.REACT_APP_BUS_STOP_DATA);
  }

  isCheckingPeriod() {
    return moment() < moment("9:00 PM", 'HH:mm A') && moment() > moment("6:00 AM", 'HH:mm A');
  }

  getBusTimes(busStopId) {
    const { app_id, app_key, busTimes, isCheckingPeriod } = this.state;

    if (busTimes[busStopId] || !isCheckingPeriod) return;

    busTimes[busStopId] = { departures: [] };

    fetch(`https://transportapi.com/v3/uk/bus/stop/${busStopId}/live.json?app_id=${app_id}&app_key=${app_key}&group=route&nextbuses=yes`)
      .then(res => res.json())
      .then(
        (result) => {
          var departures = result.departures;
          Object.keys(departures).forEach(key => {
            var routeTimes = {
              route: key,
              times: []
            };
      
            for (var i = 0; i < departures[key].length; i++) {
              var _time = {
                direction: departures[key][i]["direction"],
                date: departures[key][i]["expected_departure_date"],
                time: departures[key][i]["expected_departure_time"]
              };
              routeTimes.times.push(_time);
            }
            
            busTimes[busStopId].departures.push(routeTimes);
      
            this.setState({ busTimes: busTimes });
          });      
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }


  getLastUpdatedTime() {
    return moment().format('h:mm A');
  }

  componentDidMount() {
    const { config } = this.state;
    config.map(stop => {
      this.getBusTimes(stop.id);
    })
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded, error, isCheckingPeriod } = this.state;

    if (!isCheckingPeriod) {
      return <div>Bus times checking turned off from 9pm til 6am.</div>;
    }
    else if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Bus times loading...</div>;
    } else {
      const { lastUpdated, busTimes, config } = this.state;
      return (
        <div className="BusTimesWrapper">
          <img src={logo} className="BusTimesLogo" alt="tfl-logo" />
          <div className="BusTimes">
            { config.map(stop => (
              <div className="BusStopSection" key={stop.id}>
                <h3>{stop.title}</h3>
                <table>
                  <tbody>
                    { (busTimes[stop.id] && busTimes[stop.id].departures ? busTimes[stop.id].departures : [] ).map( 
                      departure => (
                        <tr key={`departure-${Math.random()}`}>
                          <td><h2>{departure.route}</h2></td>
                          <td>
                            <ul>
                              {departure.times.map(
                                dateTime => (
                                  <li key={`time-${Math.random()}`}>
                                    <strong>{moment(`${dateTime.date} ${dateTime.time}`).fromNow()} </strong> 
                                    - <small className="BusTimesDirection">{dateTime.direction}</small>
                                  </li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                      )
                    )}
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
