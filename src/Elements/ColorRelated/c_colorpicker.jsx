//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_colorpicker.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
// Shows a window popup/modal to pick a color
//////////////////////////////////////////////

// React
import React, { Component } from "react";
// Lib
import { Color } from "ccctool-lib/lib/color/class_Color";
import CRadioCluser from "../Basic/c_radioCluster";
import CMoveableBox from "../PopUps/c_moveableBox";

class CColorpicker extends Component {
  state = {
    colorspaces: ["RGB", "HSV"],
    variations: [],
    c1Label: "R",
    c2c3Label: "GB",
    color: { space: "rgb", c1: 0.5, c2: 0.5, c3: 0.5 },
  };


  constructor() {
    super();
    this.colorObj = new Color();
    this.ref_CanvasC1 = React.createRef();
    this.ref_CanvasC2C3 = React.createRef();
    this.ref_ColorspaceRadioButtons = React.createRef();
    this.ref_VariationsRadioButtons = React.createRef();
    this.selectedColorspaceIndex = 0;
    this.selectedVariationIndex = 0;
    this.variationIndexCombinations = [[1,2,0],[0,2,1],[0,1,2]];
  }

  componentDidMount() {
    this.setState({ variations: this.getVariations() });
    this.drawColorRectC1();
    this.drawColorRectC2C3();
  }

  getVariations = () => {
    let newVariations = [];
    for(let i=0; i<this.variationIndexCombinations.length;++i){
      let variation = this.state.colorspaces[this.selectedColorspaceIndex][this.variationIndexCombinations[i][2]] + "_" +
      this.state.colorspaces[this.selectedColorspaceIndex][this.variationIndexCombinations[i][0]] +
      this.state.colorspaces[this.selectedColorspaceIndex][this.variationIndexCombinations[i][1]];
      newVariations.push(variation);
    }
    return newVariations; 
  };

  setColor = (_colorJson) => {
    this.setState({ color: _colorJson });
  };

  setColorspace = (_colorspaceIndex) => {
    this.selectedColorspaceIndex = _colorspaceIndex;
    this.setState({ variations: this.getVariations(_colorspaceIndex) });
    this.setVariation(this.selectedVariationIndex);
  };

  setVariation = (_colorvariation) => {
    this.selectedVariationIndex = _colorvariation;
    this.setState({c1Label: this.state.variations[_colorvariation].substring(0,1),
    c2c3Label: this.state.variations[_colorvariation].substring(2,4)});
    this.drawColorRectC1();
    this.drawColorRectC2C3();
  }

  drawColorRectC1() {
    const canvas = this.ref_CanvasC1.current;
    
    if (canvas !== null) {
      let rect = canvas.getBoundingClientRect();
      canvas.width = 1;
      canvas.height = rect.height;
      //const imgData = this.props.selectedCMS.drawCMS(canvas.width, canvas.height, false, false, 1.0);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let workColorJson =  JSON.parse(JSON.stringify(this.state.color));
      workColorJson.space= this.state.colorspaces[this.selectedColorspaceIndex];
      let yColorComponent = "c"+(this.variationIndexCombinations[this.selectedVariationIndex][2]+1);
      let resultColorJson = { space: "rgb", c1: 0.5, c2: 0.5, c3: 0.5 };
      this.colorObj.setColorJSON(workColorJson);
      if(workColorJson[yColorComponent]!== undefined){
          for (var y = 0; y < canvas.height; y++) {
            var yVal = 1 - y / canvas.height;
            workColorJson[yColorComponent]=yVal;
            this.colorObj.setColorJSON(workColorJson);
            resultColorJson = this.colorObj.getColorJSON("rgb");
            var index =  y * 4;
            imgData.data[index + 0] = Math.round(resultColorJson.c1 * 255); // r
            imgData.data[index + 1] = Math.round(resultColorJson.c2 * 255); // g
            imgData.data[index + 2] = Math.round(resultColorJson.c3 * 255); // b
            imgData.data[index + 3] = 255; //a
          }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }

  drawColorRectC2C3() {
    const canvas = this.ref_CanvasC2C3.current;
    if (canvas !== null) {
      let rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      //const imgData = this.props.selectedCMS.drawCMS(canvas.width, canvas.height, false, false, 1.0);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let workColorJson =  JSON.parse(JSON.stringify(this.state.color));
      workColorJson.space= this.state.colorspaces[this.selectedColorspaceIndex];
      let xColorComponent = "c"+(this.variationIndexCombinations[this.selectedVariationIndex][0]+1);
      let yColorComponent = "c"+(this.variationIndexCombinations[this.selectedVariationIndex][1]+1);
      let resultColorJson = { space: "rgb", c1: 0.5, c2: 0.5, c3: 0.5 };
      this.colorObj.setColorJSON(workColorJson);
      
      if(workColorJson[xColorComponent]!== undefined && workColorJson[yColorComponent]!== undefined){
        for (var x = 0; x < canvas.width; x++) {
          var xVal = x / canvas.width;
          workColorJson[xColorComponent]=xVal;
          for (var y = 0; y < canvas.height; y++) {
            var yVal = 1 - y / canvas.height;
            workColorJson[yColorComponent]=yVal;
            this.colorObj.setColorJSON(workColorJson);
            resultColorJson = this.colorObj.getColorJSON("rgb");

            var index = (x + y * canvas.width) * 4;
            imgData.data[index + 0] = Math.round(resultColorJson.c1 * 255); // r
            imgData.data[index + 1] = Math.round(resultColorJson.c2 * 255); // g
            imgData.data[index + 2] = Math.round(resultColorJson.c3 * 255); // b
            imgData.data[index + 3] = 255; //a
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }

  render() {
    return (
      <div style={{ display: "flex", zIndex: "99", cursor: "not-allowed", width: "100%", height: "100%", position: "fixed", top: "0px", left: "0px", bottom: "0px", zIndex: "99" }}>
        <CMoveableBox header="Colorpicker">
          <div className="cl_row" style={{ padding: "2vh 1vw", margin: "auto", cursor: "default" }}>
            <div style={{ marginRight: "0.5vw" }}>
              <h4 style={{ textAlign: "center" }}>{this.state.c1Label}</h4>
              <canvas ref={this.ref_CanvasC1} style={{ height: "25vh", maxHeight: "15vw", width: "2vw", border: "var(--border-width) solid var(--borderColor-brightBG)", cursor: "pointer" }}></canvas>
            </div>

            <div>
              <h4 style={{ textAlign: "center" }}>{this.state.c2c3Label}</h4>
              <canvas ref={this.ref_CanvasC2C3} style={{ height: "25vh", maxHeight: "15vw", width: "15vw", maxWidth: "25vh", border: "var(--border-width) solid var(--borderColor-brightBG)", cursor: "pointer" }}></canvas>
            </div>

            <div style={{ marginLeft: "1vw" }}>
              <h4>Space</h4>
              <CRadioCluser ref={this.ref_ColorspaceRadioButtons} elements={this.state.colorspaces} handleActivation={this.setColorspace}></CRadioCluser>
              <h4>Variations</h4>
              <CRadioCluser ref={this.ref_VariationsRadioButtons} elements={this.state.variations} handleActivation={this.setVariation}></CRadioCluser>
            </div>
          </div>
        </CMoveableBox>
      </div>
    );
  }
}
export default CColorpicker;
