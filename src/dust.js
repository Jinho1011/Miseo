import React from "react";
import { FacebookProvider, Share } from 'react-facebook';
import "./dust.css";
import "./bulma.css";

function Dust({
  pm10Value,
  pm25Value,
  pm10Value24,
  pm25Value24,
  o3Value,
  district
}) {
  return (
    <div className="container dust-container">
      <div className="title-section">
        <img src="/images/logo.svg" alt="" />
      </div>
      <div className="main-section">
        <div className="main-wrapper">
          <div className="dust-title">
            현재 <span className="dust-titls-district">{district}</span> 미세먼지는..
            <DustInfo pm10Value={pm10Value} pm25Value={pm25Value} />
          </div>
        </div>
        <div className="main-wrapper">
          <div className="dust-info-list-wrapper">
            <div className="dust-info-list-title">상세 정보</div>
            <div className="dust-info-list">
              <ul className="dust-info-ul">
                <li>- pm10Value : {pm10Value}</li>
                <li>- pm25Value : {pm25Value}</li>
                <li>- pm10Value24 : {pm10Value24}</li>
                <li>- pm25Value24 : {pm25Value24}</li>
                <li>- o3Value : {o3Value}</li>
              </ul>
            </div>
            <FacebookProvider appId="1106858336104667">
              <Share href="http://www.facebook.com">
                {({ handleClick }) => (
                  <button className="facebook-share-btn" type="button" onClick={handleClick}>Share to Facebook</button>
                )}
              </Share>
            </FacebookProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

function DustInfo({ pm10Value, pm25Value }) {
  var sum = Number(pm10Value) + Number(pm25Value);
  console.log("TCL: DustInfo -> sum", sum);
  if (sum > 225) {
    return <p className="dust-info-4">매우 나쁨</p>;
  } else if (sum > 115) {
    return <p className="dust-info-3">나쁨</p>;
  } else if (sum > 35) {
    return <p className="dust-info-2">보통</p>;
  } else {
    return <p className="dust-info-1">좋음</p>;
  }
}

export default Dust;
