//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: App.jsx
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

// React
import React from "react";

import { Routes, Route } from "react-router-dom";
//import { withRouter } from "react-router-dom";
//import { j } from "react-router";

// Components
import C_CCCTool from "./CCCTool/c_ccctool";
import C_Opening from "./Pages/Opening/c_level0_opening";
import C_Contact from "./Pages/Contact/c_level0_contact";
import C_GitInfo from "./Pages/GitInfo/c_level0_gitinfo";
import C_About from "./Pages/About/c_level0_about";
import C_Error404 from "./Pages/Error/c_level0_error404";

// CCC-Tool Components
/*import C_MyDesigns from "./CCCTool/Pages/C_MyDesigns/c_level0_mydesigns";
import C_Edit from "./CCCTool/Pages/C_Edit/c_edit";
import C_Export from "./CCCTool/Pages/C_Export/c_export";
import C_TestSite from "./CCCTool/Pages/C_TestSite/c_testsite";
import C_GenerateNew from "./CCCTool/Pages/C_GenerateNew/c_level0_generateNew";*/

// Style
import "./App.css";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Routes>
        <Route path="/" element={<C_Opening />} />
        <Route path="/git" element={<C_GitInfo />}></Route>
        <Route path="/contact" element={<C_Contact />}></Route>
        <Route path="/about" element={<C_About />}></Route>
        <Route path="*" element={<C_Error404 />} />
      </Routes>
    </div>
  );
}

//

export default App;

/*





<Route
            path="/tool/"
            element={
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
              />
            }
          />

          <Route path="edit" render={() => (this.isCMSSelected() ? <C_Edit selectedCMS={this.state.selectedCMS} /> : <Navigate to="/" />)} />
          <Route path="testsite" render={() => (this.isCMSSelected() ? <C_TestSite selectedCMS={this.state.selectedCMS} /> : <Navigate to="/" />)} />
          <Route path="export" render={() => (this.isCMSSelected() ? <C_Export handleOpenTextBox={this.handleOpenTextBox} selectedCMS={this.state.selectedCMS} /> : <Navigate to="/" />)} />
          <Route path="generate" element={<C_GenerateNew />}></Route>

*/
