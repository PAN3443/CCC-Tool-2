import React, { Component } from "react";
import CHeader from "../../../Elements/c_header";
import FNavigateButton from "../../../Elements/Functionality/f_navigateButton";

class C_GenerateNew extends Component {
  render() {
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <FNavigateButton navURL="/" style={{ margin: "auto", marginRight: "5vw" }}>
            <img src={"/CCC-Tool-2/img/Logos/CCC-LOGO.png"} alt="CCC-Tool Logo" style={{ height: "20vh" }}></img>
          </FNavigateButton>
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
      </div>
    );
  }
}
export default C_GenerateNew;
