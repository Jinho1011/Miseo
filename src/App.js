import React, { Component } from "react";
import "./App.css";
import Location from "./location";

class App extends Component {
  state = {};

  componentDidMount() {
    this.getGeolocation()
  }

  getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.getPosition(position.coords.latitude, position.coords.longitude);
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        }
      );
    }
  };

  getPosition = async (lat, lng) => {
    const FETCH_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZVEs9_xdPkB7tK1buJKkWjZo_Sqy5MbE`
    var city = await fetch(FETCH_URL)
      .then(res => res.json())
      .catch(err => console.log('TCL: App -> getPosition -> err', err))
    //8XX9+HQ 대한민국 경기도 의왕시
    city = city.plus_code.compound_code.split(' ');
    city = city[city.length-1]
		console.log('TCL: App -> getPosition -> city', city)
    return city
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
