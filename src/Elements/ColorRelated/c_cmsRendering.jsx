import React, { Component } from "react";

class CCMSRendering extends Component {
  state = {};

  constructor() {
    super();
    this.ref_Canvas = React.createRef();
  }

  componentDidMount() {
    this.drawCMS();
  }

  componentDidUpdate() {
    this.drawCMS();
  }

  drawCMS() {
    if (this.props.selectedCMS.getKeyLength() > 1) {
      const canvas = this.ref_Canvas.current;
      if (canvas !== null) {
        let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        const imgData = this.props.selectedCMS.drawCMS(canvas.width, canvas.height, false, false, 1.0);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imgData, 0, 0);
      }
    }
  }

  render() {
    if (this.props.selectedCMS.getKeyLength() < 2) {
      return (
        <svg
          style={{
            ...{ background: "var(--bg-app)", stroke: "var(--font-color)" },
            ...this.props.style,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <line x1="0%" y1="100%" x2="0%" y2="100%" />
        </svg>
      );
    } else {
      return <canvas ref={this.ref_Canvas} style={this.props.style}></canvas>;
    }
  }
}
export default CCMSRendering;
