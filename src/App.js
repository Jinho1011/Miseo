import React, { Component } from "react";

import "./App.css";
import Location from "./location";

const KAKAO_API_KEY = "KakaoAK c981c546d4e1806ac95ac294b40fc615";
const AIRKOREA_API_KEY =
  "Nc7DTt1ImQ%2F8JdDmOz0qZQYcbstlIitpt9a6btKCSY1vud%2FvhzZ%2BM2QR4uWjW58IFJ8JWzJ7w9osVarTAn1iSg%3D%3D";

class App extends Component {
  state = {};

  componentDidMount() {
    this.getDistrict();
  }

  getDistrict = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      const district = this.callDistrcitApi(coords);
      Promise.resolve(district)
        .then(res => res)
        .then(res => {
          this.setState({
            district: res
          })
          res = res.split(" ");
          var dong = res[res.length - 1];
          // Getting 동 이름 done
          this.callGetTmCoodApi(dong);
        });
    });
  };

  callGetTmCoodApi = dong => {
    const API_URL = `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getTMStdrCrdnt?ServiceKey=${AIRKOREA_API_KEY}&numOfRows=1&PageNo=1&umdName=${dong}`;
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

    console.log("TCL: App -> callGetTmCoodApi -> API_URL", API_URL);

    fetch(PROXY_URL + API_URL)
      .then(res => res.text())
      .then(res => new DOMParser().parseFromString(res, "text/xml"))
      .then(res => {
        var coord = {}
        coord.tmX = res.getElementsByTagName("tmX")[0].innerHTML
        coord.tmY = res.getElementsByTagName("tmY")[0].innerHTML
        this.callGetMonitoringStation(coord)
      })
  };

  callGetMonitoringStation = coord => {
    const API_URL = `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?ServiceKey=${AIRKOREA_API_KEY}&tmX=${coord.tmX}&tmY=${coord.tmY}`
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

    fetch(PROXY_URL + API_URL)
      .then(res => res.text())
      .then(res => new DOMParser().parseFromString(res, "text/xml"))
      .then(res => {
        var item = res.getElementsByTagName("item")[0].getElementsByTagName("stationName")[0].innerHTML
        console.log("TCL: item", item)
        // getting monitoring station done
      })
  }

  callDistrcitApi = coords => {
    const API_URL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${
      coords.longitude
      }&y=${coords.latitude}`;
    return fetch(API_URL, {
      headers: {
        Authorization: KAKAO_API_KEY
      }
    })
      .then(res => res.json())
      .then(obj => obj.documents[0].address_name);
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
