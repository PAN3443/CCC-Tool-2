import React, { Component } from "react";

// style
import "./myDesigns.css";

class CCMSView extends Component {
  state = {};

  // State -> Sessional Storage we need to react depending on the sessional data

  constructor() {
    super();
    this.ref_Div = React.createRef();
    this.ref_Canvas = React.createRef();
  }

  componentDidMount() {
    this.drawCMS();
    this.isSelected();
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("prevProps", prevProps);
    //console.log("prevState", prevState);
    if (prevProps.selectedCMSObjIndex !== this.props.selectedCMSObjIndex || prevProps.selectedCMSIndex !== this.props.selectedCMSIndex) {
      this.isSelected();
    }
  }

  isSelected() {
    //console.log(this.props.selectedCMSObjIndex + "==" + this.props.cmsObjID + " && " + this.props.selectedCMSIndex + "==" + this.props.cmsID);
    if (this.props.selectedCMSObjIndex === this.props.cmsObjID && this.props.selectedCMSIndex === this.props.cmsID) {
      this.ref_Div.current.classList.add("cl_selectedCMS");
    } else {
      this.ref_Div.current.classList.remove("cl_selectedCMS");
    }
  }

  render() {
    return (
      <div className="cl_CMSView_Div" onClick={() => this.props.handleSelectCMS(this.props.cmsObjID, this.props.cmsID)}>
        <div ref={this.ref_Div} style={{ width: "95%", marginLeft: "2.5%", marginTop: "2.5vh", marginBottom: "2.5vh", border: "var(--border-width) solid var(--borderColor-brightBG)", borderRadius: "var(--border-radius)", overflow: "hidden" }}>
          <div style={{ width: "100%", flexDirection: "row", background: "var(--bg-dark)", borderBottom: "var(--border-width) solid var(--borderColor-brightBG)", padding: "0.5vh 2.5vw" }}>
            <p style={{ color: "var(--font-color-darkBG)", maxHeight: "var(--line-height-normal)" }} title={"CMS : " + this.props.cms.name + " (Type: " + this.determineType() + ")"}>
              <strong>{"CMS"}</strong>
              {": " + this.props.cms.name + " (Type: " + this.determineType() + ")"}
            </p>
          </div>
          <canvas ref={this.ref_Canvas} style={{ width: "100%", height: "5vh" }}></canvas>
        </div>
      </div>
    );
  }

  drawCMS() {
    const canvas = this.ref_Canvas.current;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const imgData = this.props.handleGetSessionCMSImg(this.props.cmsObjID, this.props.cmsID, canvas.width, canvas.height);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
  }

  determineType() {
    return "CCC";
  }
}

export default CCMSView;
