import React, { Component } from "react";
import CCMSView from "./c_level1_cmsView";
import "./myDesigns.css";

class CCMSGroup extends Component {
  state = {};

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
            <CCMSView
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

export default CCMSGroup;
