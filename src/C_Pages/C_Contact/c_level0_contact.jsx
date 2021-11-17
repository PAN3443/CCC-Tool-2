//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_level0_contact.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";
import C_Header from "../../C_Elements/c_header";
import C_Person from "./c_level1_person";
import C_Affiliation from "./c_level1_affiliation";

class C_Contact extends Component {
  state = {
    me: {
      name: { title: "M.Sc.", givenName: "Pascal", surname: "Nardini" },
      contact: {
        phone: "+49 341 97-32255",
        email: "nardini'at'informatik.uni-leipzig.de",
        link: "https://www.informatik.uni-leipzig.de/bsv/homepage/de/people/pascal-nardini",
        adress: "Postfach 100920",
        postalNr: "D-04009",
        city: "Leipzig",
        country: "Germany",
      },
      affiliation: 0,
      img: process.env.PUBLIC_URL + "/img/Persons/Pascal_Nardini.jpg",
    },
    partners: [
      {
        name: { title: "Prof. Dr.", givenName: "Gerik", surname: "Scheuermann" },
        contact: { email: "scheuermann'at'informatik.uni-leipzig.de", link: "https://www.informatik.uni-leipzig.de/bsv/homepage/en/people/gerik-scheuermann", adress: "Postfach 100920", postalNr: "D-04009", city: "Leipzig", country: "Germany" },
        affiliation: 0,
        img: process.env.PUBLIC_URL + "/img/Persons/GerikScheuermann.jpg",
      },
      { name: { title: "Prof. Dr.", givenName: "Min", surname: "Chen" }, contact: { link: "https://sites.google.com/site/drminchen/home" }, affiliation: 2, img: process.env.PUBLIC_URL + "/img/Persons/MinChen.jpg" },
      {
        name: { title: "Dr.", givenName: "Roxana", surname: "Bujack" },
        contact: { adress: "P.O. Box 1663", postalNr: "Los Alamos, NM 87545", city: "", country: "USA", link: "https://sites.google.com/site/roxanabujack/" },
        affiliation: 4,
        img: process.env.PUBLIC_URL + "/img/Persons/bujack.jpg",
      },
      {
        name: { title: "M.Sc.", givenName: "Michael", surname: "Boettinger" },
        contact: { link: "https://www.dkrz.de/about/mitarbeiter/MichaelBoettinger" },
        affiliation: 5,
        img: process.env.PUBLIC_URL + "/img/Persons/Michael_Boettinger.jpg",
      },
      {
        name: { givenName: "Francesca", surname: "Samsel" },
        contact: { link: "http://www.francescasamsel.com/home_html/HOME.html" },
        affiliation: 6,
        img: process.env.PUBLIC_URL + "/img/Persons/Francesca_Samsel.jpg",
      },
    ],
    affiliations: [
      { id: 0, name: "Leipiz University", contact: { adress: "Ritterstraße 26", postalNr: "D-04109", city: "Leipzig", country: "Germany", link: "https://www.uni-leipzig.de/en/" }, img: process.env.PUBLIC_URL + "/img/Logos/university_leipzig.png" },
      {
        id: 1,
        name: "Image and Signal Processing Group (BSV)",
        contact: { adress: "Ritterstraße 26", postalNr: "D-04109", city: "Leipzig", country: "Germany", link: "https://www.informatik.uni-leipzig.de/bsv/homepage/en" },
        img: process.env.PUBLIC_URL + "/img/Logos/bsv.png",
      },
      { id: 4, name: "Los Alamos National Laboratory", contact: { postalNr: "Los Alamos, NM 87545", city: "", country: "USA", link: "https://www.lanl.gov/" }, img: process.env.PUBLIC_URL + "/img/Logos/logo_LANLsm.png" },
      {
        id: 5,
        name: "German Climate Computing Center (DKRZ)",
        contact: { address: "Bundesstraße 45a", postalNr: "D-20146", city: "Hamburg", country: "Germany", link: "https://www.dkrz.de/dkrz-partner-for-climate-research?set_language=en&cl=en" },
        img: process.env.PUBLIC_URL + "/img/Logos/DKRZ.png",
      },
      { id: 2, name: "Oxford e-Research Centre", contact: { adress: "7 Keble Road", postalNr: "OX1 3QG", city: "Oxford", country: "Britain", link: "https://www.oerc.ox.ac.uk/" }, img: process.env.PUBLIC_URL + "/img/Logos/oxford.png" },
      { id: 3, name: "U.S. Department of Energy", contact: { link: "https://www.energy.gov/" }, img: process.env.PUBLIC_URL + "/img/Logos/usDepEnergy.png" },

      { id: 6, name: "The University of Texas at Austin", contact: { address: "110 Inner Campus Drive", postalNr: "Austin, TX 78705", city: "", country: "USA", link: "https://www.utexas.edu/" }, img: process.env.PUBLIC_URL + "/img/Logos/UT.png" },
    ],
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <C_Header style={{ height: "25vh", width: "100vw" }}>
          <img
            onClick={() => this.props.handleGo2Page("/about")}
            src={process.env.PUBLIC_URL + "/img/Logos/CCC-LOGO.png"}
            alt="CCC-Tool Logo"
            style={{ pointerEvents: "auto", height: "20vh", margin: "auto", marginRight: "5vw", cursor: "pointer" }}
          ></img>
          <h1
            style={{
              maxHeight: "25vh",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            Contact and Impressum
          </h1>
        </C_Header>

        <div style={{ width: "60%", widthMax: "80%", margin: "auto", marginTop: "5vh", marginBottom: "5vh" }}>
          <h2>Contact</h2>
          <C_Person key={"id_contac_" + this.state.me.title + "_" + this.state.me.givenName + "_" + this.state.me.surname} getAffiliation={this.getAffiliation} person={this.state.me} />
          <h2>Partner</h2>
          {this.state.partners.map((p) => (
            <C_Person key={"id_contac_" + p.title + "_" + p.givenName + "_" + p.surname} getAffiliation={this.getAffiliation} person={p} />
          ))}
          <h2>Thanks to: </h2>
          <div className="cl_row" style={{ width: "100%", justifyContent: "center", padding: "5vh 0vw", overflow: "hidden", background: "var(--bg-dark)" }}>
            {this.state.affiliations.map((a) => (
              <C_Affiliation affiliation={a} />
            ))}
          </div>

          <h2>Impressum (nach § 5 Allgemeine Informationspflichten)</h2>
          <p className="cl_textBlock">
            Diese Internet Seite mit dem Domainname "ccctool.com" ist ein Angebot von der Universit&auml;t Leipzig (
            <a target="_blank" href="https://www.uni-leipzig.de/service/impressum.html">
              Impressum Universit&auml;t Leipzig
            </a>
            ) und wurde in der Abteilung Bild- und Signalverarbeitung BSV (
            <a target="_blank" href="https://www.informatik.uni-leipzig.de/bsv/homepage/de/content/impressum">
              Impressum BSV
            </a>
            ) von Pascal Nardini entwickelt.
          </p>
          <p className="cl_textBlock">
            <strong>Postfachadresse:</strong> <br></br> Postfach 100920 <br></br> D-04009 Leipzig <br></br>
          </p>

          <p className="cl_textBlock">
            <strong>Hausadresse:</strong> <br></br> Ritterstraße 26 <br></br> D-04109 Leipzig <br></br>
          </p>

          <p className="cl_textBlock">
            <strong>Kontakt:</strong> <br></br> Pascal Nardini <br></br> Telefon: +49 341 97-32255 <br></br> E-Mail: ccchelp'at'informatik.uni-leipzig.de <br></br>
          </p>
          <p className="cl_textBlock">
            <strong>Haftungshinweis:</strong>
            <br></br> Trotz sorgf&auml;ltiger inhaltlicher Kontrolle &uuml;bernehmen wir keine Haftung für die Inhalte externer Links. F&uuml;r den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Wir &uuml;bernehmen
            keine Gew&auml;hr f&uuml;r die Aktualit&auml;t, Korrektheit, Vollst&auml;ndigkeit oder Qualit&auml;t der bereitgestellten Daten und Informationen. Falls Links unserer Seiten auf Seiten verweist, deren Inhalt Anlass zur Beanstandung gibt,
            bitten wir um Mitteilung. Wir behalten uns das Recht vor, ohne vorherige Ank&uuml;ndigung die bereitgestellten Informationen zu &auml;ndern, zu erg&auml;nzen oder zu entfernen.
          </p>

          <p className="cl_textBlock">
            <strong>Urheber- und Kennzeichenrecht:</strong>
            <br></br> Alle innerhalb unserer Seiten genannten und ggf. durch Dritte gesch&uuml;tzten Marken- und Warenzeichen unterliegen uneingeschr&auml;nkt den Bestimmungen des jeweils g&uuml;ltigen Kennzeichenrechts und den Besitzrechten der
            jeweiligen eingetragenen Eigent&uuml;mer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter gesch&uuml;tzt sind! Das Copyright für ver&ouml;ffentlichte, von uns selbst
            erstellte Objekte bleibt allein beim Urheber der Objekte. Eine Vervielf&auml;ltigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne
            ausdr&uuml;ckliche Zustimmung des Urhebers nicht gestattet.
          </p>
        </div>
      </div>
    );
  }

  getAffiliation = (_id) => {
    for (let index = 0; index < this.state.affiliations.length; index++) {
      //const element = array[index];
      if (this.state.affiliations[index].id == _id) {
        return this.state.affiliations[index];
      }
    }
    return undefined;
  };
}
export default C_Contact;
