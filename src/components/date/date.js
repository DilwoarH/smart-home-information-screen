import React, { Component } from 'react';
import moment from 'moment';
import './date.css';

class Date extends Component {
  constructor(props) {
    super(props);
    moment.locale('en');
    this.state = {
      date: this.getDate(),
      dayOfWeek: this.getDayOfTheWeek()
    };
  }

  getDate() {
    return moment().format('D MMMM YYYY');
  }

  getDayOfTheWeek() {
    return moment().format('dddd');
  }

  render() {
    return (
      <div className="DateWrapper">
        <div className="row">{this.state.dayOfWeek}, {this.state.date}</div>
      </div>
    );
  }
}

export default Date;
