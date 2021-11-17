//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level1_selectBox.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";

class C_SelectBox extends Component {
  constructor() {
    super();
  }

  render() {
    return <div>{React.createElement("div", { className: "cl_OpeningSelect_Div" }, [this.getElement_Img()])}</div>;
  }

  getElement_Img() {
    let imgUrl = process.env.PUBLIC_URL + "/img/Logos/CCC-LOGO.png";
    if ("img" in this.props.sBox) {
      if (this.props.sBox.img != "") imgUrl = this.props.sBox.img;
    }
    return React.createElement("img", { src: imgUrl, style: { height: "15vh", width: "15vh", borderRadius: "7.5vh", marginTop: "auto", marginBottom: "auto" } });
  }

  open() {
    if ("url" in this.props.sBox) {
      if (this.props.sBox.url[0]) {
      } else {
        window.open(this.props.sBox.url[1], "_blank");
      }
    }
  }
}
export default C_SelectBox;
