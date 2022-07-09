import React, { Component } from "react";
import "../../Style/CSS/filter.css";

class CConfirm extends Component {
  state = {
    display: "none",
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
        <div style={{ margin: "auto", padding: "3vh 4vw", maxWidth: "50%", borderRadius: "var(--border-radius)", background: "var(--bg-bright)" }}>
          <p>{this.props.children}</p>

          <div className="cl_row" style={{ marginTop: "2vh" }}>
            <button onClick={() => this.setState({ display: "none" })} style={{ width: "12vw", margin: "auto", marginRight: "2vw" }}>
              Cancel
            </button>
            <button onClick={() => this.accept()} style={{ width: "12vw", margin: "auto", marginLeft: "0vw" }}>
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  activate = () => {
    this.setState({ display: "flex" });
  };

  accept = () => {
    this.props.accept();
    this.setState({ display: "none" });
  };
}

export default CConfirm;
