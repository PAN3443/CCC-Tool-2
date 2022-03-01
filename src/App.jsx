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

import { Navigate, Routes, Route } from "react-router-dom";
//import { withRouter } from "react-router-dom";
//import { j } from "react-router";

// Components
import C_CCCTool from "./CCCTool/c_ccctool";
import C_Opening from "./Pages/Opening/c_level0_opening";
import C_Contact from "./Pages/Contact/c_level0_contact";
import C_GitInfo from "./Pages/GitInfo/c_level0_gitinfo";
import C_About from "./Pages/About/c_level0_about";

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
        <Route path="/tool" element={<C_CCCTool />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
