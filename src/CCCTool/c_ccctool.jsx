import React, { Component } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// Components
import CConfirm from "../Elements/PopUps/c_confirm";
import CTextBox from "../Elements/PopUps/c_textBox";

// CCC-Tool Components
import C_ToolStart from "./Pages/C_ToolStart/c_level0_toolstart";
import C_NewCMS from "./Pages/C_NewCMS/c_level0_newCMS";
import CMyDesigns from "./Pages/C_MyDesigns/c_level0_mydesigns";
import CEdit from "./Pages/C_Edit/c_edit";
import CExport from "./Pages/C_Export/c_export";
import CTestSite from "./Pages/C_TestSite/c_testsite";

// Libs
import { CMS } from "ccctool-lib/lib/cms/class_cms";

class CCCCTool extends Component {
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
      selectedCMSUniqueId: undefined,
      selectedCMS: undefined,
    };
  }

  /**************************************************************************************************
   **************************************************************************************************
   ************************************* React Component ********************************************
   **************************************************************************************************
   *************************************************************************************************/

  render() {
    return <div className="App"></div>;
  }
}

export default CCCCTool;
