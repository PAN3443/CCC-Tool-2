import React, { Component } from "react";
import "../Style/CSS/filter.css";

class CMenu extends Component {
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
        <div style={{ margin: "auto" }}>
          {this.props.children}
          <button className="cl_button_Bright" onClick={() => this.refreshTabInfo()} style={{ width: "20vw", margin: "1vh auto" }}>
            Clear Tab Storage
          </button>
          <button className="cl_button_Bright" onClick={() => this.close()} style={{ width: "20vw", margin: "1vh auto" }}>
            Close Menu (ESC)
          </button>
        </div>
      </div>
    );
  }

  refreshTabInfo = () => {
    this.props.handleRefreshTabInfo();
    this.close();
  };

  close = () => {
    this.setState({ display: "none" });
  };

  open = () => {
    this.setState({ display: "flex" });
  };
}

export default CMenu;
