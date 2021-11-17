//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level1_person.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";

class C_Person extends Component {
  render() {
    return <div>{React.createElement("div", { className: "cl_row", style: { marginTop: "5vh", marginBottom: "5vh" } }, [this.getElement_Img(), this.getElement_PersonData(), this.getElement_AffiliationData()])}</div>;
  }

  getElement_Img() {
    let imgUrl = process.env.PUBLIC_URL + "/img/Persons/defaultPerson.jpg";
    if ("img" in this.props.person) {
      if (this.props.person.img !== "") imgUrl = this.props.person.img;
    }
    return React.createElement("img", { src: imgUrl, style: { height: "15vh", width: "15vh", borderRadius: "7.5vh", marginTop: "auto", marginBottom: "auto" } });
  }

  getElement_PersonData() {
    let name = "";
    if ("name" in this.props.person) {
      if ("title" in this.props.person.name) name += this.props.person.name.title + " ";
      if ("givenName" in this.props.person.name) name += this.props.person.name.givenName + " ";
      if ("surname" in this.props.person.name) name += this.props.person.name.surname;
    } else name = "Undefined";

    let contactElement = null;
    if ("contact" in this.props.person) contactElement = this.getElement_Contact(this.props.person.contact);

    return React.createElement("div", { style: { width: "20vw", marginBottom: "auto", marginLeft: "3vw", marginRight: "3vw" } }, [React.createElement("h3", { style: { textAlign: "left" } }, name), contactElement]);
  }

  getElement_Contact(_contactJSON) {
    let contact1 = "\n";

    if ("phone" in _contactJSON) contact1 += "Phone: " + _contactJSON.phone + "\n";
    if ("email" in _contactJSON) contact1 += "E-Mail: " + _contactJSON.email;

    let elem1 = React.createElement("p", { style: { textAlign: "left", whiteSpace: "pre-line" } }, contact1);

    let elem2 = null;
    if ("link" in _contactJSON)
      elem2 = React.createElement("div", { className: "cl_row" }, [React.createElement("p", { style: { marginRight: "0.5vw" } }, "Homepage: "), React.createElement("a", { href: _contactJSON.link, target: "_blank" }, "Link")]);

    let contact2 = "";
    if ("adress" in _contactJSON) contact2 += "\n" + _contactJSON.adress + "\n";
    if ("postalNr" in _contactJSON) contact2 += _contactJSON.postalNr + " ";
    if ("city" in _contactJSON) contact2 += _contactJSON.city;
    if ("country" in _contactJSON) contact2 += "\n" + _contactJSON.country;

    let elem3 = React.createElement("p", { style: { textAlign: "left", whiteSpace: "pre-line" } }, contact2);

    return React.createElement("div", {}, [elem1, elem2, elem3]);
  }

  getElement_AffiliationData() {
    if ("affiliation" in this.props.person) {
      let affiliation = this.props.getAffiliation(this.props.person.affiliation);
      if (affiliation !== undefined) {
        let name = "";
        if ("name" in affiliation) name = affiliation.name;

        let contactElement = null;
        if ("contact" in affiliation) contactElement = this.getElement_Contact(affiliation.contact);

        return React.createElement("div", { style: { marginBottom: "auto", marginRight: "auto", width: "20vw", marginLeft: "auto" } }, [React.createElement("h3", { style: { textAlign: "left" } }, name), contactElement]);
      }
    }
    return null;
  }
}
export default C_Person;
