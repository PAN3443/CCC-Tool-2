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
import C_CCCTool from "./CCCTool/c_ccctool";
import C_Opening from "./Pages/Opening/c_level0_opening";
import C_Contact from "./Pages/Contact/c_level0_contact";
import C_GitInfo from "./Pages/GitInfo/c_level0_gitinfo";
import C_About from "./Pages/About/c_level0_about";
import C_Error404 from "./Pages/Error/c_level0_error404";

// Style
import "./App.css";

const App = () => {
  const routes = useRoutes([
      { path: '/', element: <C_Opening /> },
      { path: 'tool/*', element: <C_CCCTool /> },
      { path: 'git', element: <C_GitInfo /> },
      { path: 'contact', element: <C_Contact /> },
      { path: 'about', element: <C_About /> },
      { path: '*', element: <C_Error404 /> }
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