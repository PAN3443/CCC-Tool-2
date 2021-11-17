import React, { Component } from "react";
import "../Style/CSS/filter.css";

class C_Menu extends Component {
  state = {
    display: "none",
  };

  constructor() {
    super();
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
          position: "fixed",
          zIndex: "100",
          background: "var(--bg-dark-alpha-50)",
        }}
      >
        <div style={{ margin: "auto" }}>
          {this.props.children}
          <button className="cl_button_Bright" onClick={() => this.refreshTabInfo()} style={{ width: "20vw", margin: "1vh auto" }}>
            Clear Tab Storage
          </button>
          <button className="cl_button_Bright" onClick={() => this.props.handleGo2Page("/about")} style={{ width: "20vw", margin: "1vh auto" }}>
            About
          </button>
          <button className="cl_button_Bright" onClick={() => this.props.handleGo2Page("/contact")} style={{ width: "20vw", margin: "1vh auto" }}>
            Contact/Impressum
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

export default C_Menu;
