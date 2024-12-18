import React, { Component } from "react";

// Components
import CHeader from "../../../Elements/c_header";
import CCMSRendering from "../../../Elements/ColorRelated/c_cmsRendering";

// Style
import "./export.css";

const formatOptions = [
  {
    label: "XML (Paraview)",
    value: "xml",
  },
  {
    label: "JSON (Paraview)",
    value: "jsonPara",
  },
  {
    label: "JSON (Colormoves)",
    value: "jsonMoves",
  },
  {
    label: "JSON (CCC-Tool)",
    value: "jsonCCC",
  },
  {
    label: "CSV",
    value: "csv",
  },
];

const samplingOptions = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "CMS Sampling",
    value: "cms",
  },
  {
    label: "Band Sampling",
    value: "band",
  },
];

class C_Export extends Component {
  state = {};

  constructor() {
    super();
    /*
    this.ref_twinIssue = React.createRef();
    this.ref_numIntervals = React.createRef();*/

    this.numIntervals = 50;

    this.handleTwinIssue = false;
    this.state = {
      exportTable: [],
      format: "xml",
      samplingType: "none",
      notationOptions: [
        {
          label: "RGB [0,1]",
          value: "rgb",
          disabled: false,
        },
        {
          label: "RGB [0,255]",
          value: "rgb255",
          disabled: false,
        },
        {
          label: "HEX",
          value: "hex",
          disabled: false,
        },
        {
          label: "HSV [0,1]",
          value: "hsv",
          disabled: false,
        },
        {
          label: "HSV (360,100,100)",
          value: "hsv360",
          disabled: false,
        },
        {
          label: "XYZ",
          value: "xyz",
          disabled: false,
        },
        {
          label: "Lab",
          value: "lab",
          disabled: false,
        },
        {
          label: "Lch",
          value: "lch",
          disabled: false,
        },
        {
          label: "DIN99",
          value: "din99",
          disabled: false,
        },
        {
          label: "LMS",
          value: "lms",
          disabled: false,
        },
      ],
      colorNotation: "rgb",
      propeOptions: [
        {
          label: "No Probe",
          value: "no probe",
        },
      ],
      propeSelect: "no probe",
      handleTwinIssue: false,
      numIntervals: 50,
    };

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount() {
    this.setProbeOptions();
    this.setExportTable();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notationOptions.value !== this.state.notationOptions.value) {
      alert("update notation");
    }
  }

  handleStateChange(_value, _keyName) {
    let stateUpdate = {};
    stateUpdate[_keyName] = _value;
    this.setState(stateUpdate);
  }

  setProbeOptions() {
    // implement this later, when probes exist.
  }

  setExportTable() {
    //alert(this.colorSpace + " " + this.samplingType + " " + this.handleTwinIssue + " " + this.numIntervals);
  }

  export = () => {
    alert("export");
  };

  render() {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <CHeader style={{ height: "8vh", width: "100vw" }}>
          <img src={"/CCC-Tool-2/img/Logos/CCC-LOGO.png"} alt="CCC-Tool Logo" style={{ pointerEvents: "auto", height: "6vh", margin: "auto", marginLeft: "5vw", marginRight: "2vw", cursor: "pointer" }}></img>
          <h2
            style={{
              color: "var(--font-color-darkBG)",
              margin: "auto",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            Export
          </h2>
        </CHeader>

        <div className="cl_row cl_marginTB_0_5" style={{ height: "80vh", width: "100vw" }}>
          <div style={{ overflow: "hidden", margin: "auto", width: "25vw", height: "70vh", borderRadius: "var(--border-radius)", background: "var(--bg-bright-alpha-75)", border: "var(--border-width) solid var(--borderColor-brightBG)" }}>
            <h2 style={{ background: "var(--borderColor-brightBG)", width: "100%", color: "var(--font-color-darkBG)" }}>Options</h2>

            <div className="cl_row cl_marginTB_0_5">
              <p className="cl_optionLabel">Probes : </p>
              <select className="cl_option" value={this.state.propeSelect} onChange={(e) => this.handleStateChange(e, "propeSelect")}>
                {this.state.propeOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="cl_row cl_marginTB_0_5">
              <p className="cl_optionLabel">Output Format : </p>
              <select className="cl_option" value={this.state.format} onChange={(e) => this.handleStateChange(e.target.value, "format")}>
                {formatOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="cl_row cl_marginTB_0_5">
              <p className="cl_optionLabel">Color Notation : </p>
              <select className="cl_option" value={this.state.colorNotation} onChange={(e) => this.handleStateChange(e.target.value, "colorNotation")}>
                {this.state.notationOptions.map((option) => (
                  <option value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <hr style={{ width: " 100%", color: "var(--borderColor-brightBG)" }}></hr>

            <div className="cl_row cl_marginTB_0_5">
              <p className="cl_optionLabel ">Handle Twin Issue : </p>

              <label className="cl_checkDiv cl_option cl_marginAutoTB">
                <input ref={this.ref_twinIssue} type="checkbox" checked={this.state.handleTwinIssue} onChange={(e) => this.handleStateChange(e.target.checked, "handleTwinIssue")} />
                <span className="cl_checkSpan"></span>
              </label>

              <button
                className="cl_button_qa_Dark"
                style={{ marginRight: "auto" }}
                onClick={() =>
                  this.props.handleOpenTextBox(
                    "Information",
                    "Some visualization tools may have problems with the notation of left and twin keys (two colors with the same reference value). If you activate this checkbox, the tool will add a very low number to the reference value of the second key color. This option is not available for the CCC-Tool json format. During the import of such modified files, the tool is not able to detect twin or left keys anymore."
                  )
                }
              >
                ?
              </button>
            </div>

            <hr style={{ width: " 100%", color: "var(--borderColor-brightBG)" }}></hr>

            <div className="cl_row cl_marginTB_0_5">
              <p className="cl_optionLabel">Sampling : </p>
              <select className="cl_option" value={this.state.samplingType} onChange={(e) => this.handleStateChange(e.target.value, "samplingType")}>
                {samplingOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="cl_row cl_marginTB_0_5">
              <p className="cl_optionLabel">#Intervals : </p>
              <input ref={this.ref_numIntervals} className="cl_option" type="number" value={this.state.numIntervals} min="1" step="1" onChange={(e) => this.handleStateChange(e.target.value, "numIntervals")}></input>
            </div>
          </div>

          <div
            style={{
              overflow: "hidden",
              margin: "auto",
              marginLeft: "0vw",
              width: "60vw",
              height: "70vh",
              borderRadius: "var(--border-radius)",
              background: "var(--bg-bright-alpha-75)",
              border: "var(--border-width) solid var(--borderColor-brightBG)",
            }}
          >
            <h2 style={{ background: "var(--borderColor-brightBG)", width: "100%", color: "var(--font-color-darkBG)" }}>Export Table</h2>
          </div>
        </div>

        <div className="cl_row" style={{ marginTop: "auto" }}>
          <CCMSRendering selectedCMS={this.props.selectedCMS} style={{ width: "86vw", height: "6vh", margin: "3vh 2vw", border: "var(--border-width) solid var(--borderColor-brightBG)", borderRadius: "var(--border-radius)" }} />

          <svg
            title="Download"
            className="cl_Icon_F_BrightBG cl_Icon_F"
            onClick={() => this.export()}
            style={{ height: "8vh", width: "6vw", maxHeight: "6vw", maxWidth: "8vh", margin: "auto", marginLeft: "0vw" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="9"></circle>
            <polyline points="7 12 10 15 13 12" stroke="var(--bg-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="6" y1="6.5" x2="14" y2="6.5" stroke="var(--bg-bright)" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="7.5" x2="10" y2="13" stroke="var(--bg-bright)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  }
}

export default C_Export;
