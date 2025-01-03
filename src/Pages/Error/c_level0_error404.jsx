import React, { Component } from "react";
import CHeader from "../../Elements/c_header";

import errorImage from "./errorImage.png";

class CError404 extends Component {
  render() {
    return (
      <div style={{ position: "relative", height: "100vh", width: "100vw", background: "var(--bg-app)" }}>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <img src={"/CCC-Tool-2/img/Logos/CCC-2-LOGO.png"} alt="CCC-Tool Logo" style={{ pointerEvents: "auto", height: "23vh", margin: "auto", marginRight: "2vw", cursor: "pointer" }}></img>
          <h1
            style={{
              maxHeight: "25vh",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            Page Not Found
          </h1>
        </CHeader>
        <img src={errorImage} alt="Error" style={{backgroundImage: errorImage, height: "75vh", maxHeight:"100vw", maxWidth:"75vh", width: "100vw", margin:"auto" }} />
      </div>
    );
  }
}
export default CError404;
