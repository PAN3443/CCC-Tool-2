import React, { Component } from "react";
import CHeader from "../../Elements/c_header";
import CPerson from "./c_level1_person";
import CAffiliation from "./c_level1_affiliation";
import FNavigateButton from "../../Elements/Functionality/f_navigateButton";

class CContact extends Component {
  state = {
    persons: [
      {
        id: 0,
        name: { title: "M.Sc.", givenName: "Pascal", surname: "Nardini" },
        contact: {
          email: "nardini'at'informatik.uni-leipzig.de",
          link: "https://www.informatik.uni-leipzig.de/bsv/homepage/de/people/pascal-nardini",
        },
        affiliation: 0,
        img: "/CCC-Tool-2/img/Persons/Pascal_Nardini.jpg",
      },
      {
        id: 1,
        name: { title: "Prof. Dr.", givenName: "Gerik", surname: "Scheuermann" },
        contact: { email: "scheuermann'at'informatik.uni-leipzig.de", link: "https://www.informatik.uni-leipzig.de/bsv/homepage/en/people/gerik-scheuermann", adress: "Postfach 100920", postalNr: "D-04009", city: "Leipzig", country: "Germany" },
        affiliation: 0,
        img: "/CCC-Tool-2/img/Persons/GerikScheuermann.jpg",
      },
      { id: 2, name: { title: "Prof. Dr.", givenName: "Min", surname: "Chen" }, contact: { link: "https://sites.google.com/site/drminchen/home" }, affiliation: 2, img: "/CCC-Tool-2/img/Persons/MinChen.jpg" },
      {
        id: 3,
        name: { title: "Dr.", givenName: "Roxana", surname: "Bujack" },
        contact: { adress: "P.O. Box 1663", postalNr: "Los Alamos, NM 87545", city: "", country: "USA", link: "https://sites.google.com/site/roxanabujack/" },
        affiliation: 4,
        img: "/CCC-Tool-2/img/Persons/bujack.jpg",
      },
      {
        id: 4,
        name: { title: "M.Sc.", givenName: "Michael", surname: "Boettinger" },
        contact: { link: "https://www.dkrz.de/about/mitarbeiter/MichaelBoettinger" },
        affiliation: 5,
        img: "/CCC-Tool-2/img/Persons/Michael_Boettinger.jpg",
      },
      {
        id: 5,
        name: { givenName: "Francesca", surname: "Samsel" },
        contact: { link: "http://www.francescasamsel.com/home_html/HOME.html" },
        affiliation: 6,
        img: "/CCC-Tool-2/img/Persons/Francesca_Samsel.jpg",
      },
    ],
    contacts: [0, 1],
    partners: [2, 3, 4, 5],
    affiliations: [
      { id: 0, name: "Leipiz University", contact: { adress: "Ritterstraße 26", postalNr: "D-04109", city: "Leipzig", country: "Germany", link: "https://www.uni-leipzig.de/en/" }, img: "/CCC-Tool-2/img/Logos/university_leipzig.png" },
      {
        id: 1,
        name: "Image and Signal Processing Group (BSV)",
        contact: { adress: "Ritterstraße 26", postalNr: "D-04109", city: "Leipzig", country: "Germany", link: "https://www.informatik.uni-leipzig.de/bsv/homepage/en" },
        img: "/CCC-Tool-2/img/Logos/bsv.png",
      },
      { id: 4, name: "Los Alamos National Laboratory", contact: { postalNr: "Los Alamos, NM 87545", city: "", country: "USA", link: "https://www.lanl.gov/" }, img: "/CCC-Tool-2/img/Logos/logo_LANLsm.png" },
      {
        id: 5,
        name: "German Climate Computing Center (DKRZ)",
        contact: { address: "Bundesstraße 45a", postalNr: "D-20146", city: "Hamburg", country: "Germany", link: "https://www.dkrz.de/dkrz-partner-for-climate-research?set_language=en&cl=en" },
        img: "/CCC-Tool-2/img/Logos/DKRZ.png",
      },
      { id: 2, name: "Oxford e-Research Centre", contact: { adress: "7 Keble Road", postalNr: "OX1 3QG", city: "Oxford", country: "Britain", link: "https://www.oerc.ox.ac.uk/" }, img: "/CCC-Tool-2/img/Logos/oxford.png" },
      { id: 3, name: "U.S. Department of Energy", contact: { link: "https://www.energy.gov/" }, img: "/CCC-Tool-2/img/Logos/usDepEnergy.png" },

      { id: 6, name: "The University of Texas at Austin", contact: { address: "110 Inner Campus Drive", postalNr: "Austin, TX 78705", city: "", country: "USA", link: "https://www.utexas.edu/" }, img: "/CCC-Tool-2/img/Logos/UT.png" },
    ],
  };

  render() {
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <div className="cl_blur cl_row cl_noMark" style={{ position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-dark-alpha-75)", zIndex: "2", top: "0px", left: "0px" }}>
            <FNavigateButton navURL="/" style={{ margin: "auto", marginRight: "5vw" }}>
              <img src={"/CCC-Tool-2/img/Logos/CCC-LOGO.png"} alt="CCC-Tool Logo" style={{ height: "20vh" }}></img>
            </FNavigateButton>
            <h1
              style={{
                maxHeight: "25vh",
                marginLeft: "0vw",
                cursor: "default",
              }}
            >
              Contact and Impressum
            </h1>
          </div>
        </CHeader>

        <div style={{ width: "60%", widthMax: "80%", margin: "auto", marginTop: "5vh", marginBottom: "5vh" }}>
          <h2>Contact</h2>
          {this.state.contacts.map((c) => (
            <CPerson key={"id_contact_" + c} getAffiliation={this.getAffiliation} person={this.state.persons[c]} />
          ))}
          <h2>Partner</h2>
          {this.state.partners.map((p) => (
            <CPerson key={"id_partner_" + p} getAffiliation={this.getAffiliation} person={this.state.persons[p]} />
          ))}
        </div>
        <div style={{ width: "100%", widthMax: "100%", margin: "0px", background: "var(--bg-dark)"}}>
          <h2 style={{color: "var(--font-color-darkBG)", marginLeft:"1vw"}}>Thanks to: </h2>
          <div className="cl_row" style={{ width: "100%", justifyContent: "center", padding: "0vh 0vw 5vh 0vw", overflow: "hidden"}}>
            {this.state.affiliations.map((a) => (
              <CAffiliation key={"id_affiliations_" + a.id} affiliation={a} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  getAffiliation = (_id) => {
    for (let index = 0; index < this.state.affiliations.length; index++) {
      //const element = array[index];
      if (this.state.affiliations[index].id === _id) {
        return this.state.affiliations[index];
      }
    }
    return undefined;
  };
}
export default CContact;
