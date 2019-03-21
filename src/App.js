import React, { Component } from "react";
import "./App.css";
import Location from "./location";

class App extends Component {
  state = {};

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.getTMcoord(position)
    });
  }

  getTMcoord = async (position) => {
    const coord = await position
    const lat = coord.coords.latitude
    const lng = coord.coords.longitude

    var API_URL = `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lat}&y=${lng}&input_coord=WTM&output_coord=TM`
    console.log('TCL: App -> getTMcoord -> API_URL', API_URL)
    var API_KEY = 'KakaoAK c981c546d4e1806ac95ac294b40fc615'
    var res = fetch(API_URL, {
      "headers": {
        'Authorization': API_KEY
      }
    })
      .then(res => res.json())
      .then(res => res.documents[0])

    res = Promise.resolve(res)
    .then(res => {
      
    })

  };

  render() {
    // const { dust } = this.state;
    return (
      // <div className={dust ? "App" : "App--loading"}>
      //   {dust ? this.renderDust() : <Location />}
      // </div>
      <div>
        <Location />
      </div>
    );
  }
}

export default App;
