import React, { Component } from "react";
import CPixelAnimation from "../ParticleAnimation/c_particleAnimation";
import "../Style/CSS/filter.css";

class CHeader extends Component {

  render() {
    return (
      <div style={{ ...this.props.style, ...{ position: "relative", overflow: "hidden" } }}>
        <CPixelAnimation style={{ position: "absolute", height: "100%", width: "100%", top: "0px", left: "0px", zIndex: "0", background: "var(--bg-dark)" }} numParticles={50}></CPixelAnimation>
        <div className="cl_blur cl_row cl_noMark" style={{ pointerEvents: "none", position: "absolute", height: "100%", width: "100%", zIndex: "1", top: "0px", left: "0px", background: "var(--bg-dark-alpha-50)" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CHeader;
