import React, { Component } from "react";
import "./App.css";
import Location from "./location";
import { disconnect } from "cluster";

const KAKAO_API_KEY = "KakaoAK c981c546d4e1806ac95ac294b40fc615";

class App extends Component {
  state = {};

  componentDidMount() {
    this.getDistrict();
  }

  getDistrict = () => {
    navigator.geolocation.getCurrentPosition(position => {
      var coords = position.coords;
      const API_URL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coords.longitude}&y=${coords.latitude}`;
      fetch(API_URL, {
        headers: {
          Authorization: KAKAO_API_KEY
        }
      })
        .then(res => res.json())
        .then(res => {
          var tmp = res.documents[0].address_name
        });
    });
  };

  render() {
    return (
      <div>
        <Location />
      </div>
    );
  }
}

export default App;
