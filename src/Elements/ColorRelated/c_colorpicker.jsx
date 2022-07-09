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

class CColorpicker extends Component {
  state = {
    color: { space: "rgb", c1: 0, c2: 0, c3: 0 },
  };

  constructor() {
    super();
    this.colorObj = new Color();
    this.ref_Canvas = React.createRef();
  }

  componentDidMount() {
    this.colorObj.setColorJSON(this.state.color);
    this.drawColorRect();
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

  render() {
    return (
      <div className="cl_row" style={{ padding: "3.5vh 2vw", border: "0.2vh solid black", margin:"auto" }}>

        <div>
          <canvas ref={this.ref_Canvas} style={{ height: "25vh", maxHeight: "15vw", width: "15vw", maxWidth: "25vh", border: "0.2vh solid black" }}></canvas>
          <input type="range" style={{ width: "15vw", maxWidth: "25vh" }} />
        </div>
        
        <div style={{marginLeft:"1vw"}}>
          <h3>Color</h3>
        
         

          
        </div>
      </div>
    );
  }
}
export default CColorpicker;
