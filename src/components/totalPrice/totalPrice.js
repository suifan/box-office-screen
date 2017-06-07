import React, { Component } from 'react';

// utils
import api from '../../api/api';
// import { isEmpty } from 'lodash';
import moment from 'moment';
import { bigNumber } from '../../utils';

class TotalPrice extends Component {
  constructor() {
    super();
    this.state = {
      result: {},
      date: null
    };
  }
  componentDidMount() {
    this._fetch();
    this.cycle = setInterval(this._fetch.bind(this), window.config.cycle);
    this.updateTime = setInterval(this._updateTime.bind(this), 1000);
  }
  _updateTime() {
    if (this.state.date) {
      this.setState({ date: moment(this.state.date).add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss') });
    }
  }
  _fetch() {
    api.get(window.config.url.total).then((r) => {
      this.setState({ result: r.data, date: moment(r.data.date).format('YYYY-MM-DD HH:mm:ss') });
    });
  }
  render() {
    return (
      <div className="totalPrice">
        <div className="date">
          <img src={require('../../common/images/clock.png')} alt="clock"/>
          { this.state.date }
          </div>
        { this.state.result.total && (
          <div className="total"><em>¥</em>{ bigNumber(this.state.result.total) }</div>
        ) }
      </div>
    );
  }
}

export default TotalPrice;