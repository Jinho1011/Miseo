import React, { Component } from "react";
import "./App.css";
import Location from "./location";

const KAKAO_API_KEY = "KakaoAK c981c546d4e1806ac95ac294b40fc615";

class App extends Component {
  state = {};

  componentDidMount() {
    this.getDistrict();
  }

  getDistrict = () => {
    var district
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      const district = this.callDistrcitApi(coords)
      Promise.resolve(district)
        .then(res => res)
        .then(res => {
          res = res.split(' ')
          var dong = res[res.length-1]
          // Getting 동 이름 done
        })
    });
  };

  callDistrcitApi = (coords) => {
    const API_URL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coords.longitude}&y=${coords.latitude}`;
    return fetch(API_URL, {
      headers: {
        "Authorization": KAKAO_API_KEY
      }
    })
      .then(res => res.json())
      .then(obj => obj.documents[0].address_name)
  }

  render() {
    return (
      <div>
        <Location />
      </div>
    );
  }
}

export default App;
