//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: App.jsx
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

// React
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import C_Confirm from "../C_Elements/c_confirm";
import C_TextBox from "../C_Elements/c_textBox";

// CCC-Tool Components
import C_MyDesigns from "./C_Pages/C_MyDesigns/c_level0_mydesigns";
import C_Edit from "./C_Pages/C_Edit/c_edit";
import C_Export from "./C_Pages/C_Export/c_export";
import C_TestSite from "./C_Pages/C_TestSite/c_testsite";
import C_New from "./C_Pages/C_New/c_level0_new";

// Libs
import { CMS } from "ccctool-lib/lib/cms/class_cms";

class CCCTool extends Component {
  constructor() {
    super();

    this.ref_Loader = React.createRef();
    this.ref_Confirm_LoadSession = React.createRef();
    this.ref_WarningBox = React.createRef();
    this.sessionUpdated = false;
    this.workCMS = new CMS();
    this.uploadedSessionType = undefined;
    this.uploadedSessionContent = undefined;
    this.tabID = undefined;
    this.tabDate = undefined;

    this.state = {
      isCCCSession: true, // needed for the export/import to identify session json files.
      session: [
        {
          isGroup: false,
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

            {
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
          ],
        },
      ],
      filter: {},
      filteredIndices: [],
      selectedCMSObjIndex: undefined,
      selectedCMSIndex: undefined,
      selectedCMS: undefined,
    };
  }

  /**************************************************************************************************
   **************************************************************************************************
   ************************************* React Component ********************************************
   **************************************************************************************************
   *************************************************************************************************/
  componentDidMount() {
    /////////////////////////////////////////////////////
    ////////              Events
    window.addEventListener("unload", this.onUnload); //beforeunload
    window.addEventListener("focus", this.onFocus);
    window.addEventListener("blur", this.onBlur);
    window.addEventListener("storage", this.onStorageEvent);
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    ////////           Local Storage
    let stateUpdate = {};
    stateUpdate.selectedCMSObjIndex = undefined;
    stateUpdate.selectedCMSIndex = undefined;
    stateUpdate.selectedCMS = undefined;
    stateUpdate.filteredIndices = [];

    let ls_selectedCMSObjIndex = window.localStorage.getItem("ccc_selectedCMSObjIndex");
    let ls_selectedCMSIndex = window.localStorage.getItem("ccc_selectedCMSIndex");

    let ls_session = window.localStorage.getItem("ccc_session");
    if (ls_session !== null) stateUpdate.session = JSON.parse(ls_session);

    if (ls_selectedCMSObjIndex !== null && ls_selectedCMSIndex !== null) {
      stateUpdate.selectedCMSObjIndex = parseInt(ls_selectedCMSObjIndex);
      stateUpdate.selectedCMSIndex = parseInt(ls_selectedCMSIndex);

      if (!isNaN(stateUpdate.selectedCMSObjIndex) && !isNaN(stateUpdate.selectedCMSIndex)) {
        if (stateUpdate.selectedCMSObjIndex < stateUpdate.session.length) {
          if (stateUpdate.session[stateUpdate.selectedCMSObjIndex].isGroup) {
            if (stateUpdate.selectedCMSIndex < stateUpdate.session[stateUpdate.selectedCMSObjIndex].cmsObjects.length) {
              stateUpdate.selectedCMS = new CMS();
              stateUpdate.selectedCMS.setByJSON(stateUpdate.session[stateUpdate.selectedCMSObjIndex].cmsObjects[stateUpdate.selectedCMSIndex]);
            }
          } else {
            stateUpdate.selectedCMS = new CMS();
            stateUpdate.selectedCMS.setByJSON(stateUpdate.session[stateUpdate.selectedCMSObjIndex].cms);
          }
        }
      }
    }

    let ls_filter = window.localStorage.getItem("ccc_filter");
    stateUpdate.filter = {};
    if (ls_filter !== null) {
      stateUpdate.filter = JSON.parse(ls_filter);
    }

    this.sessionUpdated = true;
    this.setState(stateUpdate);
    this.determineTabID(true);
  }

  componentWillUnmount() {
    /////////////////////////////////////////////////////
    ////////              Events
    window.removeEventListener("unload", this.onUnload);
    window.removeEventListener("focus", this.onFocus);
    window.removeEventListener("blur", this.onBlur);
    window.removeEventListener("storage", this.onStorageEvent);
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if state values have changes => update local storage, future work (update server data base -> ajax)
    if (prevState.selectedCMSObjIndex !== this.state.selectedCMSObjIndex) window.localStorage.setItem("ccc_selectedCMSObjIndex", this.state.selectedCMSObjIndex);
    if (prevState.selectedCMSObjIndex !== this.state.selectedCMSObjIndex) window.localStorage.setItem("ccc_selectedCMSIndex", this.state.selectedCMSObjIndex);

    // In view to very large sessions, we don't want to stringfy and compare like at the componentDidUpdate method -> we use
    if (this.sessionUpdated) {
      this.sessionUpdated = false;
      this.applyFilter();
      window.localStorage.setItem("ccc_session", JSON.stringify(this.state.session));
      if (this.state.selectedCMSObjIndex !== undefined && this.state.selectedCMSIndex !== undefined) {
        // check if the selectedID are correct anymore
        if (this.state.selectedCMSObjIndex < this.state.session.length) {
          if (this.state.session[this.state.selectedCMSObjIndex].isGroup) {
            if (this.state.selectedCMSIndex >= this.state.session[this.state.selectedCMSObjIndex].cmsObjects.length) this.setState({ selectedCMSObjIndex: undefined, selectedCMSIndex: undefined, selectedCMS: undefined });
          }
        } else this.setState({ selectedCMSObjIndex: undefined, selectedCMSIndex: undefined, selectedCMS: undefined });
      }
    }

    // Check if state values have changes => update local storage, future work (update server data base -> ajax)
    if (JSON.stringify(prevState.filter) !== JSON.stringify(this.state.filter)) {
      window.localStorage.setItem("ccc_filter", JSON.stringify(this.state.filter));
      this.applyFilter();
    }
  }

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  isCMSSelected = () => {
    if (this.state.selectedCMS !== undefined) return true;
    else return false;
  };

  /**************************************************************************************************
   **************************************************************************************************
   *************************************  Tab Synchron  ********************************************
   **************************************************************************************************
   *************************************************************************************************/

  /**************************************************************************************************
   *  Function    : determineTabID
   *  Description : Each tab needs a unique id. We save in the local storage information how much tabs are open and which one is working on a cms.
   *                So we can inform the user if he want to edit/delete such a CMS
   *  Ouput       : none
   *************************************************************************************************/
  determineTabID(doWarning) {
    window.localStorage.setItem("ccc_tabCheck", 1);
    let tabInfo = window.localStorage.getItem("ccc_tabInfo");
    let tabInfoJSON = { tabIDs: [], tabWorkOnCMS: [] }; // the other tabs need the information, if an tab work on a cms.
    if (tabInfo !== null) {
      tabInfoJSON = JSON.parse(tabInfo);
    }

    if (tabInfoJSON.tabIDs.length > 0) {
      if (doWarning)
        this.handleOpenTextBox(
          "WARNING",
          "Your have already another browser tab with the CCC-Tool. All tabs are using a shared local storage. ATTENTION: If you modify a CMS in this tab, the sessions of the other tabs will be automatically updated. If you have trouble with the tab synchronisation, please clear the tab storage in the menue (press Esc)."
        );
      this.tabID = tabInfoJSON.tabIDs[tabInfoJSON.tabIDs.length - 1] + 1;
    } else this.tabID = 0;

    tabInfoJSON.tabIDs.push(this.tabID);
    tabInfoJSON.tabWorkOnCMS.push([this.state.selectedCMSObjIndex, this.state.selectedCMSIndex]);

    document.title = "CCC-Tool (" + this.tabID + ")";
    window.localStorage.setItem("ccc_tabInfo", JSON.stringify(tabInfoJSON));
    this.tabDate = new Date();
  }

  /**************************************************************************************************
   *  Function    : onUnload
   *  Description : With this function we delete the tab information from the local storage
   *  Ouput       : none
   *************************************************************************************************/
  onUnload = (e) => {
    // remove tab information
    let myIndex = this.getTabIDIndex();
    let tabInfo = window.localStorage.getItem("ccc_tabInfo");
    if (tabInfo !== null) {
      let tabInfoJSON = JSON.parse(tabInfo);
      tabInfoJSON.tabIDs.splice(myIndex, 1);
      tabInfoJSON.tabWorkOnCMS.splice(myIndex, 1);
      window.localStorage.setItem("ccc_tabInfo", JSON.stringify(tabInfoJSON));
    }
  };

  /**************************************************************************************************
   *  Function    : onBlur
   *  Description : If this tab lost the focus we update the tabinformation in the local storage
   *                The information of the
   *  Ouput       : none
   *************************************************************************************************/
  onBlur = () => {
    // this tab lost its focus
    //console.log("onBlur");
  };

  /**************************************************************************************************
   *  Function    : onFocus
   *  Description : We need to synchronize the session information with the local storage.
   *                We have to check if the selected CMS is inside the current session
   *  Ouput       : none
   *************************************************************************************************/
  onFocus = () => {
    // this tab is in focus

    // Check for Tab Refresh
    let ls_tabRefresh = window.localStorage.getItem("ccc_tabResetDate");
    if (ls_tabRefresh !== null) {
      if (this.tabDate.getTime() < parseInt(ls_tabRefresh)) {
        this.determineTabID(false);
      }
    }

    // Check Login
    if (localStorage.getItem("loggedIn") === "true") {
      if (window.location.pathname === "/login") this.handleGo2Page("/mydesigns");

      let ls_session = window.localStorage.getItem("ccc_session");
      if (ls_session !== null) {
        let stateUpdate = {};

        stateUpdate.selectedCMS = undefined;
        stateUpdate.filteredIndices = [];
        stateUpdate.session = JSON.parse(ls_session);
        stateUpdate.selectedCMSObjIndex = undefined;
        stateUpdate.selectedCMSIndex = undefined;

        if (this.state.selectedCMSObjIndex !== undefined) {
          //we need to check if the selected CMS in this session exist in the new Session

          let tmpCDate = undefined;
          let tmpLUDate = undefined;

          if (this.state.session[this.state.selectedCMSObjIndex].isGroup) {
            tmpCDate = parseInt(this.state.session[this.state.selectedCMSObjIndex].cmsObjects[this.state.selectedCMSIndex].creationDate);
            tmpLUDate = parseInt(this.state.session[this.state.selectedCMSObjIndex].cmsObjects[this.state.selectedCMSIndex].lastUpdateDate);
          } else {
            tmpCDate = parseInt(this.state.session[this.state.selectedCMSObjIndex].cms.creationDate);
            tmpLUDate = parseInt(this.state.session[this.state.selectedCMSObjIndex].cms.lastUpdateDate);
          }

          for (let objIndex = 0; objIndex < stateUpdate.session.length; objIndex++) {
            if (stateUpdate.session[objIndex].isGroup) {
              let found = false;
              for (let cmsIndex = 0; cmsIndex < stateUpdate.session[objIndex].cmsObjects.length; cmsIndex++) {
                if (tmpCDate === parseInt(stateUpdate.session[objIndex].cmsObjects[cmsIndex].creationDate) && tmpLUDate === parseInt(stateUpdate.session[objIndex].cmsObjects[cmsIndex].lastUpdateDate)) {
                  stateUpdate.selectedCMSObjIndex = objIndex;
                  stateUpdate.selectedCMSIndex = cmsIndex;
                  found = true;
                  break;
                }
              } // for loop (cmsIndex)
              if (found) break; // break also outer for loop
            } else {
              if (tmpCDate === parseInt(stateUpdate.session[objIndex].cms.creationDate) && tmpLUDate === parseInt(stateUpdate.session[objIndex].cms.lastUpdateDate)) {
                stateUpdate.selectedCMSObjIndex = objIndex;
                stateUpdate.selectedCMSIndex = objIndex;
                break;
              }
            }
          } // for loop (objIndex)

          if (stateUpdate.selectedCMSObjIndex === undefined) {
            this.handleOpenTextBox("WARNING", "The activ CMS of this tab was removed in another tab. The tool has deselect the CMS and relocate this tab to the MyDesigns page.");
          } else {
            stateUpdate.selectedCMS = new CMS();
            if (stateUpdate.session[stateUpdate.selectedCMSObjIndex].isGroup) stateUpdate.selectedCMS.setByJSON(stateUpdate.session[stateUpdate.selectedCMSObjIndex].cmsObjects[stateUpdate.selectedCMSIndex]);
            else stateUpdate.selectedCMS.setByJSON(stateUpdate.session[stateUpdate.selectedCMSObjIndex].cms);
          }
        }

        this.sessionUpdated = true;
        this.setState(stateUpdate);
      }
    } else this.handleGo2Page("/login");
  };

  onStorageEvent = () => {
    //console.log("Storage Event", window.localStorage.getItem("ccc_tabInfo"), this.tabID);
  };

  handleRefreshTabInfo = () => {
    window.localStorage.setItem("ccc_tabResetDate", new Date().getTime());
    window.localStorage.setItem("ccc_tabInfo", JSON.stringify({ tabIDs: [], tabWorkOnCMS: [] }));
    this.determineTabID(false);
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  getTabIDIndex() {
    let tabInfo = window.localStorage.getItem("ccc_tabInfo");
    if (tabInfo !== null) {
      let tabInfoJSON = JSON.parse(tabInfo);
      for (let index = 0; index < tabInfoJSON.tabIDs.length; index++) {
        if (tabInfoJSON.tabIDs[index] === this.tabID) {
          return index;
        }
      }
    }
    return undefined;
  }

  /**************************************************************************************************
   **************************************************************************************************
   ************************************* Session Methods ********************************************
   **************************************************************************************************
   *************************************************************************************************/

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleSelectCMS = (_cmsObjID, _cmsID) => {
    let cmsJSON = undefined;
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
    this.setState({ selectedCMSObjIndex: _cmsObjID, selectedCMSIndex: _cmsID, selectedCMS: cms });
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleEraseSelectedCMS = () => {
    let tmpSession = [...this.state.session];
    if (tmpSession[this.state.selectedCMSObjIndex].isGroup) {
      if (tmpSession[this.state.selectedCMSObjIndex].cmsObjects.length < 2) {
        // delete the complete Group
        tmpSession.splice(this.state.selectedCMSObjIndex, 1);
      } else {
        // delete a single CMS in the group
        tmpSession[this.state.selectedCMSObjIndex].cmsObjects.splice(this.state.selectedCMSIndex, 1);
      }
    } else {
      tmpSession.splice(this.state.selectedCMSObjIndex, 1);
    }

    this.sessionUpdated = true;
    this.setState({ session: tmpSession, filteredIndices: [], selectedCMSObjIndex: undefined, selectedCMSIndex: undefined, selectedCMS: undefined });
    // attetion: we neet so set the filteredIndices to an emty array. In the componentDidUpdate method we apply the filter on the new session.
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleDuplicateSelectedCMS = () => {
    let currentTime = new Date(); // we use the creation date and the last update as unique identificator. With the duplication the new cms has the same creation date, but we update the last modification date.
    let tmpSession = [...this.state.session];
    this.sessionUpdated = true;
    if (tmpSession[this.state.selectedCMSObjIndex].isGroup) {
      let copy = this.state.session[this.state.selectedCMSObjIndex].cmsObjects[this.state.selectedCMSIndex];
      copy.lastUpdateDate = currentTime.getTime();
      tmpSession[this.state.selectedCMSObjIndex].cmsObjects.push(copy);
      this.setState({ session: tmpSession, filteredIndices: [] });
    } else {
      let copy = this.state.session[this.state.selectedCMSObjIndex].cms;
      let copy2 = this.state.session[this.state.selectedCMSObjIndex].cms;
      copy2.lastUpdateDate = currentTime.getTime();
      let newGroup = { isGroup: true, groupName: copy.name + " Duplication", cmsObjects: [copy2, copy] };
      tmpSession[this.state.selectedCMSObjIndex] = newGroup;
      let tmpObjID = this.state.selectedCMSObjIndex;
      let cms = new CMS();
      cms.setByJSON(copy);
      this.setState({ session: tmpSession, filteredIndices: [], selectedCMSObjIndex: tmpObjID, selectedCMSIndex: 0, selectedCMS: cms });
    }
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleClearSession = () => {
    this.sessionUpdated = true;
    this.setState({ session: [], filteredIndices: [], selectedCMSObjIndex: undefined, selectedCMSIndex: undefined, selectedCMS: undefined });
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleGetSessionCMSImg = (_cmsObjID, _cms_id, _width, _height) => {
    if (this.state.session[_cmsObjID].isGroup) {
      if (_cmsObjID < this.state.session.length) {
        if (_cms_id < this.state.session[_cmsObjID].cmsObjects.length) this.workCMS.setByJSON(this.state.session[_cmsObjID].cmsObjects[_cms_id]);
        else return new ImageData(_width, _height);
      } else return new ImageData(_width, _height);
    } else {
      if (_cmsObjID < this.state.session.length) this.workCMS.setByJSON(this.state.session[_cmsObjID].cms);
      else return new ImageData(_width, _height);
    }
    let img = this.workCMS.drawCMS(_width, _height, false, false, 1.0);
    return img;
  };

  /**************************************************************************************************
   **************************************************************************************************
   *************************************  Import/Export  ********************************************
   **************************************************************************************************
   *************************************************************************************************/

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleExportSession = () => {
    if (this.state.session.length == 0) {
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
    stateCopy.selectedCMSIndex = undefined;
    stateCopy.selectedCMS = undefined;
    stateCopy.filteredIndices = [];
    text = JSON.stringify(stateCopy);

    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  handleImportSession = () => {
    this.ref_Loader.current.click();
    // Check if XML, CMS, JSON
    // IF XML -> check if old session or single CMS
    // IF JSON -> check if new session or single CMS
  };

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
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

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
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
      isGroup: false,
      cms: this.workCMS.getCMSJSON(),
    };
    let tmpSession = [...this.state.session];
    this.sessionUpdated = true;
    tmpSession.push(tmpCMS);
    this.setState({ session: tmpSession, filteredIndices: [] });
  }

  /**************************************************************************************************
   *  Function    :
   *  Description :
   *  Ouput       :
   *************************************************************************************************/
  overwriteSession() {
    let sessionUpdateState = { filteredIndices: [], selectedCMSObjIndex: undefined, selectedCMSIndex: undefined, selectedCMS: undefined };
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
            sessionUpdateState.session.push({ isGroup: false, cms: this.workCMS.getCMSJSON() });
          }
        }
        this.sessionUpdated = true;
        this.setState(sessionUpdateState);
        break;
      case "json":
        this.sessionUpdated = true;
        this.setState(this.uploadedSessionContent);
        break;
    }
    this.uploadedSessionContent = undefined;
    this.uploadedSessioType = undefined;
  }

  /**************************************************************************************************
   **************************************************************************************************
   ****************************************   Filter   **********************************************
   **************************************************************************************************
   *************************************************************************************************/

  /**************************************************************************************************
   *  Function    : applyFilter
   *  Description : determine the filtered indices by appling the state filter
   *  Ouput       : None
   *************************************************************************************************/
  applyFilter = () => {
    let indices = [];
    for (let index = 0; index < this.state.session.length; index++) {
      if (this.state.session[index].isGroup) {
        let groupIndices = [];
        for (let j = 0; j < this.state.session[index].cmsObjects.length; j++) {
          if (this.checkFilterRequirements(j, index)) groupIndices.push(j);
        }
        if (groupIndices.length > 0) indices.push([true, index, groupIndices]);
      } else {
        if (this.checkFilterRequirements(index, index)) indices.push([false, index, index]);
      }
    }
    this.setState({ filteredIndices: indices });
  };

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
   ******************************************** User ************************************************
   **************************************************************************************************
   *************************************************************************************************/

  /**************************************************************************************************
   *  Function    : logIn
   *  Description : Log In for users
   *  Ouput       : None
   *************************************************************************************************/
  /*logIn = (_id) => {
    localStorage.setItem("userID", _id);
    localStorage.setItem("loggedIn", true);
    this.handleGo2Page("/ccctool/mydesigns");
  };*/

  /**************************************************************************************************
   *  Function    : logout
   *  Description :
   *  Ouput       : None
   *************************************************************************************************/
  /*logout = () => {
    localStorage.clear();
    this.handleGo2Page("/login");
  };*/

  /**************************************************************************************************
   *  Function    : isLoggedIn
   *  Description : Allows to check if a user is logged in the tool.
   *  Ouput       : Boolean
   *************************************************************************************************/
  /*isLoggedIn = () => {
    switch (localStorage.getItem("loggedIn") === "true") {
      case "true":
      case true:
      case "1":
      case 1:
        return true;
      default:
        return false;
    }
  };*/

  /**************************************************************************************************
   **************************************************************************************************
   *******************************************  OTHER  **********************************************
   **************************************************************************************************
   *************************************************************************************************/
  handleOpenTextBox = (_header, _warnText) => {
    this.ref_WarningBox.current.open(_header, _warnText);
  };

  /**************************************************************************************************
   **************************************************************************************************
   ******************************************** Render **********************************************
   **************************************************************************************************
   *************************************************************************************************/
  render() {
    return (
      <div className="App">
        <input ref={this.ref_Loader} type="file" onChange={this.startLoadFile.bind(this)} style={{ display: "none" }} accept=".csv, .xml, .json"></input>
        <Routes>
          <Route path="/">
            <C_MyDesigns
              handleSelectCMS={this.handleSelectCMS}
              handleEraseSelectedCMS={this.handleEraseSelectedCMS}
              handleDuplicateSelectedCMS={this.handleDuplicateSelectedCMS}
              handleSetFilter={this.handleSetFilter}
              handleExportSession={this.handleExportSession}
              handleImportSession={this.handleImportSession}
              handleGetSessionCMSImg={this.handleGetSessionCMSImg}
              handleClearSession={this.handleClearSession}
              handleRefreshTabInfo={this.handleRefreshTabInfo}
              handleOpenTextBox={this.handleOpenTextBox}
              session={this.state.session}
              filter={this.state.filter}
              filteredIndices={this.state.filteredIndices}
              selectedCMSObjIndex={this.state.selectedCMSObjIndex}
              selectedCMSIndex={this.state.selectedCMSIndex}
              selectedCMS={this.state.selectedCMS}
              handleGo2Page={this.handleGo2Page}
            />
          </Route>
          <Route path="/edit" render={() => (this.isCMSSelected() ? <C_Edit selectedCMS={this.state.selectedCMS} handleGo2Page={this.handleGo2Page} /> : <Navigate to="/login" />)} />
          <Route path="/testsite" render={() => (this.isCMSSelected() ? <C_TestSite selectedCMS={this.state.selectedCMS} handleGo2Page={this.handleGo2Page} /> : <Navigate to="/login" />)} />
          <Route path="/export" render={() => (this.isCMSSelected() ? <C_Export handleOpenTextBox={this.handleOpenTextBox} selectedCMS={this.state.selectedCMS} handleGo2Page={this.handleGo2Page} /> : <Navigate to="/login" />)} />
          <Route path="/new">
            <C_New handleGo2Page={this.handleGo2Page} /> : <Navigate to="/login" />
          </Route>
        </Routes>

        <C_Confirm ref={this.ref_Confirm_LoadSession} accept={() => this.overwriteSession()}>
          You are about to load another session. The current session will be replaced and all data will be lost. Make sure that you have saved your data. Click on <strong>"Accept"</strong> to continue the load process.
        </C_Confirm>
        <C_TextBox ref={this.ref_WarningBox} warnText="Warning Text"></C_TextBox>
      </div>
    );
  }
}

export default CCCTool;
