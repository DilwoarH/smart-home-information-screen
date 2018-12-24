import React, { Component } from 'react';
import './news.css';
import moment from 'moment';
import Feed from 'rss-to-json';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: false,
      lastUpdated: this.getLastUpdatedTime(),
      news: [],
    };
  }

  checkNews() {
    Feed.load('https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/rss.xml', (error, result) => {
      if (error){
        return this.setState({
          isLoaded: true,
          error: error
        });
      }

      this.setState({
        isLoaded: true,
        news: result
      });

    });
  }

  getLastUpdatedTime() {
    return moment().format('h:mm A');
  }

  componentDidMount() {
    this.checkNews();
    this.interval = setInterval(() => this.checkNews(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <div>News articles loading...</div>;
    } else {
      const { news, lastUpdated } = this.state;
      return (
        <div className="NewsWrapper">
          <h3>Lastest news</h3>
          <table className="NewsTable">
            <tbody>
              { news.items.slice(0, 3).map( item => (
                <tr className="NewsTable__Item" key={item.url}>
                  <td>
                    <strong>{item.title}</strong> <br/>
                    <small>{item.description}</small>
                  </td>
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

export default News;
