import React, { Component } from 'react';

// utils
import { map, cloneDeep } from 'lodash';
// import api  from '../../api/api';
// import { bigNumber, ratioNumber } from '../../utils'

// import components
import echarts from 'echarts';

// import base componetns
import china from '../../common/js/china';

// option
import { MovieColors } from './options';


class Map extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
  }
  componentDidMount() {
    echarts.registerMap('chinas', china);

    this.mapChart = echarts.init(this.refs.map);
    this._init();
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.series) === JSON.stringify(prevProps.series)) return;

    let result = cloneDeep(this.props.series);

    let series = [
      {// 位置信息
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 2,
        data: map(result , item => {
          return {
            value: item.coords[0],
            itemStyle: {
              normal: { color: MovieColors[item.serialNumber % 100] }
            }
          }
        })
      },
      {// 彩色拉带
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 2,
          symbolSize: 5,
          trailLength: .7
        },
        data: map(result, (item, index) => {
          item.lineStyle = {
            normal: {
              color: MovieColors[item.serialNumber % 100],
              width: 0,
              curveness: .2
            }
          }
          return item
        })
      },
      {// 白色框
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 2,
          symbolSize: 2,
          symbol: 'circle',
          color: '#fff'
        },
        data: map(result, item => {
          return item
        })
      }
    ];
    this.mapChart.setOption({
      series
    })
    this._drawImages();
  }
  _drawImages() {
    let images = [];
    this.props.series.forEach(item => {
      let position = this._getPosition(item.coords[0]);
      images.push({
        left: position[0],
        top: position[1],
        src: item.poster,
      })
    })
    this.setState({ images });
  }
  _getPosition(gps) {
    let n = this.mapChart.getModel().getSeriesByIndex(0)
    return n.coordinateSystem.dataToPoint(gps)
  }
  _init() {
    this.mapChart.setOption({
      geo: {
        map: 'chinas',
        zlevel: 100,
        itemStyle: {
          normal: {
            areaColor: 'RGBA(24, 146, 242, .5)',
            borderColor: '#fff'
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: { color: 'RGBA(255, 255, 255, .7)' }
          }
        }
      }
    })
  }
  render() {
    return (
      <div className="map">
        <div ref="map" className="flex" style={{ height: '100%' }}></div>
        { this.state.images && (
          <div className="images">
            { this.state.images.map((item, index) => (
              <img className="poster" style={{ top: `${item.top - 35 + 'px'}`, left: `${item.left - 25 + 'px'}`, animationDelay: Math.random() + 's' }} width={50} height={70} src={ item.src } key={ index } alt="draw"/>
            )) }
          </div>
        ) }
      </div>
    );
  }
}

export default Map;