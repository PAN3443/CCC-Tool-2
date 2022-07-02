import React, { Component } from "react";
import "../Style/CSS/filter.css";

class CTextBox extends Component {
  state = {
    display: "none",
    header: "WARNING",
    warnText: "Warning Text",
  };

  render() {
    return (
      <div
        className="cl_blur"
        style={{
          display: this.state.display,
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0px",
          left: "0px",
          bottom: "0px",
          zIndex: "100",
          background: "var(--bg-dark-alpha-50)",
        }}
      >
        <div style={{ margin: "auto", maxWidth: "50%", borderRadius: "var(--border-radius)", background: "var(--bg-bright)", overflow: "hidden", border: "var(--border-width) solid var(--borderColor-brightBG)" }}>
          <div className="cl_row" style={{ padding: "1vh 4vw", background: "var(--bg-dark)", borderBottom: "var(--border-width) solid var(--borderColor-brightBG)" }}>
            <svg
              title="Filter"
              className="cl_Icon_S_BrightBG cl_Icon_S"
              onClick={() => this.open_filer()}
              style={{ height: "4vh", width: "4vh", margin: "auto", marginRight: "0vw", fill: "var(--bg-bright)", strokeWidth: "2", stroke: "var(--bg-bright)", strokeLinecap: "round", strokeLinejoin: "round" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <polygon points="6,2 10,12 14,2" />
              <circle cx="10" cy="17" r="1.5" />
            </svg>

            <h3 style={{ margin: "auto 1vw", color: "var(--bg-bright)", lineHeight: "4vh", fontSize: "4vh" }}>{this.state.header}</h3>

            <svg
              title="Filter"
              className="cl_Icon_S_BrightBG cl_Icon_S"
              onClick={() => this.open_filer()}
              style={{ height: "4vh", width: "4vh", margin: "auto", marginLeft: "0vw", fill: "var(--bg-bright)", strokeWidth: "2", stroke: "var(--bg-bright)", strokeLinecap: "round", strokeLinejoin: "round" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <polygon points="6,2 10,12 14,2" />
              <circle cx="10" cy="17" r="1.5" />
            </svg>
          </div>

          <p style={{ padding: "2vh 4vw" }}>{this.state.warnText}</p>

          <div className="cl_row" style={{ padding: "2vh 4vw" }}>
            <button onClick={() => this.close()} style={{ width: "12vw", margin: "auto" }}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  open = (_header, _warnText) => {
    this.setState({ display: "flex", header: _header, warnText: _warnText });
  };

  close = () => {
    this.setState({ display: "none" });
  };
}

export default CTextBox;
