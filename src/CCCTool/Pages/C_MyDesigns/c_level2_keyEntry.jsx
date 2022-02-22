//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level1_cmsGroup.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

import React, { Component } from "react";
import "./myDesigns.css";

import F_KeyRendering from "../../F_Elements/f_keyRendering";

class C_KeyEntry extends Component {
  constructor() {
    super();
  }

  keyRender() {
    let keyInput = [];
    let backgroundColor = "none";

    switch (this.props.cmsKey.getType()) {
      case "nil":
        keyInput.push(this.getNilKeySVG(false, false));
        break;
      case "right":
        backgroundColor = this.props.cmsKey.getCR().getRGBString(false);
        keyInput.push(this.getNilKeySVG(true, false));
        break;
      case "left":
        backgroundColor = this.props.cmsKey.getCL().getRGBString(false);
        keyInput.push(this.getNilKeySVG(true, true));
        break;
      case "twin":
        backgroundColor = this.props.cmsKey.getCR().getRGBString(false);
        let topColor = "none";
        if (!this.props.cmsKey.getMoT()) {
          topColor = this.props.cmsKey.getCL().getRGBString(false);
        }
        //topDiv
        keyInput.push(React.createElement("div", { style: { height: "40%", width: "100%", borderBottom: "var(--border-width) solid var(--borderColor-brightBG)", background: topColor } }));
        //leftDiv
        keyInput.push(React.createElement("div", { style: { height: "60%", width: "50%", borderRight: "var(--border-width) solid var(--borderColor-brightBG)", background: this.props.cmsKey.getCL().getRGBString(false) } }));
        break;
      case "dual":
        backgroundColor = this.props.cmsKey.getCL().getRGBString(false);
        break;
    }

    return React.createElement(
      "div",
      { style: { margin: "auto 1vw", height: "3vh", width: "3vh", border: "var(--border-width) solid var(--borderColor-brightBG)", borderRadius: "var(--border-radius)", overflow: "hidden", background: backgroundColor } },
      keyInput
    );
  }

  getNilKeySVG(doHalf, doMarginLeft) {
    let style = { background: "var(--bg-bright)", stroke: "var(--font-color-brightBG)", width: "100%", margin: "0vh 0vw 0vh 0vw", borderLeft: "none", borderRight: "none", height: "100%" };
    if (doHalf) {
      style.width = "50%";
      if (doMarginLeft) {
        style.margin = "0vh 0vw 0vh auto";
        style.borderLeft = "var(--border-width) solid var(--font-color-brightBG)";
      } else {
        style.margin = "0vh auto 0vh 0vw";
        style.borderRight = "var(--border-width) solid var(--font-color-brightBG)";
      }
    }

    return React.createElement(
      "svg",
      {
        width: 20,
        height: 20,
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg",
        preserveAspectRatio: "xMidYMid meet",
        style: style,
      },
      React.createElement("line", {
        x1: "0",
        y1: "20",
        x2: "20",
        y2: "0",
      })
    );
  }

  render() {
    return (
      <div className="cl_row" style={{ width: "100%", minHeight: "3vh", margin: "1vh auto", overflow: "hidden" }}>
        <p title={this.props.cmsKey.getRef()} style={{ margin: "auto 0vw", marginLeft: "1vw", width: "40%", overflow: "hidden" }}>
          {this.props.cmsKey.getRef()}
        </p>

        <F_KeyRendering cmsKey={this.props.cmsKey} />

        <p title={this.props.cmsKey.getType()} style={{ margin: "auto 0vw", width: "20%", overflow: "hidden" }}>
          {this.props.cmsKey.getType()}
        </p>
      </div>
    );
  }
}

export default C_KeyEntry;

//{this.keyRender()}