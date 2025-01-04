// React
import React, { Component } from "react";

import { BrowserRouter as Router, useRoutes, Routes, Route } from "react-router-dom";

// Pages General
import CHome from "./Pages/Home/c_level0_home.jsx";
import CContact from "./Pages/Contact/c_level0_contact.jsx";
import CGitInfo from "./Pages/GitInfo/c_level0_gitinfo.jsx";
import CDocu from "./Pages/Documentation/c_level0_docu.jsx";
import CImpressum from "./Pages/Impressum/c_level0_impressum.jsx";
import CError404 from "./Pages/Error/c_level0_error404.jsx";
import CSettings from "./Pages/Settings/c_level0_settings.jsx";
// Pages Tool
import C_ToolStart from "./CCCTool/Pages/C_ToolStart/c_level0_toolstart";
import C_NewCMS from "./CCCTool/Pages/C_NewCMS/c_level0_newCMS";
import CMyDesigns from "./CCCTool/Pages/C_MyDesigns/c_level0_mydesigns";
import CEdit from "./CCCTool/Pages/C_Edit/c_edit";
import CExport from "./CCCTool/Pages/C_Export/c_export";
// Components
import CConfirm from "./Elements/PopUps/c_confirm";
import CTextBox from "./Elements/PopUps/c_textBox";

// Libs
import { CMS } from "ccctool-lib/lib/cms/class_cms";

// Style
import "./App.css";

//const AppWrapper = () => {
class AppWrapper extends Component {
  constructor() {
    super();

    this.ref_Loader = React.createRef();
    this.ref_Confirm_LoadSession = React.createRef();
    this.ref_WarningBox = React.createRef();
    this.sessionUpdated = false;
    this.workCMS = new CMS();
    this.uploadedSessionType = undefined;
    this.uploadedSessionContent = undefined;
    this.lastSessionUpdateInMs = null;

    this.state = {
      isCCCSession: true, // needed for the export/import to identify session json files.
      session: [
        {
          isGroup: false,
          uniqueID: crypto.randomUUID(),
          cms: {
            isCMS: true,
            creationDate: 637390800000,
            lastUpdateDate: 637390800000,
            cmsType: "ccc",
            name: "Example for a CMS (Simple Grey Scaled)",
            interpolationSpace: "lab",
            interpolationType: "linear",
            colorNaN: { space: "rgb", c1: 0, c2: 0, c3: 0 },
            colorBelow: { space: "rgb", c1: 0, c2: 0, c3: 1 },
            colorAbove: { space: "rgb", c1: 1, c2: 0, c3: 0 },
            keys: [
              { cL: { space: undefined, c1: undefined, c2: undefined, c3: undefined }, cR: { space: "rgb", c1: 0, c2: 0, c3: 0 }, ref: 0, isBur: false, mot: false },
              { cL: { space: "rgb", c1: 1, c2: 1, c3: 1 }, cR: { space: undefined, c1: undefined, c2: undefined, c3: undefined }, ref: 1.0, isBur: false, mot: false },
            ],
            jnd: 1,
          },
        },
        {
          isGroup: true,
          groupName: "Example for a Group (Group Red)",
          cmsObjects: [
            {
              uniqueID: crypto.randomUUID(),
              cms: {
                isCMS: true,
                creationDate: 637390800001,
                lastUpdateDate: 637390800001,
                cmsType: "ccc",
                name: "Red 1",
                interpolationSpace: "lab",
                interpolationType: "linear",
                colorNaN: { space: "rgb", c1: 0, c2: 0, c3: 0 },
                colorBelow: { space: "rgb", c1: 0, c2: 0, c3: 1 },
                colorAbove: { space: "rgb", c1: 1, c2: 0, c3: 0 },
                keys: [
                  { cL: { space: undefined, c1: undefined, c2: undefined, c3: undefined }, cR: { space: "rgb", c1: 1, c2: 0, c3: 0 }, ref: 0, isBur: false, mot: false },
                  { cL: { space: "rgb", c1: 0, c2: 0, c3: 0 }, cR: { space: undefined, c1: undefined, c2: undefined, c3: undefined }, ref: 1.0, isBur: false, mot: false },
                ],
                jnd: 1,
              },
            },
            {
              uniqueID: crypto.randomUUID(),
              cms: {
                isCMS: true,
                creationDate: 637390800001,
                lastUpdateDate: 637390800002,
                cmsType: "ccc",
                name: "Red 2",
                interpolationSpace: "lab",
                interpolationType: "linear",
                colorNaN: { space: "rgb", c1: 0, c2: 0, c3: 0 },
                colorBelow: { space: "rgb", c1: 0, c2: 0, c3: 1 },
                colorAbove: { space: "rgb", c1: 1, c2: 0, c3: 0 },
                keys: [
                  { cL: { space: undefined, c1: undefined, c2: undefined, c3: undefined }, cR: { space: "rgb", c1: 0, c2: 0, c3: 0 }, ref: 0, isBur: false, mot: false },
                  { cL: { space: "rgb", c1: 0.85, c2: 0.2, c3: 0.2 }, cR: { space: undefined, c1: undefined, c2: undefined, c3: undefined }, ref: 1.0, isBur: false, mot: false },
                ],
                jnd: 1,
              },
            },
          ],
        }, //*/
      ],
      selectedCMSUniqueId: undefined, // change to unique ID!!!!
      selectedCMS: undefined,
    };
  }

  componentDidMount() {
    window.addEventListener("focus", this.onFocus);
    window.addEventListener("storage", this.onStorageEvent);
    this.loadLocalStroageCssVariables();

    let stateUpdate = {};
    stateUpdate.selectedCMSUniqueId = undefined;
    stateUpdate.selectedCMS = undefined;

    let ls_selectedCMSUniqueId = undefined;

    let ls_session = window.localStorage.getItem("ccc_session");
    this.lastSessionUpdateInMs = parseInt(window.localStorage.getItem("ccc_lastSessionUpdate"), 10);
    this.lastSessionUpdateInMs = this.lastSessionUpdateInMs == null ? Date.now() : this.lastSessionUpdateInMs;
    if (ls_session !== null) stateUpdate.session = JSON.parse(ls_session);
    this.sessionUpdated = true;
    this.setState(stateUpdate);
  }

  componentWillUnmount() {
    /////////////////////////////////////////////////////
    ////////              Events
    window.removeEventListener("focus", this.onFocus);
    window.removeEventListener("storage", this.onStorageEvent);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.sessionUpdated) {
      this.sessionUpdated = false;
      window.localStorage.setItem("ccc_session", JSON.stringify(this.state.session));
      window.localStorage.setItem("ccc_lastSessionUpdate", Date.now());
    }

    // Check if state values have changes
    /*
    Example
    if (JSON.stringify(prevState.someStateVariable) !== JSON.stringify(this.state.someStateVariable)) {
      // do something
    }*/
  }

  onFocus = () => {
    const storedLastSessionTime = window.localStorage.getItem("ccc_lastSessionUpdate");
    if (storedLastSessionTime === null) {
      window.localStorage.setItem("ccc_lastSessionUpdate", this.lastSessionUpdateInMs);
    } else {
      // An update could be happend in another tab
      if (this.lastSessionUpdateInMs < parseInt(storedLastSessionTime, 10)) {
        this.loadLocalStorageSession();
      }
    }
  };

  onStorageEvent = (event) => {
    alert(event.key);
    if (event.key === "ccc_lastSessionUpdate") {
      this.loadLocalStorageSession();
    }

    //Change Page Style
    if (event.key === "ccc_pageCSSVariablesUpdate") {
      this.loadLocalStroageCssVariables();
    }
  };

  loadLocalStroageCssVariables() {
    const cssVariablesString = window.localStorage.getItem("ccc_pageCSSVariablesUpdate");
    if (cssVariablesString !== null) {
      const cssVariablesJSON = JSON.parse(cssVariablesString);
      for (const [key, value] of Object.entries(cssVariablesJSON)) {
        document.documentElement.style.setProperty(key, value);
      }
    }
  }

  loadLocalStorageSession() {
    let ls_session = window.localStorage.getItem("ccc_session");
    if (ls_session !== null) {
      let stateUpdate = {};
      stateUpdate.selectedCMS = undefined;
      stateUpdate.session = JSON.parse(ls_session);
      stateUpdate.selectedCMS = undefined;
      stateUpdate.selectedCMSUniqueId = undefined;
      if (this.state.selectedCMSUniqueId !== undefined) {
        let cmsJSON = null;
        for (const cmsItem of stateUpdate.session) {
          if (cmsItem.isGroup === false && cmsItem.uniqueID === this.state.selectedCMSUniqueId) {
            cmsJSON = cmsItem.cms;
          }
          if (cmsItem.isGroup === true) {
            for (const groupCmsItem of cmsItem.cmsObjects) {
              if (groupCmsItem.uniqueID === this.state.selectedCMSUniqueId) {
                return groupCmsItem.cms;
              }
            }
          }
        }
        if (cmsJSON !== null) {
          stateUpdate.selectedCMSUniqueId = this.state.selectedCMSUniqueId;
          stateUpdate.selectedCMS = new CMS();
          stateUpdate.selectedCMS.setByJSON(stateUpdate.session[stateUpdate.selectedCMSObjIndex].cms);
        }
      }
      this.sessionUpdated = true;
      this.setState(stateUpdate);
    }
  }

  render() {
    return (
      <div style={{ background: "var(--bg-app)" }}>
        <Router basename="/CCC-Tool-2">
          <Routes>
            <Route path="/" element={<CHome />}></Route>
            <Route path="/git" element={<CGitInfo />}></Route>
            <Route path="/contact" element={<CContact />}></Route>
            <Route path="/docu" element={<CDocu />}></Route>
            <Route path="/impressum" element={<CImpressum />}></Route>
            <Route path="/settings" element={<CSettings />}></Route>
            <Route path="/tool/start" element={<C_ToolStart />}></Route>
            <Route path="*" element={<CError404 />}></Route>
          </Routes>
          <input ref={this.ref_Loader} type="file" onChange={this.startLoadFile.bind(this)} style={{ display: "none" }} accept=".csv, .xml, .json"></input>

          <CConfirm ref={this.ref_Confirm_LoadSession} accept={() => this.overwriteSession()}>
            You are about to load another session. The current session will be replaced and all data will be lost. Make sure that you have saved your data. Click on <strong>"Accept"</strong> to continue the load process.
          </CConfirm>
          <CTextBox ref={this.ref_WarningBox} warnText="Warning Text"></CTextBox>
        </Router>
      </div>
    );
  }
  /*
  <Route
            path="/tool/mydesigns"
            element={
              <CMyDesigns
                handleSelectCMS={this.handleSelectCMS}
                handleEraseSelectedCMS={this.handleEraseSelectedCMS}
                handleDuplicateSelectedCMS={this.handleDuplicateSelectedCMS}
                handleSetFilter={this.handleSetFilter}
                handleExportSession={this.handleExportSession}
                handleImportSession={this.handleImportSession}
                handleGetSessionCMSImg={this.handleGetSessionCMSImg}
                handleClearSession={this.handleClearSession}
                handleOpenTextBox={this.handleOpenTextBox}
                session={this.state.session}
                filter={this.state.filter}
                selectedCMSUniqueId={this.state.selectedCMSUniqueId}
                selectedCMS={this.state.selectedCMS}
              />
            }
          />
          <Route path="/tool/new" element={<C_NewCMS />}></Route>
          <Route path="/tool/edit" render={() => (this.isCMSSelected() ? <CEdit selectedCMS={this.state.selectedCMS} /> : <Navigate to="/tool/mydesigns" />)} />
          <Route path="/tool/export" render={() => (this.isCMSSelected() ? <CExport handleOpenTextBox={this.handleOpenTextBox} selectedCMS={this.state.selectedCMS} /> : <Navigate to="/tool/mydesigns" />)} />
        
  */

  /* MyDesigns related methods*/
  isCMSSelected = () => {
    if (this.state.selectedCMS !== undefined) return true;
    else return false;
  };

  handleSelectCMS = (_cmsObjID, _cmsID) => {
    /*let cmsJSON = undefined;
    if (_cmsObjID !== undefined && _cmsID !== undefined) {
      if (_cmsObjID < this.state.session.length) {
        if (this.state.session[_cmsObjID].isGroup) {
          if (_cmsID < this.state.session[_cmsObjID].cmsObjects.length) cmsJSON = this.state.session[_cmsObjID].cmsObjects[_cmsID];
        } else {
          cmsJSON = this.state.session[_cmsObjID].cms;
        }
      }
    }
    let cms = new CMS();
    cms.setByJSON(cmsJSON);
    this.setState({ selectedCMSUniqueId: _cmsID, selectedCMS: cms });*/
  };

  handleEraseSelectedCMS = () => {
    /*let tmpSession = [...this.state.session];
    if (tmpSession[this.state.selectedCMSObjIndex].isGroup) {
      if (tmpSession[this.state.selectedCMSObjIndex].cmsObjects.length < 2) {
        // delete the complete Group
        tmpSession.splice(this.state.selectedCMSObjIndex, 1);
      } else {
        // delete a single CMS in the group
        tmpSession[this.state.selectedCMSObjIndex].cmsObjects.splice(this.state.selectedCMSUniqueId, 1);
      }
    } else {
      tmpSession.splice(this.state.selectedCMSObjIndex, 1);
    }

    this.sessionUpdated = true;
    this.setState({ session: tmpSession, selectedCMSObjIndex: undefined, selectedCMSUniqueId: undefined, selectedCMS: undefined });
    */
    // attetion: we neet so set the to an emty array. In the componentDidUpdate method we apply the filter on the new session.
  };

  handleDuplicateSelectedCMS = () => {
    /*let currentTime = new Date(); // we use the creation date and the last update as unique identificator. With the duplication the new cms has the same creation date, but we update the last modification date.
    let tmpSession = [...this.state.session];
    this.sessionUpdated = true;
    if (tmpSession[this.state.selectedCMSObjIndex].isGroup) {
      let copy = this.state.session[this.state.selectedCMSObjIndex].cmsObjects[this.state.selectedCMSUniqueId];
      copy.lastUpdateDate = currentTime.getTime();
      tmpSession[this.state.selectedCMSObjIndex].cmsObjects.push(copy);
      this.setState({ session: tmpSession});
    } else {
      let copy = this.state.session[this.state.selectedCMSObjIndex].cms;
      let copy2 = this.state.session[this.state.selectedCMSObjIndex].cms;
      copy2.lastUpdateDate = currentTime.getTime();
      let newGroup = { isGroup: true, groupName: copy.name + " Duplication", cmsObjects: [copy2, copy] };
      tmpSession[this.state.selectedCMSObjIndex] = newGroup;
      let tmpObjID = this.state.selectedCMSObjIndex;
      let cms = new CMS();
      cms.setByJSON(copy);
      this.setState({ session: tmpSession, selectedCMSObjIndex: tmpObjID, selectedCMSUniqueId: 0, selectedCMS: cms });
    }*/
  };

  handleClearSession = () => {
    /*this.sessionUpdated = true;
    this.setState({ session: [], selectedCMSObjIndex: undefined, selectedCMSUniqueId: undefined, selectedCMS: undefined });*/
  };

  handleGetSessionCMSImg = (_cmsObjID, _cms_id, _width, _height) => {
    /*if (this.state.session[_cmsObjID].isGroup) {
      if (_cmsObjID < this.state.session.length) {
        if (_cms_id < this.state.session[_cmsObjID].cmsObjects.length) this.workCMS.setByJSON(this.state.session[_cmsObjID].cmsObjects[_cms_id]);
        else return new ImageData(_width, _height);
      } else return new ImageData(_width, _height);
    } else {
      if (_cmsObjID < this.state.session.length) this.workCMS.setByJSON(this.state.session[_cmsObjID].cms);
      else return new ImageData(_width, _height);
    }
    let img = this.workCMS.drawCMS(_width, _height, false, false, 1.0);
    return img;*/
  };

  handleExportSession = () => {
    /*if (this.state.session.length === 0) {
      //openAlert("The MyDesigns list is empty");
      this.handleOpenTextBox("WARNING", "Your MyDesigns list is empty. An export is not possible.");
      return;
    }

    var filename;
    var text;

    var d = new Date();
    var dayText = d.getDate() + "";
    var monthText = d.getMonth() + "";

    if (d.getDate() < 10) dayText = 0 + dayText;

    if (d.getMonth() < 10) monthText = 0 + monthText;

    filename = "ccc-tool_session_" + d.getFullYear() + monthText + dayText + ".json";

    let stateCopy = this.state;
    stateCopy.selectedCMSObjIndex = undefined;
    stateCopy.selectedCMSUniqueId = undefined;
    stateCopy.selectedCMS = undefined;
    text = JSON.stringify(stateCopy);

    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);*/
  };

  handleImportSession = () => {
    this.ref_Loader.current.click();
    // Check if XML, CMS, JSON
    // IF XML -> check if old session or single CMS
    // IF JSON -> check if new session or single CMS
  };

  startLoadFile(e) {
    let tmpFile = e.target.files[0];
    let fileName = tmpFile.name;
    let fileExtension = fileName.replace(/^.*\./, "");
    let reader = new FileReader();
    reader.onload = (e) => {
      this.fileReading(e, fileExtension);
    };
    reader.readAsText(tmpFile);
  }

  fileReading(e, _fileExtension) {
    let content = e.target.result;

    switch (_fileExtension) {
      case "xml":
      case "XML":
        let dp = new DOMParser();
        let xmlObject = dp.parseFromString(content, "text/xml");
        let sessionObject = xmlObject.getElementsByTagName("CCCToolSession");
        if (sessionObject.length > 0) {
          // XML Object is a session from the old CCC-Tool
          this.uploadedSessionContent = xmlObject;
          this.uploadedSessionType = "xml";
          this.ref_Confirm_LoadSession.current.activate();
          return;
        } else {
          // XML CMS
          let xmlCMS = xmlObject.getElementsByTagName("ColorMap");
          console.log(xmlCMS.length);
          if (xmlCMS.length > 0) this.workCMS.parser_XML(xmlCMS[0]);
        }
        break;
      case "json":
      case "JSON":
        let jsonObj = JSON.parse(content);

        if ("isCCCSession" in jsonObj) {
          this.uploadedSessionContent = jsonObj;
          this.uploadedSessionType = "json";
          this.ref_Confirm_LoadSession.current.activate();
          return;
        } else {
          this.workCMS.parser_JSON(jsonObj);
        }
        break;
      case "csv":
      case "CSV":
        this.workCMS.parser_CSV(content);
        break;
      default:
        alert("Error at readCMSFile function -> file extension is unknown!");
        return;
    }

    let tmpCMS = {
      uniqueID: crypto.randomUUID(),
      isGroup: false,
      cms: this.workCMS.getCMSJSON(),
    };
    let tmpSession = [...this.state.session];
    this.sessionUpdated = true;
    tmpSession.push(tmpCMS);
    this.setState({ session: tmpSession });
  }

  overwriteSession() {
    let sessionUpdateState = { selectedCMSObjIndex: undefined, selectedCMSUniqueId: undefined, selectedCMS: undefined };
    switch (this.uploadedSessionType) {
      case "xml":
        // set Settings
        if (this.uploadedSessionContent.getElementsByTagName("settings").length !== 0) {
          ////// DE 2000
          if (this.uploadedSessionContent.getElementsByTagName("de2000_k_L").length !== 0) sessionUpdateState.de2000_k_L = parseFloat(this.uploadedSessionContent.getElementsByTagName("de2000_k_L")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("de2000_k_C").length !== 0) sessionUpdateState.de2000_k_C = parseFloat(this.uploadedSessionContent.getElementsByTagName("de2000_k_C")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("de2000_k_H").length !== 0) sessionUpdateState.de2000_k_H = parseFloat(this.uploadedSessionContent.getElementsByTagName("de2000_k_H")[0].getAttribute("value"));

          ////// DE 94
          if (this.uploadedSessionContent.getElementsByTagName("de94_k_L").length !== 0) sessionUpdateState.de94_k_L = parseFloat(this.uploadedSessionContent.getElementsByTagName("de94_k_L")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("de94_k_C").length !== 0) sessionUpdateState.de94_k_L = parseFloat(this.uploadedSessionContent.getElementsByTagName("de94_k_C")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("de94_k_H").length !== 0) sessionUpdateState.de94_k_L = parseFloat(this.uploadedSessionContent.getElementsByTagName("de94_k_H")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("de94_k_1").length !== 0) sessionUpdateState.de94_k_1 = parseFloat(this.uploadedSessionContent.getElementsByTagName("de94_k_1")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("de94_k_2").length !== 0) sessionUpdateState.de94_k_2 = parseFloat(this.uploadedSessionContent.getElementsByTagName("de94_k_2")[0].getAttribute("value"));

          ////// LAB
          if (this.uploadedSessionContent.getElementsByTagName("cielab_ref_X").length !== 0) sessionUpdateState.cielab_ref_X = parseFloat(this.uploadedSessionContent.getElementsByTagName("cielab_ref_X")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("cielab_ref_Y").length !== 0) sessionUpdateState.cielab_ref_Y = parseFloat(this.uploadedSessionContent.getElementsByTagName("cielab_ref_Y")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("cielab_ref_Z").length !== 0) sessionUpdateState.cielab_ref_Z = parseFloat(this.uploadedSessionContent.getElementsByTagName("cielab_ref_Z")[0].getAttribute("value"));

          ////// DIN99
          if (this.uploadedSessionContent.getElementsByTagName("din99_kE").length !== 0) sessionUpdateState.din99_kE = parseFloat(this.uploadedSessionContent.getElementsByTagName("din99_kE")[0].getAttribute("value"));
          if (this.uploadedSessionContent.getElementsByTagName("din99_kCH").length !== 0) sessionUpdateState.din99_kCH = parseFloat(this.uploadedSessionContent.getElementsByTagName("din99_kCH")[0].getAttribute("value"));
        }

        // read cms
        if (this.uploadedSessionContent.getElementsByTagName("ColorMap").length !== 0) {
          let cmsObjects = this.uploadedSessionContent.getElementsByTagName("ColorMap");
          sessionUpdateState.session = [];
          for (var j = 0; j < cmsObjects.length; j++) {
            this.workCMS.parser_XML(cmsObjects[j]);
            sessionUpdateState.session.push({ uniqueID: crypto.randomUUID(), isGroup: false, cms: this.workCMS.getCMSJSON() });
          }
        }
        this.sessionUpdated = true;
        this.setState(sessionUpdateState);
        break;
      case "json":
        this.sessionUpdated = true;
        this.setState(this.uploadedSessionContent);
        break;
      default:
    }
    this.uploadedSessionContent = undefined;
    this.uploadedSessioType = undefined;
  }

  /**************************************************************************************************
   *  Function    : checkFilterRequirements
   *  Description : check for a cms if the filter requirements are fulfilled
   *  Ouput       : Returns true if the requirements are fulfilled. If not -> false;
   *************************************************************************************************/
  checkFilterRequirements(_objID, _cmsID) {
    return true;
  }

  /**************************************************************************************************
   *  Function    : handleSetFilter
   *  Description : if the filter window is displayed and the user set and apply the filter (from the <C_SelectedView> element)
   *  Ouput       : None
   *************************************************************************************************/
  handleSetFilter = (_filter) => {
    if (_filter !== undefined) {
      this.setState({ filter: _filter });
    }
  };

  /**************************************************************************************************
   **************************************************************************************************
   *******************************************  OTHER  **********************************************
   **************************************************************************************************
   *************************************************************************************************/
  handleOpenTextBox = (_header, _warnText) => {
    this.ref_WarningBox.current.open(_header, _warnText);
  };
}

export default AppWrapper;
