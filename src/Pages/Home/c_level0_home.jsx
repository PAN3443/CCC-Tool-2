import React, { Component } from "react";
import CPixelAnimation from "../../Elements/ParticleAnimation/c_particleAnimation";
import CLanguageDropdown from "./c_level1_languageDropdown";
import FNavigateButton from "../../Elements/Functionality/f_navigateButton";
import "../../Style/CSS/filter.css";
import { Trans, withTranslation } from "react-i18next";

// Button Images
import BackgroundEditor from "./img/Editor-Button.jpeg";
import BackgroundTestSuite from "./img/TestSuite-Button.jpeg";
import BackgroundColorblindness from "./img/Colorblindness-Button.jpeg";
import BackgroundAnalysis from "./img/Analysis-Button.jpeg";
import BackgroundGit from "./img/Git-Button.jpeg";
import BackgroundOptimization from "./img/Optimization-Button.jpeg";
import BackgroundContact from "./img/Contact-Button.jpeg";
import BackgroundDesign from "./img/Design-Button.jpeg";
import BackgroundDocu from "./img/Docu-Button.jpeg";

import "./home.css";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

class CHome extends Component {
  constructor() {
    super();
    this.particleAni = React.createRef();
  }

  render() {
    const version = import.meta.env.APP_VERSION;
    return (
      <div style={{ position: "relative", height: "100vh", width: "100vw", background: "var(--bg-app)" }}>
        <div style={{ position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-point-out)", zIndex: "0", top: "0px", left: "0px" }}></div>
        <CPixelAnimation ref={this.particleAni} style={{ position: "absolute", height: "100vh", width: "100vw", top: "0px", left: "0px", zIndex: "1" }} numParticles={150}></CPixelAnimation>
        <div className="cl_blur cl_row cl_noMark" style={{ pointerEvents: "none", overflow: "hidden", position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-point-out-alpha-80)", zIndex: "2", top: "0px", left: "0px" }}>
          <img src={"/CCC-Tool-2/img/Logos/CCC-2-LOGO.png"} alt="CCC-Tool Logo" style={{ pointerEvents: "auto", height: "23vh", margin: "auto", marginRight: "2vw", cursor: "pointer" }}></img>
          <h1
            style={{
              margin: "auto",
              marginLeft: "0vw",
            }}
          >
            <Trans i18nKey="label_welcome" />
          </h1>
        </div>
        <div className="cl_blur cl_noMark" style={{ pointerEvents: "none", position: "absolute", height: "70vh", width: "100vw", zIndex: "2", top: "25vh", left: "0px", overflow: "auto" }}>
          <div className="cl_row" style={{ width: "auto", margin: "auto" }}>
            <FNavigateButton navURL="/tool" onMouseLeave={() => this.particleStart()} onMouseEnter={() => this.particleStop()}>
              <div className="cl_HomeSelect_Div">
                <div></div>
                <div
                  className="cl_HomeSelectImg"
                  style={{
                    backgroundImage: `url(${BackgroundEditor})`,
                  }}
                ></div>
                <p>
                  <Trans i18nKey="label_editor" />
                </p>
              </div>
            </FNavigateButton>
            <div className="cl_HomeSelect_Div" style={{ cursor: "not-allowed" }}>
              <div></div>
              <div
                className="cl_HomeSelectImg"
                style={{
                  backgroundImage: `url(${BackgroundTestSuite})`,
                }}
              ></div>
              <p>
                <Trans i18nKey="label_testSuite" components={{ br: <br /> }} />
              </p>
            </div>
            <div className="cl_HomeSelect_Div" style={{ cursor: "not-allowed" }}>
              <div></div>
              <div
                className="cl_HomeSelectImg"
                style={{
                  backgroundImage: `url(${BackgroundAnalysis})`,
                }}
              ></div>
              <p>
                <Trans i18nKey="label_analysis" />
              </p>
            </div>
            <div className="cl_HomeSelect_Div" style={{ cursor: "not-allowed" }}>
              <div></div>
              <div
                className="cl_HomeSelectImg"
                style={{
                  backgroundImage: `url(${BackgroundOptimization})`,
                }}
              ></div>
              <p>
                <Trans i18nKey="label_optimization" />
              </p>
            </div>
            <div className="cl_HomeSelect_Div" style={{ cursor: "not-allowed" }}>
              <div></div>
              <div
                className="cl_HomeSelectImg"
                style={{
                  backgroundImage: `url(${BackgroundColorblindness})`,
                }}
              ></div>
              <p>
                <Trans i18nKey="label_colorBlindness" components={{ br: <br /> }} />
              </p>
            </div>
          </div>
          <div className="cl_row" style={{ width: "auto", margin: "auto", marginTop: "0px" }}>
            <FNavigateButton navURL="/settings" onMouseLeave={() => this.particleStart()} onMouseEnter={() => this.particleStop()}>
              <div className="cl_HomeSelect_Div">
                <div></div>
                <div
                  className="cl_HomeSelectImg"
                  style={{
                    backgroundImage: `url(${BackgroundDesign})`,
                  }}
                ></div>
                <p>
                  <Trans i18nKey="page_settings.label" />
                </p>
              </div>
            </FNavigateButton>
            <FNavigateButton navURL="/docu" onMouseLeave={() => this.particleStart()} onMouseEnter={() => this.particleStop()}>
              <div className="cl_HomeSelect_Div">
                <div></div>
                <div
                  className="cl_HomeSelectImg"
                  style={{
                    backgroundImage: `url(${BackgroundDocu})`,
                  }}
                ></div>
                <p>
                  <Trans i18nKey="label_docu" />
                </p>
              </div>
            </FNavigateButton>
            <FNavigateButton navURL="/contact" onMouseLeave={() => this.particleStart()} onMouseEnter={() => this.particleStop()}>
              <div className="cl_HomeSelect_Div">
                <div></div>
                <div
                  className="cl_HomeSelectImg"
                  style={{
                    backgroundImage: `url(${BackgroundContact})`,
                  }}
                ></div>
                <p>
                  <Trans i18nKey="label_contact" />
                </p>
              </div>
            </FNavigateButton>
            <FNavigateButton navURL="/git" onMouseLeave={() => this.particleStart()} onMouseEnter={() => this.particleStop()}>
              <div className="cl_HomeSelect_Div">
                <div></div>
                <div
                  className="cl_HomeSelectImg"
                  style={{
                    backgroundImage: `url(${BackgroundGit})`,
                  }}
                ></div>
                <p>
                  <Trans i18nKey="page_openSource.label" />
                </p>
              </div>
            </FNavigateButton>
          </div>
        </div>

        <div className="cl_row cl_noMark" style={{ position: "absolute", width: "100vw", zIndex: "2", top: "95vh", left: "0px" }}>
          
          <div className="cl_row" style={{height: "5vh", marginRight: "auto", padding: "0 1vw", background: "var(--bg-app)"}}>
          <FNavigateButton navURL="/git" style={{marginTop: "0.5vh" }}>
            <svg className="cl_Icon_F_BrightBG cl_Icon_F" style={{ height: "4vh", fill: "var(--font-color)"}} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16">
              <path
                fillRule={"evenodd"}
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </FNavigateButton>

          <p style={{ margin: "auto", marginLeft: "1vw", color: "var(--font-color)", fontFamily: "var(--font-family-SpecialText)" }}>
            {" "}
            <Trans i18nKey="version" />: {version}{" "}
          </p>
          </div>
          
          <div className="cl_row" style={{height: "5vh", padding: "0 1vw", background: "var(--bg-app)"}}><p style={{ margin: "auto", marginRight: "0.5vw", marginLeft: "0vw", color: "var(--font-color)", fontFamily: "var(--font-family-SpecialText)" }}> Copyright © 2024 </p>
          <CLanguageDropdown languages={languages} /></div>
          
        </div>
      </div>
    );
  }
  /* 
  <FNavigateButton navURL="/impressum" style={{ margin: "auto", marginRight: "0.2vw" }}>
    <p style={{ color: "var(--font-color)", fontFamily: "var(--font-family-SpecialText)" }}><Trans i18nKey="imprint" /> /</p>
  </FNavigateButton> 
  */

  particleStop = () => {
    const pAni = this.particleAni.current;
    pAni.stopAnimationDark();
  };

  particleStart = () => {
    const pAni = this.particleAni.current;
    pAni.startAnimation();
  };
}

export default withTranslation()(CHome);
