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
import C_Opening from "./C_Pages/C_Opening/c_level0_opening";
import C_Contact from "./C_Pages/C_Contact/c_level0_contact";
import C_GitInfo from "./C_Pages/C_GitInfo/c_level0_gitinfo";
import C_About from "./C_Pages/C_About/c_level0_about";

// Style
import "./App.css";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Routes>
        <Route path="/CCC-Tool-2/" element={<C_Opening />} />
        <Route path="/CCC-Tool-2/git" element={<C_GitInfo />}></Route>
        <Route path="/CCC-Tool-2/contact" element={<C_Contact />}></Route>
        <Route path="/CCC-Tool-2/about" element={<C_About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
