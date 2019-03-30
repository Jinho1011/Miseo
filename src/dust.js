import React from "react";
import "./dust.css";
import "./bulma.css";

function Dust({ pm10Value, pm25Value, pm10Value24, pm25Value24, o3Value, district }) {
  return (
    <div className="container dust-container">
      <div className="title-section">
        <img src="/images/logo.svg" alt="" />
      </div>
      <div className="main-section">
        <div className="main-wrapper">
          현재 {district} 미세먼지는..
          <div className="dust-list">
            <ul>
              <li>
                pm10 지수 :  {pm10Value}
              </li>
              <li>
                pm25 지수 : {pm25Value}
              </li>
              <li>
                pm10 지수 (24시간 기준) : {pm10Value24}
              </li>
              <li>
                pm25 지수 (24시간 기준) : {pm25Value24}
              </li>
              <li>
                오존 지수 : {o3Value}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dust;
