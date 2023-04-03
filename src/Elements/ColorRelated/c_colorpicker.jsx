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
    colorspaces: ["RGB"], //"HSV"],
    variations: [],
    c1Label: "R",
    c2Label: "G",
    c3Label: "B",
    c1LabelVisibility: { visibility: "hidden" },
    c2c3LabelVisibility: { visibility: "hidden" },
    color: { space: "rgb", c1: 0.75, c2: 0.35, c3: 0.25 },
    mouseColorPosC1: 0,
    mouseColorPosC2: 0,
    mouseColorPosC3: 0,
  };

  constructor() {
    super();

    this.colorObj = new Color();

    this.ref_CanvasC1 = React.createRef();
    this.ref_CanvasC2C3 = React.createRef();
    this.canvasC1Rect = undefined;
    this.canvasC2C3Rect = undefined;

    this.ref_ColorspaceRadioButtons = React.createRef();
    this.ref_VariationsRadioButtons = React.createRef();

    this.ref_InputC1 = React.createRef();
    this.ref_InputC2 = React.createRef();
    this.ref_InputC3 = React.createRef();
    this.ref_InputLabelC1 = React.createRef();
    this.ref_InputLabelC2 = React.createRef();
    this.ref_InputLabelC3 = React.createRef();

    this.colorspaceConversionFactor = [[255, 255, 255]];
    this.colorspaceInputStep = [1];
    this.colorspaceInputMax = [[255, 255, 255]];
    this.colorspaceInputMin = [[0, 0, 0]];
    this.selectedColorspaceIndex = 0;
    this.selectedVariationIndex = 0;
    this.variationIndexCombinations = [
      [1, 2, 0],
      [0, 2, 1],
      [0, 1, 2],
    ];
  }

  componentDidMount() {
    this.setState({ variations: this.getVariations() });

    const canvasC1 = this.ref_CanvasC1.current;
    if (canvasC1 !== null) {
      canvasC1.addEventListener("mousemove", this.mouseMoveC1);
      canvasC1.addEventListener("mousedown", this.mouseDownC1);
      canvasC1.addEventListener("mouseenter", this.mouseEnterC1);
      canvasC1.addEventListener("mouseleave", this.mouseLeaveC1);
      this.canvasC1Rect = canvasC1.getBoundingClientRect();
    }

    const canvasC2C3 = this.ref_CanvasC2C3.current;
    if (canvasC2C3 !== null) {
      canvasC2C3.addEventListener("mousemove", this.mouseMoveC2C3);
      canvasC2C3.addEventListener("mousedown", this.mouseDownC2C3);
      canvasC2C3.addEventListener("mouseenter", this.mouseEnterC2C3);
      canvasC2C3.addEventListener("mouseleave", this.mouseLeaveC2C3);
      this.canvasC2C3Rect = canvasC2C3.getBoundingClientRect();
    }

    this.drawColorRectC1();
    this.drawColorRectC2C3();
    this.initInputFieldsWithCurrentColor();
  }

  componentDidUpdate(prevProps, prevState) {
    switch (true) {
      case prevState.color !== this.state.color:
        this.drawColorRectC1();
        this.drawColorRectC2C3();
        this.initInputFieldsWithCurrentColor();
        break;
      case prevState.c1Label !== this.state.c1Label || prevState.c2Label !== this.state.c2Label || prevState.c3Label !== this.state.c3Label:
        this.drawColorRectC1();
        this.drawColorRectC2C3();
        break;
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
              <div style={{ ...this.state.c1LabelVisibility, ...{ maxWidth: "100%", overflow: "hidden" } }}>
                <p style={{ fontSize: "var(--font-size-small)" }}>
                  {" "}
                  {this.state.c1Label}:{this.state.mouseColorPosC1}
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ textAlign: "center" }}>
                {this.state.c2Label}
                {this.state.c3Label}
              </h4>
              <canvas ref={this.ref_CanvasC2C3} style={{ height: "25vh", maxHeight: "15vw", width: "15vw", maxWidth: "25vh", border: "var(--border-width) solid var(--borderColor-brightBG)", cursor: "pointer" }}></canvas>
              <div style={{ ...this.state.c2c3LabelVisibility, ...{ maxWidth: "100%", overflow: "hidden" } }}>
                <p style={{ margin: "0px 0px 0px auto", fontSize: "var(--font-size-small)" }}>
                  {" "}
                  {this.state.c2Label}:{this.state.mouseColorPosC2}, {this.state.c3Label}:{this.state.mouseColorPosC3}
                </p>
              </div>
            </div>

            <div style={{ marginLeft: "1vw" }}>
              <h4>Space</h4>
              <CRadioCluser ref={this.ref_ColorspaceRadioButtons} elements={this.state.colorspaces} handleActivation={this.setColorspace}></CRadioCluser>

              <hr style={{ width: "100%" }} />

              <h4>Variations</h4>
              <CRadioCluser ref={this.ref_VariationsRadioButtons} elements={this.state.variations} handleActivation={this.setVariation}></CRadioCluser>

              <hr style={{ width: "100%" }} />

              <div className="cl_row" style={{ width: "100%" }}>
                <p ref={this.ref_InputLabelC1} style={{ width: "20%", margin: "auto 0vw" }}>
                  C1 :
                </p>
                <input ref={this.ref_InputC1} onChange={this.updateInputFields} type="number" style={{ width: "50%" }} min="0" max="1"></input>
              </div>
              <div className="cl_row" style={{ width: "100%" }}>
                <p ref={this.ref_InputLabelC2} style={{ width: "20%", margin: "auto 0vw" }}>
                  C2 :
                </p>
                <input ref={this.ref_InputC2} onChange={this.updateInputFields} type="number" style={{ width: "50%" }} min="0" max="1"></input>
              </div>
              <div className="cl_row" style={{ width: "100%" }}>
                <p ref={this.ref_InputLabelC3} style={{ width: "20%", margin: "auto 0vw" }}>
                  C3 :
                </p>
                <input ref={this.ref_InputC3} onChange={this.updateInputFields} type="number" style={{ width: "50%" }} min="0" max="1"></input>
              </div>
            </div>
          </div>
        </CMoveableBox>
      </div>
    );
  }

  getVariations = () => {
    let newVariations = [];
    for (let i = 0; i < this.variationIndexCombinations.length; ++i) {
      let variation =
        this.state.colorspaces[this.selectedColorspaceIndex][this.variationIndexCombinations[i][2]] +
        "_" +
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
    this.initInputFieldsWithCurrentColor();
  };

  setVariation = (_colorvariation) => {
    this.selectedVariationIndex = _colorvariation;
    this.setState({ c1Label: this.state.variations[_colorvariation].substring(0, 1), c2Label: this.state.variations[_colorvariation].substring(2, 3), c3Label: this.state.variations[_colorvariation].substring(3, 4) });
  };

  updateInputFields = () => {
    let updateColorJson = JSON.parse(JSON.stringify(this.state.color));
    updateColorJson.c1 = this.ref_InputC1.current.value / this.colorspaceConversionFactor[this.selectedColorspaceIndex][0];
    updateColorJson.c2 = this.ref_InputC2.current.value / this.colorspaceConversionFactor[this.selectedColorspaceIndex][1];
    updateColorJson.c3 = this.ref_InputC3.current.value / this.colorspaceConversionFactor[this.selectedColorspaceIndex][2];
    this.setState({ color: updateColorJson });
  };

  initInputFieldsWithCurrentColor() {
    this.ref_InputLabelC1.current.textContent = this.state.colorspaces[this.selectedColorspaceIndex][0];
    this.ref_InputC1.current.value = Math.round(this.colorspaceConversionFactor[this.selectedColorspaceIndex][0] * this.state.color.c1);
    this.ref_InputC1.current.step = this.colorspaceInputStep[this.selectedColorspaceIndex];
    this.ref_InputC1.current.max = this.colorspaceInputMax[this.selectedColorspaceIndex][0];
    this.ref_InputC1.current.min = this.colorspaceInputMin[this.selectedColorspaceIndex][0];

    this.ref_InputLabelC2.current.textContent = this.state.colorspaces[this.selectedColorspaceIndex][1];
    this.ref_InputC2.current.value = Math.round(this.colorspaceConversionFactor[this.selectedColorspaceIndex][1] * this.state.color.c2);
    this.ref_InputC2.current.step = this.colorspaceInputStep[this.selectedColorspaceIndex];
    this.ref_InputC2.current.max = this.colorspaceInputMax[this.selectedColorspaceIndex][1];
    this.ref_InputC2.current.min = this.colorspaceInputMin[this.selectedColorspaceIndex][1];

    this.ref_InputLabelC3.current.textContent = this.state.colorspaces[this.selectedColorspaceIndex][2];
    this.ref_InputC3.current.value = Math.round(this.colorspaceConversionFactor[this.selectedColorspaceIndex][2] * this.state.color.c3);
    this.ref_InputC3.current.step = this.colorspaceInputStep[this.selectedColorspaceIndex];
    this.ref_InputC3.current.max = this.colorspaceInputMax[this.selectedColorspaceIndex][2];
    this.ref_InputC3.current.min = this.colorspaceInputMin[this.selectedColorspaceIndex][2];
  }

  //////////////////////////////////////////////
  // All canvas related methods
  //////////////////////////////////////////////

  mouseMoveC1 = (e) => {
    if (this.canvasC1Rect !== undefined) {
      this.relativeColorPosC1 = (this.canvasC1Rect.height - (e.clientY - this.canvasC1Rect.top)) / this.canvasC1Rect.height;
      this.setState({
        mouseColorPosC1: Math.round(
          this.relativeColorPosC1 * this.colorspaceConversionFactor[this.selectedColorspaceIndex][this.variationIndexCombinations[this.selectedVariationIndex][0]]
        ),
      });
    }
  };

  mouseMoveC2C3 = (e) => {
    if (this.canvasC2C3Rect !== undefined) {
      this.relativeColorPosC2 = (e.clientX - this.canvasC2C3Rect.left) / this.canvasC2C3Rect.width;
      this.relativeColorPosC3 = (this.canvasC2C3Rect.height - (e.clientY - this.canvasC2C3Rect.top)) / this.canvasC2C3Rect.height;
      this.setState({
        mouseColorPosC2: Math.round(this.relativeColorPosC2 * this.colorspaceConversionFactor[this.selectedColorspaceIndex][this.variationIndexCombinations[this.selectedVariationIndex][1]]),
        mouseColorPosC3: Math.round(this.relativeColorPosC3 * this.colorspaceConversionFactor[this.selectedColorspaceIndex][this.variationIndexCombinations[this.selectedVariationIndex][2]]),
      });
    }
  };

  mouseDownC1 = () => {
    let updateColorJson = JSON.parse(JSON.stringify(this.state.color));
    updateColorJson.c1 = this.relativeColorPosC1;
    this.setState({ color: updateColorJson });
  };

  mouseDownC2C3 = () => {
    let updateColorJson = JSON.parse(JSON.stringify(this.state.color));
    updateColorJson.c2 = this.relativeColorPosC2;
    updateColorJson.c3 = this.relativeColorPosC3;
    this.setState({ color: updateColorJson });
  };

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
      let workColorJson = JSON.parse(JSON.stringify(this.state.color));
      workColorJson.space = this.state.colorspaces[this.selectedColorspaceIndex];
      let yColorComponent = "c" + (this.variationIndexCombinations[this.selectedVariationIndex][2] + 1);
      let resultColorJson = { space: "rgb", c1: 0.5, c2: 0.5, c3: 0.5 };
      this.colorObj.setColorJSON(workColorJson);

      // Determine Current Position
      let currentPosY = canvas.height - Math.round(canvas.height * this.state.color[yColorComponent]);

      if (workColorJson[yColorComponent] !== undefined) {
        for (var y = 0; y < canvas.height; y++) {
          var yVal = 1 - y / canvas.height;
          workColorJson[yColorComponent] = yVal;
          this.colorObj.setColorJSON(workColorJson);
          resultColorJson = this.colorObj.getColorJSON("rgb");
          var index = y * 4;

          switch (true) {
            case Math.abs(y - currentPosY) < 2:
              imgData.data[index + 0] = Math.round(255); // r
              imgData.data[index + 1] = Math.round(255); // g
              imgData.data[index + 2] = Math.round(255); // b
              break;
            case Math.abs(y - currentPosY) < 4:
              imgData.data[index + 0] = Math.round(0); // r
              imgData.data[index + 1] = Math.round(0); // g
              imgData.data[index + 2] = Math.round(0); // b
              break;
            default:
            case y === currentPosY:
              imgData.data[index + 0] = Math.round(resultColorJson.c1 * 255); // r
              imgData.data[index + 1] = Math.round(resultColorJson.c2 * 255); // g
              imgData.data[index + 2] = Math.round(resultColorJson.c3 * 255); // b
          }

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
      let workColorJson = JSON.parse(JSON.stringify(this.state.color));
      workColorJson.space = this.state.colorspaces[this.selectedColorspaceIndex];
      let xColorComponent = "c" + (this.variationIndexCombinations[this.selectedVariationIndex][0] + 1);
      let yColorComponent = "c" + (this.variationIndexCombinations[this.selectedVariationIndex][1] + 1);
      let resultColorJson = { space: "rgb", c1: 0.5, c2: 0.5, c3: 0.5 };
      this.colorObj.setColorJSON(workColorJson);

      if (workColorJson[xColorComponent] !== undefined && workColorJson[yColorComponent] !== undefined) {
        for (var x = 0; x < canvas.width; x++) {
          var xVal = x / canvas.width;
          workColorJson[xColorComponent] = xVal;
          for (var y = 0; y < canvas.height; y++) {
            var yVal = 1 - y / canvas.height;
            workColorJson[yColorComponent] = yVal;
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

      // draw current position
      let currentPosX = Math.round(this.state.color[xColorComponent] * canvas.width);
      let currentPosY = canvas.height - Math.round(this.state.color[yColorComponent] * canvas.height);
      let outerRadius = 5;
      let innerRadius = 4;
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.lineWidth = "0";
      ctx.beginPath();
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 0, 0.25 * Math.PI);
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 0.5 * Math.PI, 0.75 * Math.PI);
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 1.0 * Math.PI, 1.25 * Math.PI);
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 1.5 * Math.PI, 1.75 * Math.PI);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 0.25 * Math.PI, 0.5 * Math.PI);
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 0.75 * Math.PI, 1.0 * Math.PI);
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 1.25 * Math.PI, 1.5 * Math.PI);
      ctx.moveTo(currentPosX, currentPosY);
      ctx.arc(currentPosX, currentPosY, outerRadius, 1.75 * Math.PI, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();

      this.colorObj.setColorJSON(JSON.parse(JSON.stringify(this.state.color)));
      ctx.fillStyle = this.colorObj.getRGBString();
      ctx.beginPath();
      ctx.arc(currentPosX, currentPosY, innerRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  mouseEnterC1 = () => {
    const canvasC1 = this.ref_CanvasC1.current;
    if (canvasC1 !== null) {
      this.canvasC1Rect = canvasC1.getBoundingClientRect();
    }
    this.setState({ c1LabelVisibility: { visibility: "visible" } });
  };

  mouseEnterC2C3 = () => {
    const canvasC2C3 = this.ref_CanvasC2C3.current;
    if (canvasC2C3 !== null) {
      this.canvasC2C3Rect = canvasC2C3.getBoundingClientRect();
    }
    this.setState({ c2c3LabelVisibility: { visibility: "visible" } });
  };

  mouseLeaveC1 = () => {
    this.setState({ c1LabelVisibility: { visibility: "hidden" } });
  };

  mouseLeaveC2C3 = () => {
    this.setState({ c2c3LabelVisibility: { visibility: "hidden" } });
  };
}
export default CColorpicker;
