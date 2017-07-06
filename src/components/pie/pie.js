import React, { Component } from 'react';

import echarts from 'echarts';

import { map } from 'lodash';

class Pie extends Component {
  constructor() {
    super();
    this.state = {
      current: 0
    }
  }
  componentDidMount(prevProps) {
    this.pieChart = echarts.init(this.refs.pie);
    this._init();
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.series) === JSON.stringify(prevProps.series)) return;
    let option = this.pieChart.getOption();
    option.series[0].data = this.props.series;
    this.pieChart.setOption({ series: option.series });
    // 轮播切换
    this._slide();
    this.slide && clearInterval(this.slide)
    this.slide = setInterval(this._slide.bind(this), window.config.pieToggleTime);
  }
  // 销毁后，注销掉 setInterval
  _slide(name) {
    let option = this.pieChart.getOption();
    option.series[0].data = map(option.series[0].data, (o, index) => {
      if (index === this.state.current) {
        // o.label.normal.show = true;
        option.series[1].data = [{ value: 0, name: o.name }];
        o.selected = true;
      } else {
        // o.label.normal.show = false;
        o.selected = false;
      }
      return o
    });
    this.pieChart.setOption({ series: option.series })
    this.setState({ current: this.state.current === 9 ? 0 : ++this.state.current });
  }
  _init() {
    this.pieChart.setOption({
      series: [{
        name: '源数据',
        type:'pie',
        radius: ['0%', '80%'],
        avoidLabelOverlap: false,
        selectedOffset: 15,
        labelLine: {
          normal: {
            show: false
          }
        },
        silent: true
      }, {
        type: 'pie',
        radius : '45%',
        label: {
          normal: {
            show: true,
            position: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 13
            }
          }
        },
        itemStyle: {
          normal: {
            color: 'RGBA(6, 24, 49, 1.00)'
          }
        },
        data: [{ value: 0 }],
        animation: false,
        silent: true
      }]
    })
  }
  render() {
    return (
      <div className="pie">
        <div ref="pie" className="pieChart flex"></div>
      </div>
    );
  }
}

export default Pie;