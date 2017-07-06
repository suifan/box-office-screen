import React, { Component } from 'react';

import Title from '../../base/title/title';

import { sumBy } from 'lodash';

import api from '../../api/api';

import Pie from '../pie/pie';

import { COLOR } from '../map/options';

import { ratioNumber } from '../../utils';

class boxOfficePie extends Component {
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
    api.get(window.config.url.boxOfficeProportion).then((r) => {
      let sum = sumBy(r.data, item => {
        return item.boxOffice
      })
      this.setState({ result: r.data.map((item, index) => {
        return {
          name: `TOP${index+1}\n\n${item.name.substring(0, 8)}\n${ratioNumber(sum, item.boxOffice)}%`,
          // name: item.name,
          value: item.boxOffice,
          itemStyle: {
            normal: {
              color: COLOR[index]
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
      <div className="boxOfficePie">
        <Title name="票房占比"/>
        <Pie series={this.state.result}/>
      </div>
    );
  }
}

export default boxOfficePie;
