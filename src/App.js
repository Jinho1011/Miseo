import React, { Component } from "react";
import "./App.css";
import Location from "./location";
import Dust from "./dust";

const KAKAO_API_KEY = "KakaoAK c981c546d4e1806ac95ac294b40fc615";
const AIRKOREA_API_KEY =
  "Nc7DTt1ImQ%2F8JdDmOz0qZQYcbstlIitpt9a6btKCSY1vud%2FvhzZ%2BM2QR4uWjW58IFJ8JWzJ7w9osVarTAn1iSg%3D%3D";

class App extends Component {
  state = {
    serviceReady: 0
  };

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
          });
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

    fetch(PROXY_URL + API_URL)
      .then(res => res.text())
      .then(res => new DOMParser().parseFromString(res, "text/xml"))
      .then(res => {
        var coord = {};
        coord.tmX = res.getElementsByTagName("tmX")[0].innerHTML;
        coord.tmY = res.getElementsByTagName("tmY")[0].innerHTML;
        this.callGetMonitoringStation(coord);
      });
  };

  callGetMonitoringStation = coord => {
    const API_URL = `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?ServiceKey=${AIRKOREA_API_KEY}&tmX=${
      coord.tmX
      }&tmY=${coord.tmY}`;
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

    fetch(PROXY_URL + API_URL)
      .then(res => res.text())
      .then(res => new DOMParser().parseFromString(res, "text/xml"))
      .then(res => {
        var item = res
          .getElementsByTagName("item")[0]
          .getElementsByTagName("stationName")[0].innerHTML;
        // getting monitoring station done
        this.getDustInformation(item);
      });
  };

  getDustInformation = station => {
    const API_URL = `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${AIRKOREA_API_KEY}&numOfRows=10&pageNo=1&stationName=${station}&dataTerm=DAILY&ver=1.3`;
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

    fetch(PROXY_URL + API_URL)
      .then(res => res.text())
      .then(res => new DOMParser().parseFromString(res, "text/xml"))
      .then(res => {
        return res.getElementsByTagName("item")[0];
      })
      .then(res => {
        var pm10Value = res.getElementsByTagName("pm10Value")[0].innerHTML;
        console.log("TCL: pm10Value", pm10Value);
        var pm25Value = res.getElementsByTagName("pm25Value")[0].innerHTML;
        console.log("TCL: pm25Value", pm25Value);
        var pm10Value24 = res.getElementsByTagName("pm10Value24")[0].innerHTML;
        console.log("TCL: pm10Value24", pm10Value24);
        var pm25Value24 = res.getElementsByTagName("pm25Value24")[0].innerHTML;
        console.log("TCL: pm25Value24", pm25Value24);
        var o3Value = res.getElementsByTagName("o3Value")[0].innerHTML;
        console.log("TCL: o3Value", o3Value);

        // GETTING DUST INFORMATION DONE

        this.setState({
          serviceReady: 1,
          dust: {
            pm10Value: pm10Value,
            pm25Value: pm25Value,
            pm10Value24: pm10Value24,
            pm25Value24: pm25Value24,
            o3Value: o3Value
          }
        });
      });
  };

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

  renderDust = () => {
    const dust = <Dust
      pm10Value={this.state.dust.pm10Value}
      pm25Value={this.state.dust.pm25Value}
      pm10Value24={this.state.dust.pm10Value24}
      pm25Value24={this.state.dust.pm25Value24}
      o3Value={this.state.dust.o3Value}
      district={this.state.district}
    />
    return dust
  }

  renderLocation = () => {
    const location = <Location/>
    return location
  }

  render() {
    var isDustDone = this.state.serviceReady;
    return (
      <div className={isDustDone ? "dust" : "location"}>
        {isDustDone ? this.renderDust() : this.renderLocation()}
      </div>
    );
  }
}

export default App;
