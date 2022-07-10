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
    colorspaces: ["rgb", "hsv", "lab", "DIN99"],
    selectedColorspace: 0,
    color: { space: "rgb", c1: 0, c2: 0, c3: 0 },
  };

  constructor() {
    super();
    this.colorObj = new Color();
    this.ref_Canvas = React.createRef();
    this.ref_ColorRadioButtons = React.createRef();
  }

  componentDidMount() {
    let selectedRadioButtonIndex = this.ref_ColorRadioButtons.current.getActiveIndex();
    this.colorObj.setColorJSON(this.state.color);
    this.setState({ selectedColorspace: selectedRadioButtonIndex });
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

  setColorspace(_colorspace) {
    alert(_colorspace);
  }

  render() {
    return (
      <CMoveableBox header="Colorpicker">
        <div className="cl_row" style={{ padding: "3.5vh 2vw", margin: "auto", zIndex: "100" }}>
          <div>
            <canvas ref={this.ref_Canvas} style={{ height: "25vh", maxHeight: "15vw", width: "15vw", maxWidth: "25vh", border: "var(--border-width) solid var(--borderColor-brightBG)" }}></canvas>
            <input type="range" style={{ width: "15vw", maxWidth: "25vh" }} />
          </div>

          <div className="cl_row" style={{ marginLeft: "1vw" }}>
            <h3>Color</h3>
            <CRadioCluser ref={this.ref_ColorRadioButtons} elements={this.state.colorspaces} handleActivation={this.setColorspace}></CRadioCluser>
          </div>
        </div>
      </CMoveableBox>
    );
  }
}
export default CColorpicker;
