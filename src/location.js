import React from "react";
import "./location.css";
import "./bulma.css";

function Location() {
  return (
    <div className="container location-container">
      <div className="title-section">
        <img src="/images/logo.svg" alt="" />
      </div>
      <div className="main-section">
        <div className="main-wrapper">
          <div className="waiting-img">
            <img src="/images/pluto-coming-soon.png" alt="" />
          </div>
          <div className="waiting-title title">
            미세먼지 정보를 가져오고 있습니다!
        </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
