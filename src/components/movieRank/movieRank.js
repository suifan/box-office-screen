import React, { Component } from 'react';

import Title from '../../base/title/title';

// utils
import api from '../../api/api';
import { isEmpty } from 'lodash';
import { bigNumber } from '../../utils'

class MovieRank extends Component {
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
    api.get(window.config.url.top10Movie).then((r) => {
      this.setState({ result: r.data });
    });
  }
  _slide() {
    this.setState({ slideY: this.state.slideY === 0 ? 50 : 0 })
  }
  render() {
    return (
      <div className="movieRank">
        <Title name="影片排名"/>
        <div className="wrapper flex">
          <table className="table">
            <colgroup>
              <col width="10%" />
              <col  />
              <col width="14%" />
              <col width="14%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
            <tr>
              <th style={{padding: 0}}>排名</th>
              <th className="text-left">影片名称</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">上映天数</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">累计票房</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">票房</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">场次</th>
              <th style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">人数</th>
            </tr>
            </thead>
          </table>
          <div className="inner flex">
            <table className="table normal" style={{transform: `translateY(-${this.state.slideY}%)`}}>
              <colgroup>
                <col width="10%" />
                <col />
                <col width="14%" />
                <col width="14%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              { !isEmpty(this.state.result) && this.state.result.map((item, index) => (
                <tbody key={index}>
                <tr className={`top-${index + 1}`}>
                  <td className="text-center" style={{padding: 0}}>{ index + 1 }</td>
                  <td style={{ paddingRight: 0 }}>{ item.name.substring(0, 12) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ item.days }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.totalBoxOffice) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.boxOffice) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.session) }</td>
                  <td style={{ paddingLeft: 0, paddingRight: 0 }} className="text-center">{ bigNumber(item.headCount) }</td>
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

export default MovieRank;