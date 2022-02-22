//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level1_cmsGroup.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

import React, { Component } from "react";
import C_CMSView from "./c_level1_cmsView";
import "./myDesigns.css";

class C_CMSGroup extends Component {
  state = {};

  // State -> Sessional Storage we need to react depending on the sessional data

  constructor() {
    super();
  }

  render() {
    return (
      <div
        style={{
          width: "76vw",
          margin: "1vh auto",
          background: "var(--bg-dark-alpha-5)",
          border: "var(--border-width) solid var(--borderColor-brightBG)",
          marginTop: "2.5vh",
          marginBottom: "2.5vh",
          borderRadius: "var(--border-radius)",
          paddingBottom: "2vh",
          overflow: "hidden",
        }}
      >
        <div style={{ cursor: "pointer", width: "100%", flexDirection: "row", background: "var(--bg-dark)", borderBottom: "var(--border-width) solid var(--borderColor-brightBG)", padding: "0.5vh 2.5vw" }}>
          <p style={{ color: "var(--font-color-darkBG)" }}>
            <strong>{"Group"}</strong>
            {": " + this.props.groupName}
          </p>
        </div>

        <div className="cl_CMSGroup_Div cl_row">
          {this.props.groupIndices.map((filteredIndex) => (
            <C_CMSView
              key={"id_cmsV_" + this.props.cmsObjID + "_" + filteredIndex}
              selectedCMSObjIndex={this.props.selectedCMSObjIndex}
              selectedCMSIndex={this.props.selectedCMSIndex}
              handleSelectCMS={this.props.handleSelectCMS.bind(this)}
              cmsObjID={this.props.cmsObjID}
              cmsID={filteredIndex}
              cms={this.props.cmsObjects[filteredIndex]}
              handleGetSessionCMSImg={this.props.handleGetSessionCMSImg.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default C_CMSGroup;
