import React, { Component } from "react";
import CHeader from "../../Elements/c_header";
import CColorpicker from "../../Elements/ColorRelated/Colorpicker/c_colorpicker";
import C_Tab from "../../Elements/Basic/c_tab";
import FNavigateButton from "../../Elements/Functionality/f_navigateButton";
import { Trans, withTranslation } from "react-i18next";
import CDesignSettings from "./c_level1_design";

class CSettings extends Component {
  state = {};
  render() {
    const { t } = this.props;
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <div className="cl_blur cl_row cl_noMark" style={{ position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-point-out-alpha-90)", zIndex: "2", top: "0px", left: "0px" }}>
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
              <Trans i18nKey="page_settings.label" />
            </h1>
          </div>
        </CHeader>
        <C_Tab style={{ width: "100vw", height: "75vh" }} tabStyle={{ width: "80%" }} tabContentStyle={{ width: "80%" }} pointOutStyle={false}>
          <div title={t("page_settings.general")}>
          </div>
          <CDesignSettings title={t("page_settings.design")}>
          </CDesignSettings>
          <div title={t("page_settings.advanced")}>
          </div>
        </C_Tab>
      </div>
    );
  }
}
export default withTranslation()(CSettings);
