import React, { Component } from 'react';

// utils
import { isEmpty } from 'lodash';
import api  from '../../api/api';
import { bigNumber, ratioNumber } from '../../utils'

// import components
import BarEchart from '../barEchart/barEchart';

// import base componetns
import Title from '../../base/title/title';

class CurrentYear extends Component {
  constructor() {
    super();
    this.state = {
      result: {}, // 票房数据
      chart: {} // 折线图
    }
  }
  componentDidMount() {
    this._fetch();
    this.cycle = setInterval(this._fetch.bind(this), window.config.cycle);

    this._fetchChart();
    this.cycleChart = setInterval(this._fetchChart.bind(this), window.config.cycle);
  }
  _fetch() {
    api.get(window.config.url.currentYear).then((r) => {
      this.setState({ result: r.data });
    });
  }
  _fetchChart() {
    api.get(window.config.url.currentYear4Month).then((r) => {
      let chart = {};
      chart.x = r.data.map((item) => {
        return `${(new Date(item.date)).getMonth() + 1}月`
      });
      chart.y = r.data.map((item) => {
        return item.boxOffice
      });
      this.setState({ chart });
    });
  }
  render() {
    return (
      <div className="currentYear">
        <Title name="年度票房"/>
        <div className="wrapper">
          { !isEmpty(this.state.result) && (
            <div className="flex">
              <div className="parent">
                <div className="name">{ this.state.result.name }<span>{ this.state.result.cinemaCount + '家' }</span></div>
                <div className="boxOffice">{ bigNumber(this.state.result.boxOffice) }</div>
              </div>
              <div className="child">
                { this.state.result.child.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="name">{ item.name }<span>{ item.cinemaCount + '家' }</span></div>
                    <div className="boxOffice">{ bigNumber(item.boxOffice) }</div>
                    <div className="proportion">{ ratioNumber(this.state.result.boxOffice, item.boxOffice) + '%' }</div>
                  </div>
                )) }
              </div>
            </div>
          ) }
        </div>
        <BarEchart width="100%" height="250px" chart={this.state.chart}/>
      </div>
    );
  }
}

export default CurrentYear;