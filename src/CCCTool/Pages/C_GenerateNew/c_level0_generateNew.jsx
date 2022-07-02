//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level0_new.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

import React, { Component } from "react";
import CHeader from "../../../Elements/c_header";

class C_GenerateNew extends Component {

  render() {
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <img
            onClick={() => this.props.handleGo2Page("/about")}
            src={process.env.PUBLIC_URL + "/img/Logos/CCC-LOGO.png"}
            alt="CCC-Tool Logo"
            style={{ pointerEvents: "auto", height: "20vh", margin: "auto", marginRight: "5vw", cursor: "pointer" }}
          ></img>
          <h1
            style={{
              maxHeight: "25vh",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            Add New CMS
          </h1>
        </CHeader>
        <div style={{ height: "75vh", width: "100vw" }}>
          <button onClick={this.props.test()}>Hello</button>
        </div>
      </div>
    );
  }
}
export default C_GenerateNew;
