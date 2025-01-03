import React, { Component } from "react";
import CPixelAnimation from "../../Elements/ParticleAnimation/c_particleAnimation";
import "../../Style/CSS/filter.css";
import { Link } from "react-router-dom";

class CLogIn extends Component {
  constructor() {
    super();
    this.emailInputRef = React.createRef();
    this.passwdInputRef = React.createRef();
    this.warningText = React.createRef();
    this.particleAni = React.createRef();
  }

  render() {
    return (
      <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
        <div style={{ position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-point-out)", zIndex: "0", top: "0px", left: "0px" }}></div>
        <CPixelAnimation ref={this.particleAni} style={{ position: "absolute", height: "100vh", width: "100vw", top: "0px", left: "0px", zIndex: "1" }} numParticles={150}></CPixelAnimation>
        <div className="cl_blur cl_row cl_noMark" style={{ pointerEvents: "none", position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-point-out-alpha-90)", zIndex: "2", top: "0px", left: "0px" }}>
          <img src={"/CCC-Tool-2/img/Logos/CCC-2-LOGO.png"} alt="CCC-Tool Logo" style={{ pointerEvents: "auto", height: "20vh", margin: "auto", marginRight: "5vw", cursor: "pointer" }}></img>
          <h1
            style={{
              maxHeight: "25vh",
              fontSize: "8vh",
              lineHeight: "25vh",
              marginLeft: "0vw",
              cursor: "default",
            }}
          >
            The CCC-Tool
          </h1>
        </div>
        <div className="cl_row cl_noMark" style={{ pointerEvents: "none", position: "absolute", height: "70vh", width: "100vw", zIndex: "2", top: "25vh", left: "0px" }}>
          <div
            onMouseLeave={() => this.particleStart()}
            onMouseEnter={() => this.particleStop()}
            className="cl_blur"
            style={{ pointerEvents: "auto", margin: "auto", padding: "5vh 4vw", paddingBottom: "1vh", borderRadius: "var(--border-radius)", background: "var(--bg-alpha-alpha-90)" }}
          >
            <p className="cl_bigText" style={{ marginBottom: "1vh", color: "var(--font-color)", fontFamily: "var(--font-family-SpecialText)" }}>
              Welcome
            </p>
            <input ref={this.emailInputRef} type="text" placeholder="E-Mail" style={{ width: "20vw", marginBottom: "1vh" }}></input>
            <input ref={this.passwdInputRef} type="password" style={{ marginBottom: "0.5vh" }} placeholder="Password"></input>
            <p ref={this.warningText} className="cl_smallText" style={{ display: "none", margin: "auto", width: "20vw", color: "var(--font-color-warning)", marginBottom: "0.5vh" }}>
              Incorrect password or username!
            </p>

            <label className="cl_checkDiv" style={{ marginLeft: "1vw", marginBottom: "1vh", marginTop: "0.5vh" }}>
              <p>Show Password</p>
              <input id="id_cb_showPassword" type="checkbox" onClick={() => this.showPassword()} />
              <span className="cl_checkSpan"></span>
            </label>

            <div className="cl_row" style={{ margin: "auto", marginBottom: "1vh" }}>
              <button onClick={() => this.login()} style={{ width: "9.75vw" }}>
                Sign in
              </button>
              <button style={{ width: "9.75vw", marginLeft: "0.5vw" }} disabled>
                Sign up
              </button>
            </div>
            <button onClick={() => this.startAsGuest()} style={{ margin: "auto", width: "20vw", marginBottom: "4vh" }}>
              Without Login (Guest)
            </button>

            <div className="cl_row">
              <Link to="/about" className="cl_smallText" style={{ margin: "auto", marginLeft: "1vw" }}>
                About
              </Link>
              <Link to="/contact" className="cl_smallText" style={{ margin: "auto", marginRight: "1vw" }}>
                Contact/Impressum
              </Link>
            </div>
          </div>
        </div>
        <div className="cl_row cl_noMark" style={{ pointerEvents: "none", position: "absolute", height: "5vh", width: "100vw", zIndex: "2", top: "95vh", left: "0px" }}>
          <svg className="cl_Icon_F_BrightBG cl_Icon_F" style={{ height: "4vh", marginLeft: "2vw", marginTop: "0.5vh" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16">
            <path
              fillRule={"evenodd"}
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>

          <p style={{ margin: "auto", marginLeft: "1vw", color: "var(--font-color)", fontFamily: "var(--font-family-SpecialText)" }}> Version: 0.1.0 </p>
          <p style={{ margin: "auto", marginRight: "2vw", color: "var(--font-color)", fontFamily: "var(--font-family-SpecialText)" }}> Copyright © 2021 </p>
        </div>
      </div>
    );
  } //backgroundImage: "url(" + "/CCC-Tool-2/img/Background/whitePaper.png)", backgroundRepeat: "repeat",

  showPassword() {
    var x = this.passwdInputRef.current;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  particleStop = () => {
    const pAni = this.particleAni.current;
    pAni.stopAnimationDark();
  };

  particleStart = () => {
    const pAni = this.particleAni.current;
    pAni.startAnimation();
  };

  login = () => {
    const wText = this.warningText.current;
    wText.style.display = "block";
    const pAni = this.particleAni.current;
    pAni.stopAnimationWarning();
  };

  startAsGuest() {
    this.props.logIn(-1);
  }
}

export default CLogIn;
