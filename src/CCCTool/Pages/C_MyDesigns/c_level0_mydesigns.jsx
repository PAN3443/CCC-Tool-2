//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level0_mydesigns.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

// React
import React, { Component } from "react";

// Components
import CHeader from "../../../Elements/c_header";
import CConfirm from "../../../Elements/c_confirm";
import CMenu from "../../../Elements/c_menu";
import CCMSView from "./c_level1_cmsView";
import CCMSGroup from "./c_level1_cmsGroup";
import CSelectedView from "./c_level1_selectedView";
import FNavigateButton from "../../../Elements/f_navigateButton";

// Libs
//import { CMS } from "ccctool-lib/lib/cms/class_cms";

class CMyDesigns extends Component {
  constructor() {
    super();
    this.ref_Confirm_LogOut = React.createRef();
    this.ref_CMS_Container = React.createRef();
    this.ref_Confirm_ClearSession = React.createRef();
    this.ref_Menu = React.createRef();

    this.state = {
      filterIsOpen: false,
    };
  }

  /*componentDidMount() {
    document.addEventListener("keydown", this.keyCheck);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyCheck);
  }

  keyCheck = (e) => {
    if (e.key === "Escape" && !(e.ctrlKey || e.altKey || e.shiftKey)) {
      let elem_Menu = this.ref_Menu.current;
      if (elem_Menu.state.display === "none") this.ref_Menu.current.open();
      else this.ref_Menu.current.close();
    }
  };

  /**************************************************************************************************
   *  Function    : open_filer
   *  Description : Show the filter window in the <C_SelectedView> element.
   *  Ouput       : None
   *************************************************************************************************/
  /*open_filer = () => {
    this.props.handleOpenTextBox("WARNING", "The Filter functionality is not implemented so far.");
  };*/

  /**************************************************************************************************
   **************************************************************************************************
   ******************************************** Render **********************************************
   **************************************************************************************************
   *************************************************************************************************/

  render() {
    return (
      <div>
        <CHeader style={{ height: "8vh", width: "100vw" }}>
          <FNavigateButton navURL="/">
            <div style={{ height: "1vh" }}></div>
            <img src={process.env.PUBLIC_URL + "/img/Logos/CCC-LOGO.png"} alt="CCC-Tool Logo" style={{ pointerEvents: "auto", height: "6vh", margin: "auto", marginLeft: "5vw", marginRight: "2vw", cursor: "pointer" }}></img>
          </FNavigateButton>
          <h2
            style={{
              color: "var(--font-color-darkBG)",
              margin: "auto",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            MyDesigns
          </h2>
          <FNavigateButton navURL="/">
            <div style={{ height: "1vh" }}></div>
            <svg
              // title="logout"
              className="cl_Icon_S_DarkBG cl_Icon_S"
              style={{ height: "5vh", width: "5vh", margin: "auto 2vw", strokeWidth: "2" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <polyline points="4 7 1 10 4 13" />
              <line x1="10" y1="3" x2="10" y2="17" />
              <line x1="2" y1="10" x2="10" y2="10" />
            </svg>
          </FNavigateButton>
        </CHeader>
        <div style={{ height: "92vh", width: "100vw", flexDirection: "row" }}>
          <CSelectedView
            handleEraseSelectedCMS={this.props.handleEraseSelectedCMS.bind(this)}
            handleDuplicateSelectedCMS={this.props.handleDuplicateSelectedCMS.bind(this)}
            filterIsOpen={this.state.filterIsOpen}
            handleSetFilter={this.props.handleSetFilter.bind(this)}
            filter={this.props.filter}
            selectedCMS={this.props.selectedCMS}
            style={{ height: "92vh", maxHeight: "92vh", width: "20vw", background: "var(--bg-dark-alpha-5)" }}
          ></CSelectedView>
          <div style={{ height: "92vh", width: "80vw" }}>
            <div style={{ height: "82vh", maxHeight: "82vh" }}>
              <div className="cl_row" style={{ height: "fit-content", width: "80vw", paddingTop: "5vh", paddingBottom: "5vh", overflowY: "auto" }}>
                {this.props.filteredIndices.map((filteredObj) =>
                  filteredObj[0] ? (
                    <CCMSGroup
                      key={"id_cmsG_" + filteredObj[1]}
                      handleSelectCMS={this.props.handleSelectCMS.bind(this)}
                      selectedCMSObjIndex={this.props.selectedCMSObjIndex}
                      selectedCMSIndex={this.props.selectedCMSIndex}
                      cmsObjID={filteredObj[1]}
                      groupName={this.props.session[filteredObj[1]].groupName}
                      cmsObjects={this.props.session[filteredObj[1]].cmsObjects}
                      groupIndices={filteredObj[2]}
                      handleGetSessionCMSImg={this.props.handleGetSessionCMSImg.bind(this)}
                    />
                  ) : (
                    <CCMSView
                      key={"id_cmsV_" + filteredObj[1] + "_" + filteredObj[2]}
                      handleSelectCMS={this.props.handleSelectCMS.bind(this)}
                      selectedCMSObjIndex={this.props.selectedCMSObjIndex}
                      selectedCMSIndex={this.props.selectedCMSIndex}
                      cmsObjID={filteredObj[1]}
                      cmsID={filteredObj[1]}
                      cms={this.props.session[filteredObj[1]].cms}
                      handleGetSessionCMSImg={this.props.handleGetSessionCMSImg.bind(this)}
                    />
                  )
                )}
              </div>
            </div>
            <div className="cl_row" style={{ height: "10vh", width: "100%", background: "var(--bg-dark-alpha-5)" }}>
              <svg
                title="Menu"
                className="cl_Icon_F_BrightBG cl_Icon_F"
                onClick={() => this.ref_Menu.current.open()}
                style={{ height: "5vh", width: "5vh", margin: "auto 1vw", marginLeft: "2vw" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <circle cx="5" cy="10" r="2" />
                <circle cx="10" cy="10" r="2" />
                <circle cx="15" cy="10" r="2" />
              </svg>

              <svg title="Save" className="cl_Icon_S_BrightBG cl_Icon_S" onClick={() => this.props.handleExportSession()} style={{ height: "5vh", width: "5vh", margin: "auto 1vw" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polyline points="8 2 2 2 2 18 18 18 18 10 8 10 8 2 18 2 18 10" />
              </svg>

              <FNavigateButton navURL="/tool/generate">
                <svg title="New" className="cl_Icon_S_BrightBG cl_Icon_S" style={{ height: "5vh", width: "5vh", margin: "auto 1vw" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <line x1="2" y1="10" x2="18" y2="10" />
                  <line x1="10" y1="2" x2="10" y2="18" />
                </svg>
              </FNavigateButton>

              <svg title="Upload" className="cl_Icon_S_BrightBG cl_Icon_S" onClick={() => this.props.handleImportSession()} style={{ height: "5vh", width: "5vh", margin: "auto 1vw" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <polyline points="6 9 10 5 14 9" />
                <line x1="10" y1="7" x2="10" y2="18" />
                <line x1="2" y1="18" x2="18" y2="18" />
              </svg>

              <svg
                title="Filter"
                className="cl_Icon_S_BrightBG_Disabled cl_Icon_S"
                onClick={() => this.open_filer()}
                style={{ height: "5vh", width: "5vh", margin: "auto 1vw", fill: "var(--bg-bright)" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <line x1="6" y1="2" x2="6" y2="28" />
                <line x1="15" y1="2" x2="15" y2="28" />
                <line x1="24" y1="2" x2="24" y2="28" />
                <circle cx="6" cy="24" r="4" />
                <circle cx="15" cy="8" r="4" />
                <circle cx="24" cy="20" r="4" />
              </svg>

              {(() => {
                if (this.props.selectedCMS !== undefined) {
                  return <button style={{ padding: "0vh 2.5vw", margin: "auto", marginRight: "2.5vw" }}>Test Site</button>;
                }
              })()}
            </div>
          </div>
        </div>
        <CConfirm ref={this.ref_Confirm_LogOut} accept={() => this.props.logout()}>
          You are about to log out. All locale storage from the MyDesigns section will be deleted. In case of a guest login the data is irrevocably gone. Make sure that you have saved all data in a session file. Click on <strong>"Accept"</strong> to
          continue the log out process.
        </CConfirm>
        <CConfirm ref={this.ref_Confirm_ClearSession} accept={() => this.props.handleClearSession()}>
          You are about to clear this session. All data will be lost. Make sure that you have saved your data. Click on <strong>"Accept"</strong> to continue the process.
        </CConfirm>
        <CMenu ref={this.ref_Menu} handleRefreshTabInfo={this.props.handleRefreshTabInfo.bind(this)}>
          <button className="cl_button_Bright" style={{ width: "20vw", margin: "1vh auto", display: "none" }} disabled>
            Account Settings
          </button>
          <button className="cl_button_Bright" style={{ width: "20vw", margin: "1vh auto", display: "none" }} disabled>
            Color Settings
          </button>
          <button
            className="cl_button_Bright"
            onClick={() => {
              this.ref_Menu.current.close();
              this.ref_Confirm_ClearSession.current.activate();
            }}
            style={{ width: "20vw", margin: "1vh auto" }}
          >
            Clear Session
          </button>
        </CMenu>
      </div>
    );
  }
}

export default CMyDesigns;
