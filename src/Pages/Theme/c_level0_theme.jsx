//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level0_theme.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";
import CHeader from "../../Elements/c_header";
import CColorpicker from "../../Elements/ColorRelated/Colorpicker/c_colorpicker";
import FNavigateButton from "../../Elements/Functionality/f_navigateButton";

class CTheme extends Component {
  state = {};
  render() {
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <div className="cl_blur cl_row cl_noMark" style={{ position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-dark-alpha-75)", zIndex: "2", top: "0px", left: "0px" }}>
            <FNavigateButton navURL="/" style={{ margin: "auto", marginRight: "5vw" }}>
              <img src={process.env.PUBLIC_URL + "/img/Logos/CCC-LOGO.png"} alt="CCC-Tool Logo" style={{ height: "20vh" }}></img>
            </FNavigateButton>
            <h1
              style={{
                maxHeight: "25vh",
                marginLeft: "0vw",
                cursor: "default",
              }}
            >
              Theme
            </h1>
          </div>
        </CHeader>
        <div className="cl_row" style={{margin:"5vh auto"}}>

              <p>Test Color Picker</p>
              <div style={{cursor:"pointer", height:"2vh", width:"2vw", border:"0.2vh solid black", marginLeft:"2vw"}}></div>

        </div>
        <CColorpicker ></CColorpicker>
      </div>
    );
  }
}

export default CTheme;
