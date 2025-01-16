import React, { Component } from "react";
import CColorpicker from "../../Elements/ColorRelated/Colorpicker/c_colorpicker";
import { Trans, withTranslation } from "react-i18next";

class CDesignSettings extends Component {
  // To-DO: component onmout, on focus -> update set all settings to settings done by other tabs
  styleJson = {};
  state = {};
  render() {
    return (
      <div className="cl_row">
        <p>Predesigns: </p>
        <button onClick={() => this.switchToBrightDarkMode()} style={{ background: "var(--bg-darkmode)", color: "var(--font-color-darkmode)", border: "var(--border-width) solid var(--borderColor-darkmode)" }}>
          {" "}
          Dark Mode{" "}
        </button>
        <button onClick={() => this.switchToBrightMode()} style={{ background: "var(--bg-brightmode)", color: "var(--font-color-brightmode)", border: "var(--border-width) solid var(--borderColor-brightmode)" }}>
          {" "}
          Bright Mode{" "}
        </button>
      </div>
    );
  }

  switchToBrightMode = () => {
    this.styleJson = {
      "--bg-app": "var(--bg-brightmode)",
      "--bg-alpha-5": "var(--bg-brightmode-alpha-5)",
      "--bg-alpha-25": "var(--bg-brightmode-alpha-25)",
      "--bg-alpha-80": "var(--bg-brightmode-alpha-80)",
      "--bg-alpha-90": "var(--bg-brightmode-alpha-90)",
      "--bg-gradient": "var(--bg-brightmode-gradient)",
      "--bg-point-out": "var(--bg-point-out-brightmode)",
      "--bg-point-out-alpha-50": "var(--bg-point-out-brightmode-alpha-50)",
      "--bg-point-out-alpha-80": "var(--bg-point-out-brightmode-alpha-80)",
      "--bg-point-out-alpha-90": "var(--bg-point-out-brightmode-alpha-90)",
      "--bg-point-out-gradient": "var(--bg-point-out-brightmode-gradient)",
      "--font-color": "var(--font-color-brightmode)",
      "--font-color-alpha-90": "var(--font-color-brightmode-alpha-90)",
      "--font-color-point-out": "var(--font-color-point-out-brightmode)",
      "--font-color-point-out-alpha-90": "var(--font-color-point-out-brightmode-alpha-90)",
      "--active-background": "var(--active-background-brightmode)",
      "--active-background-alpha-0": "var(--active-background-brightmode-alpha-0)",
    };
    window.localStorage.setItem("ccc_pageDesingMode", "bright");
    window.localStorage.setItem("ccc_pageCSSVariablesUpdate", JSON.stringify(this.styleJson));
    for (const [key, value] of Object.entries(this.styleJson)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  switchToBrightDarkMode = () => {
    this.styleJson = {
      "--bg-app": "var(--bg-darkmode)",
      "--bg-alpha-5": "var(--bg-darkmode-alpha-5)",
      "--bg-alpha-25": "var(--bg-darkmode-alpha-25)",
      "--bg-alpha-80": "var(--bg-darkmode-alpha-80)",
      "--bg-alpha-90": "var(--bg-darkmode-alpha-90)",
      "--bg-gradient": "var(--bg-darkmode-gradient)",
      "--bg-point-out": "var(--bg-point-out-darkmode)",
      "--bg-point-out-alpha-50": "var(--bg-point-out-darkmode-alpha-50)",
      "--bg-point-out-alpha-80": "var(--bg-point-out-darkmode-alpha-80)",
      "--bg-point-out-alpha-90": "var(--bg-point-out-darkmode-alpha-90)",
      "--bg-point-out-gradient": "var(--bg-point-out-darkmode-gradient)",
      "--font-color": "var(--font-color-darkmode)",
      "--font-color-alpha-90": "var(--font-color-darkmode-alpha-90)",
      "--font-color-point-out": "var(--font-color-point-out-darkmode)",
      "--font-color-point-out-alpha-90": "var(--font-color-point-out-darkmode-alpha-90)",
      "--active-background": "var(--active-background-darkmode)",
      "--active-background-alpha-0": "var(--active-background-darkmode-alpha-0)",
    };
    window.localStorage.setItem("ccc_pageDesingMode", "dark");
    window.localStorage.setItem("ccc_pageCSSVariablesUpdate", JSON.stringify(this.styleJson));
    for (const [key, value] of Object.entries(this.styleJson)) {
      document.documentElement.style.setProperty(key, value);
    }
  };
}
/*<CColorpicker></CColorpicker> */
export default withTranslation()(CDesignSettings);
