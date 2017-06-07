import React, { Component } from 'react';

// utils
// import { isEmpty } from 'lodash';
import api  from '../../api/api';

// import base componetns
import Map from '../map/map';

// const
const endCity = { name: '北京', position: [116.4551,40.2539] };

class BoxOfficeMap extends Component {
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
    api.get(window.config.url.boxOfficeMap).then((r) => {
      let result = [];
      // this.setState({ result: r.data });
      r.data.forEach(item => {
        result.push({
          fromName: item.cityName,
          toName: endCity.name,
          coords: [
            [ item.gpsLongitude, item.gpsLatitude ],
            endCity.position
          ],
          serialNumber: item.movieSerialNumber,
          poster: item.poster
        })
      })
      this.setState({ result });
    });
  }
  render() {
    return (
      <div className="boxOfficeMap">
        <Map series={this.state.result}/>
      </div>
    );
  }
}

export default BoxOfficeMap;