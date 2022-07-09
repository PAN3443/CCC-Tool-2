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

import { BrowserRouter as Router, useRoutes } from "react-router-dom";
//import { withRouter } from "react-router-dom";
//import { j } from "react-router";

// Components
import CCCCTool from "./CCCTool/c_ccctool";
import CHome from "./Pages/Home/c_level0_home";
import CContact from "./Pages/Contact/c_level0_contact";
import CGitInfo from "./Pages/GitInfo/c_level0_gitinfo";
import CAbout from "./Pages/About/c_level0_about";
import CImpressum from "./Pages/Impressum/c_level0_impressum";
import CError404 from "./Pages/Error/c_level0_error404";

// Style
import "./App.css";

const App = () => {
  const routes = useRoutes([
      { path: '/', element: <CHome /> },
      { path: 'tool/*', element: <CCCCTool /> },
      { path: 'git', element: <CGitInfo /> },
      { path: 'contact', element: <CContact /> },
      { path: 'about', element: <CAbout /> },
      { path: 'impressum', element: <CImpressum /> },
      { path: '*', element: <CError404 /> }
  ]);
  return routes;
}



const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;