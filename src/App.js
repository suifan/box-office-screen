import React, { Component } from 'react';

// 组件模块
import CurrentYear from './components/currentYear/currentYear';
import CinemaRank from './components/cinemaRank/cinemaRank';
import MovieRank from './components/movieRank/movieRank';
import YueyinghuiRank from './components/yueyinghuiRank/yueyinghuiRank';
import BoxOfficeMap from './components/boxOfficeMap/boxOfficeMap';
import BoxOfficePie from './components/boxOfficePie/boxOfficePie';
import PlaybillPie from './components/playbillPie/playbillPie';
import TotalPrice from './components/totalPrice/totalPrice';

class App extends Component {
  constructor() {
    super();
    this.state = {
      load: false
    }
  }
  componentDidMount() {
    // 首次渲染
    this._setScale();

    // 监听浏览器窗口
    window.addEventListener('resize', () => this._setScale())

    // onload
    window.onload = () => {
      this.setState({ load: true });
    }
  }
  _setScale() {
    let ratio = window.innerWidth / 1920
    document.body.setAttribute('style', `width: 1920px; height: 1080px; transform: scale(${ratio}); transform-origin: left top 0px;`)
  }
  render() {
    if (!this.state.load) {
      require('loaders.css');
      return (
        <div className="flex welcomePage">
          <div className="ball-scale">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="text">大地院线运营监控中心</div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="h1"><span>运营监控中心</span></div>
        <TotalPrice/>
        <BoxOfficeMap/>
        <CurrentYear/>
        <CinemaRank/>
        <MovieRank/>
        <YueyinghuiRank/>
        <BoxOfficePie/>
        <PlaybillPie/>
      </div>
    );
  }
}

export default App;
