//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level0_edit_ccc.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";

//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class CCCCEdit extends Component {
  state = {};

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
  };*/
  
  render() {
    return <div style={{ width: "100%", height: "100%", background: "blue" }}>CCC Edit</div>;
  }
}

export default CCCCEdit;
