import React, { Component } from "react";
import CHeader from "../../../../Elements/c_header";
import FNavigateButton from "../../../../Elements/Functionality/f_navigateButton";
import { Trans, withTranslation } from "react-i18next";

class C_ToolStart extends Component {
  render() {
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <FNavigateButton navURL="/" style={{ margin: "auto", marginRight: "2vw" }}>
            <img src={"/CCC-Tool-2/img/Logos/CCC-2-LOGO.png"} alt="CCC-Tool Logo" style={{ height: "23vh" }}></img>
          </FNavigateButton>
          <h1
            style={{
              maxHeight: "25vh",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            <Trans i18nKey="page_tool_start.label" />
          </h1>
        </CHeader>
      </div>
    );
  }
}
export default withTranslation()(C_ToolStart);
