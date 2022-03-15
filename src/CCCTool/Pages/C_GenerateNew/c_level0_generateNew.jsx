//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level0_new.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

import React, { Component } from "react";
import C_Header from "../../../Elements/c_header";

class C_GenerateNew extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <C_Header style={{ height: "25vh", width: "100vw" }}>
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
      </C_Header>
    );
  }
}
export default C_GenerateNew;
