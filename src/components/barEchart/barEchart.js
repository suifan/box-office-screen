import React, { Component } from 'react';

import echarts from 'echarts';

// utils
import { max, fill } from 'lodash';
// import { bigNumber } from '../../utils'

class BarEchart extends Component {
  componentDidMount() {
    this.barChart = echarts.init(this.refs.bar);
    this._init();
  }
  componentDidUpdate() {
    if (this.props.chart.x && this.props.chart.y) {
      let maxY = max(this.props.chart.y);
      let series = [
        {
          type: 'bar',
          itemStyle: {
            normal: { borderColor: '#656E89', color: 'transparent', barBorderRadius: [20, 20, 0, 0] }
          },
          barWidth: 15,
          barGap:'-100%',
          data: fill(Array(this.props.chart.y.length), maxY + (maxY * (1/10))),
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            normal: { color: '#1892F2', barBorderRadius: [20, 20, 0, 0] }
          },
          barWidth: 15,
          data: this.props.chart.y
        }
      ];
      this.barChart.setOption({
        xAxis: {
          data: this.props.chart.x
        },
        series
      })
    }
  }
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.chart) !== JSON.stringify(nextProps)) return true
  }
  _init() {
    this.barChart.setOption({
      grid: { left: '20', right: 0 },
      xAxis: {
        type : 'category',
        data: ["1月","2月","3月","4月","5月","6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        axisLine: {
          lineStyle: {
            color: '#899ba9'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#899ba9'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          },
          formatter: function (value, index) {
            return value / 100000000 < 0 ? 0 : value / 100000000
          }
        },
        splitNumber: 4
      },
      series: []
    })
  }
  render() {
    return (
      <div className="currentYear4Month" style={{ width: this.props.width, height: this.props.height, position: 'relative' }}>
        <div className="flex" ref="bar"></div>
        <div style={{ position: 'absolute', right: '20px', top: '45px', fontSize: 12, color: '#ddd' }}>单位：亿</div>
      </div>
    );
  }
}

export default BarEchart;