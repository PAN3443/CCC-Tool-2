//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_colorpicker.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
// Shows the selected CMS or the Filter Settings
//////////////////////////////////////////////

// React
import React, { Component } from "react";
// Lib
import { Color } from "ccctool-lib/lib/color/class_Color";
import CRadioCluser from "../Basic/c_radioCluster";
import CMoveableBox from "../PopUps/c_moveableBox";

class CColorpicker extends Component {
  state = {
    colorspaces: ["RGB", "HSV"],// "lab", "DIN99"],
    variations: [],
    color: { space: "rgb", c1: 0, c2: 0, c3: 0 },
  };

  constructor() {
    super();
    this.colorObj = new Color();
    this.ref_Canvas = React.createRef();
    this.ref_ColorspaceRadioButtons = React.createRef();
    this.ref_VariationsRadioButtons = React.createRef();
  }

  componentDidMount() {
    this.colorObj.setColorJSON(this.state.color);
    this.setState({ variations: this.getVariations(0) });
  }

  componentDidUpdate() {
    // Check if Sliderchanged
    this.drawColorRect();
  }

  drawColorRect() {
    const canvas = this.ref_Canvas.current;
    if (canvas !== null) {
      /*let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        //const imgData = this.props.selectedCMS.drawCMS(canvas.width, canvas.height, false, false, 1.0);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imgData, 0, 0);*/
    }
  }

  getVariations = (_colorspaceIndex) => {
    switch(this.state.colorspaces[_colorspaceIndex]){
      case 'RGB':
        return ["R_GB","G_RB","B_RG"];
      case 'HSV':
        return ["H_SV","S_HV","V_HS"];
      default:
        return [];
    }
  }

  setColorspace = (_colorspaceIndex) => {
    console.log(this.getVariations(_colorspaceIndex));
    this.setState({ variations: this.getVariations(_colorspaceIndex) });
  }

  setVariation(_colorvariation) {
    //alert(_colorvariation);
  }

  render() {
    return (
      <div style={{display: "flex", zIndex:"99", cursor: "not-allowed", width: "100%",
      height: "100%",
      position: "fixed",
      top: "0px",
      left: "0px",
      bottom: "0px",
      zIndex: "99"}}>
      <CMoveableBox header="Colorpicker">
        <div className="cl_row" style={{ padding: "3.5vh 2vw", margin: "auto", cursor:"default" }}>
          <div>
            <canvas ref={this.ref_Canvas} style={{ height: "25vh", maxHeight: "15vw", width: "15vw", maxWidth: "25vh", border: "var(--border-width) solid var(--borderColor-brightBG)" }}></canvas>
            <input type="range" style={{ width: "15vw", maxWidth: "25vh" }} />
          </div>

          <div style={{ marginLeft: "1vw" }}>
            <h3>Space</h3>
            <CRadioCluser ref={this.ref_ColorspaceRadioButtons} elements={this.state.colorspaces} handleActivation={this.setColorspace}></CRadioCluser>
            <h3>Variations</h3>
            <CRadioCluser ref={this.ref_VariationsRadioButtons} elements={this.state.variations} handleActivation={this.setVariation}></CRadioCluser>
          </div>
        </div>
      </CMoveableBox>
      </div>
      
    );
  }
}
export default CColorpicker;
