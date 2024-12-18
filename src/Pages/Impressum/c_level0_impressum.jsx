import React, { Component } from "react";
import CHeader from "../../Elements/c_header";
import FNavigateButton from "../../Elements/Functionality/f_navigateButton";

class CImpressum extends Component {
  state = {};
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
              Impressum
            </h1>
          </div>
        </CHeader>
        <div>
          <div style={{ width: "60vw", margin: "10vh auto" }}>
            <h3>Impressum (nach § 5 Allgemeine Informationspflichten)</h3>
            <p className="cl_textBlock">
              Diese Internet Seite mit dem Domainname "ccctool.com" ist ein Angebot von der Universit&auml;t Leipzig (
              <a target="_blank" rel="noreferrer" href="https://www.uni-leipzig.de/service/impressum.html">
                Impressum Universit&auml;t Leipzig
              </a>
              ) und wurde in der Abteilung Bild- und Signalverarbeitung BSV (
              <a target="_blank" rel="noreferrer" C_Home href="https://www.informatik.uni-leipzig.de/bsv/homepage/de/content/impressum">
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
              keine Gew&auml;hr f&uuml;r die Aktualit&auml;t, Korrektheit, Vollst&auml;ndigkeit oder Qualit&auml;t der bereitgestellten Daten und Informationen. Falls Links unserer Seiten auf Seiten verweist, deren Inhalt Anlass zur Beanstandung
              gibt, bitten wir um Mitteilung. Wir behalten uns das Recht vor, ohne vorherige Ank&uuml;ndigung die bereitgestellten Informationen zu &auml;ndern, zu erg&auml;nzen oder zu entfernen.
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
      </div>
    );
  }
}

export default CImpressum;
