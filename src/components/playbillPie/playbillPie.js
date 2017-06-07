import React, { Component } from 'react';

import Title from '../../base/title/title';

import { sumBy } from 'lodash';

import api from '../../api/api';

import Pie from '../pie/pie';

import { MovieColors } from '../map/options';

import { ratioNumber } from '../../utils';

class PlaybillPie extends Component {
  constructor() {
    super();
    this.state = {
      result: []
    }
  }
  componentDidMount() {
    this._fetch();
    this.cycle = setInterval(this._fetch.bind(this), window.config.cycle);
  }
  _fetch() {
    api.get(window.config.url.playbillProportion).then((r) => {
      let sum = sumBy(r.data, item => {
        return item.session
      })
      this.setState({ result: r.data.map(item => {
        return {
          name: `${item.name.substring(0, 8)}\n${ratioNumber(sum, item.session)}%`,
          // name: item.name,
          value: item.session,
          itemStyle: {
            normal: {
              color: MovieColors[item.id % 100]
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            }
          }
        }
      }) });
    });
  }
  render() {
    return (
      <div className="playbillPie">
        <Title name="排片占比"/>
        <Pie series={this.state.result}/>
      </div>
    );
  }
}

export default PlaybillPie;