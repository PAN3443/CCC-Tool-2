// React
import React from "react";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";

// Components
import CCCCTool from "./CCCTool/c_ccctool.jsx";
import CHome from "./Pages/Home/c_level0_home.jsx";
import CContact from "./Pages/Contact/c_level0_contact.jsx";
import CGitInfo from "./Pages/GitInfo/c_level0_gitinfo.jsx";
import CAbout from "./Pages/About/c_level0_about.jsx";
import CImpressum from "./Pages/Impressum/c_level0_impressum.jsx";
import CError404 from "./Pages/Error/c_level0_error404.jsx";
import CTheme from "./Pages/Theme/c_level0_theme.jsx";

// Style
import "./App.css";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <CHome /> },
    { path: "tool/*", element: <CCCCTool /> },
    { path: "git", element: <CGitInfo /> },
    { path: "contact", element: <CContact /> },
    { path: "about", element: <CAbout /> },
    { path: "impressum", element: <CImpressum /> },
    { path: "theme", element: <CTheme /> },
    { path: "*", element: <CError404 /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
