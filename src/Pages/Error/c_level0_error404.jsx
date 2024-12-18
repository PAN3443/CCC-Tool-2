import React, { Component } from "react";
import CHeader from "../../Elements/c_header";

class CError404 extends Component {
  render() {
    return (
      <CHeader style={{ height: "25vh", width: "100vw" }}>
        <img src={"/CCC-Tool-2/img/Logos/CCC-LOGO.png"} alt="CCC-Tool Logo" style={{ pointerEvents: "auto", height: "20vh", margin: "auto", marginRight: "5vw", cursor: "pointer" }}></img>
        <h1
          style={{
            maxHeight: "25vh",
            marginLeft: "0vw",
            cursor: "default",
          }}
        >
          Error 404
        </h1>
      </CHeader>
    );
  }
}
export default CError404;
