import React, { Component } from 'react';

import Title from '../../base/title/title';

// utils
import api from '../../api/api';
import { isEmpty } from 'lodash';
import { bigNumber } from '../../utils'

class YueyinghuiRank extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      slideY: 0
    }
  }
  componentDidMount() {
    this._fetch();
    this.cycle = setInterval(this._fetch.bind(this), window.config.cycle);
    this.slide = setInterval(this._slide.bind(this), window.config.sildeTime);
  }
  _fetch() {
    api.get(window.config.url.yueyinghui).then((r) => {
      this.setState({ result: r.data });
    });
  }
  _slide() {
    this.setState({ slideY: this.state.slideY === 0 ? 50 : 0 })
  }
  render() {
    return (
      <div className="yueyinghuiRank">
        <Title name="悦影绘票房"/>
        <div className="wrapper flex">
          <table className="table">
            <colgroup>
              <col width="10%" />
              <col width="35%" />
              <col width="17%" />
              <col width="17%" />
            </colgroup>
            <thead>
            <tr>
              <th style={{padding: 0}}>排名</th>
              <th className="text-left" style={{ paddingRight: 0 }}>影院名称</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }}>年度票房</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }}>当日票房</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }}>会员</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }}>电商</th>
            </tr>
            </thead>
          </table>
          <div className="inner flex">
            <table className="table yueyinghui">
              <colgroup>
                <col width="10%" />
                <col width="35%" />
                <col width="17%" />
                <col width="17%" />
              </colgroup>
              { !isEmpty(this.state.result) && this.state.result.map((item, index) => (
                <tbody key={index}>
                <tr>
                  <td className="text-center" style={{padding: 0}}><span className="serialNumber">{ index + 1 }</span></td>
                  <td style={{ paddingRight: 0 }}>{ item.cinemaName.substring(0, 18) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.annualBoxOffice) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.boxOffice) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.vip) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.network) }</td>
                </tr>
                <tr className="sep-row"></tr>
                </tbody>
              )) }
              { !isEmpty(this.state.result) && this.state.result.slice(0, 5).map((item, index) => (
                <tbody key={index}>
                <tr>
                  <td className="text-center" style={{padding: 0}}><span className="serialNumber">{ index + 1 }</span></td>
                  <td style={{ paddingRight: 0 }}>{ item.cinemaName.substring(0, 18) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.annualBoxOffice) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.boxOffice) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.vip) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.network) }</td>
                </tr>
                <tr className="sep-row"></tr>
                </tbody>
              )) }
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default YueyinghuiRank;