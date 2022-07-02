//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level1_affiliation.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";
import "./contact.css";

class CAffiliation extends Component {
  render() {
    return this.getElement_Img();
  }

  getElement_Img() {
    let imgUrl = process.env.PUBLIC_URL + "/img/Persons/defaultPerson.jpg";
    if ("img" in this.props.affiliation) {
      if (this.props.affiliation.img !== "") imgUrl = this.props.affiliation.img;
    }

    let imgStyle = { height: "10vh", marginTop: "2.5vh", marginBottom: "2.5vh", marginLeft: "2vw", marginRight: "2vw" };
    if ("contact" in this.props.affiliation && "link" in this.props.affiliation.contact) {
      return React.createElement("a", { className: "cl_coopImg", href: this.props.affiliation.contact.link, target: "_blank", style: imgStyle }, React.createElement("img", { src: imgUrl }));
    }
    return React.createElement("img", { src: imgUrl, style: imgStyle });
  }
}
export default CAffiliation;
