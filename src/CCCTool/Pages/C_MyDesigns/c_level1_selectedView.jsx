import React, { Component } from "react";
// Components
import CConfirm from "../../../Elements/PopUps/c_confirm";
import CCMSRendering from "../../../Elements/ColorRelated/c_cmsRendering";
import CKeyEntry from "./c_level2_keyEntry";
import FNavigateButton from "../../../Elements/Functionality/f_navigateButton";
// Functions
import { helper_dateToString } from "../../../Helpers/other";
// style
import "./myDesigns.css";
// Lib
import { colorToRGBString } from "ccctool-lib/lib/color/colorHelper";

class CSelectedView extends Component {
  state = {};

  // State -> Sessional Storage we need to react depending on the sessional data

  constructor() {
    super();
    this.ref_Confirm_DeleteCMS = React.createRef();
    this.ref_Confirm_DuplicateCMS = React.createRef();
  }

  deleteCMS = () => {
    this.props.handleEraseSelectedCMS();
  };

  duplicateCMS = () => {
    this.props.handleDuplicateSelectedCMS();
  };

  render() {
    return (
      <div style={this.props.style}>
        {(() => {
          if (this.filterIsOpen) {
            return <p>Filter</p>;
          } else if (this.props.selectedCMS === undefined) {
            return (
              <p style={{ color: "var(--borderColor)", width: "75%", margin: "auto" }}>
                Welcome to the CCC-Tool. This is the MyDesigns Page. Here you can manage your CMS. <strong>Select a CMS</strong> on the right side or create a new one by clicking on the <strong>plus button</strong> at the bottom.
              </p>
            );
          } else {
            return (
              <div style={{ width: "100%", height: "100%", maxHeight: "100%", borderRight: "var(--border-width) solid var(--borderColor)" }}>
                <h3 style={{ margin: " 1vh auto" }}>{this.props.selectedCMS.getCMSName()}</h3>

                <CCMSRendering selectedCMS={this.props.selectedCMS} style={{ width: "95%", height: "3vh", marginBottom: "1vh", marginLeft: "2.5%", borderRadius: "var(--border-radius)", border: "var(--border-width) solid var(--borderColor)" }} />

                <div className="cl_row">
                  <p className="cl_SelectedViewLabel">Created:</p>
                  <p className="cl_SelectedViewText">{helper_dateToString(this.props.selectedCMS.getCreationDate())}</p>
                </div>
                <div className="cl_row">
                  <p className="cl_SelectedViewLabel">Edited:</p>
                  <p className="cl_SelectedViewText">{helper_dateToString(this.props.selectedCMS.getLastUpdateDate())}</p>
                </div>

                <hr style={{ width: " 100%", color: "var(--borderColor)" }}></hr>

                <p className="cl_SelectedViewLabel cl_boldText">Interpolation:</p>
                <div className="cl_row">
                  <p className="cl_SelectedViewLabel">Space:</p>
                  <p className="cl_SelectedViewText">{this.props.selectedCMS.getInterpolationSpace()}</p>
                </div>
                <div className="cl_row">
                  <p className="cl_SelectedViewLabel">Type:</p>
                  <p className="cl_SelectedViewText">{this.props.selectedCMS.getInterpolationType()}</p>
                </div>

                <hr style={{ width: " 100%", color: "var(--borderColor)" }}></hr>

                <p className="cl_SelectedViewLabel cl_boldText">Special Colors:</p>
                <div className="cl_row">
                  <p className="cl_SelectedViewLabel cl_marginAutoTB">Below:</p>
                  <div className="cl_SpecialColor" title={colorToRGBString(this.props.selectedCMS.getBelowColor("rgb"))} style={{ background: colorToRGBString(this.props.selectedCMS.getBelowColor("rgb")) }}></div>
                </div>
                <div className="cl_row">
                  <p className="cl_SelectedViewLabel cl_marginAutoTB">Above:</p>
                  <div className="cl_SpecialColor" title={colorToRGBString(this.props.selectedCMS.getAboveColor("rgb"))} style={{ background: colorToRGBString(this.props.selectedCMS.getAboveColor("rgb")) }}></div>
                </div>
                <div className="cl_row">
                  <p className="cl_SelectedViewLabel cl_marginAutoTB">NaN:</p>
                  <div className="cl_SpecialColor" title={colorToRGBString(this.props.selectedCMS.getNaNColor("rgb"))} style={{ background: colorToRGBString(this.props.selectedCMS.getNaNColor("rgb")) }}></div>
                </div>

                <hr style={{ width: " 100%", color: "var(--borderColor)" }}></hr>

                <p className="cl_SelectedViewLabel cl_boldText">Keys:</p>

                <div style={{ overflow: "hidden", width: "80%", marginLeft: "10%", border: "var(--border-width) solid var(--borderColor)", borderRadius: "var(--border-radius)", marginTop: "1vh" }}>
                  <div className="cl_row" style={{ height: "3vh", width: "100%", background: "var(--bg-point-out)" }}>
                    <h4 style={{ margin: "auto 0vw", width: "50%", overflow: "hidden", color: "var(--font-color-point-out)" }}>Reference</h4>
                    <h4 style={{ margin: "auto 0vw", width: "50%", overflow: "hidden", color: "var(--font-color-point-out)" }}>Key</h4>
                  </div>
                  <div style={{ height: "38vh", background: "var(--bg-app)", overflowY: "scroll" }}>
                    {this.props.selectedCMS.p_keys.map((k, index) => (
                      <CKeyEntry key={"selectedCMS_key_" + index} cmsKey={k} />
                    ))}
                  </div>
                </div>

                <div className="cl_row" style={{ height: "10vh", width: "100%", marginTop: "auto" }}>
                  <FNavigateButton navURL="/tool/edit" style={{ margin: "auto" }}>
                    <svg className="cl_Icon_F_BrightBG cl_Icon_F" style={{ height: "5vh", width: "4vw", maxHeight: "4vw", maxWidth: "5vh" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <title>Edit</title>
                      <circle cx="10" cy="10" r="9"></circle>
                      <line x1="10" y1="6" x2="10" y2="14" stroke="var(--bg-app)" strokeWidth="4" strokeLinecap="round" />
                      <rect x="4" y="6" width="10" height="1" />
                      <rect x="4" y="13" width="10" height="4" />
                      <polygon points="8,14 10,17 12,14" fill="var(--bg-app)" />
                    </svg>
                  </FNavigateButton>
                  <FNavigateButton navURL="/tool/export" style={{ margin: "auto", marginLeft: "0px" }}>
                    <svg className="cl_Icon_F_BrightBG cl_Icon_F" style={{ height: "5vh", width: "4vw", maxHeight: "4vw", maxWidth: "5vh" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <title>Export</title>
                      <circle cx="10" cy="10" r="9"></circle>
                      <polyline points="7 12 10 15 13 12" stroke="var(--bg-app)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="6" y1="6.5" x2="14" y2="6.5" stroke="var(--bg-app)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="10" y1="7.5" x2="10" y2="13" stroke="var(--bg-app)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </FNavigateButton>
                  <svg
                    className="cl_Icon_F_BrightBG cl_Icon_F"
                    onClick={() => this.ref_Confirm_DuplicateCMS.current.activate()}
                    style={{ height: "5vh", width: "4vw", maxHeight: "4vw", maxWidth: "5vh", margin: "auto", marginLeft: "0px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Duplicate</title>
                    <circle cx="7" cy="10" r="7"></circle>
                    <circle cx="13" cy="10" r="7" opacity="0.3"></circle>
                  </svg>
                  <svg
                    className="cl_Icon_F_BrightBG cl_Icon_F"
                    onClick={() => this.ref_Confirm_DeleteCMS.current.activate()}
                    style={{ height: "5vh", width: "4vw", maxHeight: "4vw", maxWidth: "5vh", margin: "auto", marginLeft: "0px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Delete</title>
                    <circle cx="10" cy="10" r="9"></circle>
                    <line x1="6" y1="6" x2="14" y2="14" stroke="var(--bg-app)" strokeWidth="2" />
                    <line x1="6" y1="14" x2="14" y2="6" stroke="var(--bg-app)" strokeWidth="2" />
                  </svg>
                </div>
                <CConfirm ref={this.ref_Confirm_DeleteCMS} accept={() => this.deleteCMS()}>
                  You are about to erase this CMS. Click on <strong>"Accept"</strong> to continue this process.
                </CConfirm>
                <CConfirm ref={this.ref_Confirm_DuplicateCMS} accept={() => this.duplicateCMS()}>
                  You are about to duplicate this CMS. Click on <strong>"Accept"</strong> to continue this process.
                </CConfirm>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default CSelectedView;
