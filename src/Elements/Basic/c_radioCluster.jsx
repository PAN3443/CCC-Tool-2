//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_radioCluster.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
// Shows the selected CMS or the Filter Settings
//////////////////////////////////////////////

// React
import React, { Component } from "react";

class CRadioCluser extends Component {
  state = { index: 0 };

  activateRadioButton(_index) {
    this.setState({ index: _index });
    this.props.handleActivation(_index);
  }

  getActiveIndex = () => {
    return this.state.index;
  }

  getActiveElement = () => {
    return this.props.elements[this.state.index];
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.props.elements.map((e, index) => (
          <div className="cl_row" key={"id_" + this.props.key + "_radioButtonDiv_" + e} style={{ margin: "0.2vh 0vw" }}>
            {index === this.state.index ? (
              <svg className="cl_Icon_S_BrightBG_Activated cl_Icon_S" style={{ height: "2vh", maxHeight: "1.5vw", width: "1.5vw", maxWidth: "2vh", margin: "auto 1vw", fill: "var(--bg-bright)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31">
                <title>{e}</title>
                <circle cx="16" cy="16" r="13" />
                <circle cx="16" cy="16" r="5" style={{ fill: "var(--bg-active)" }} />
              </svg>
            ) : (
              <svg
                className="cl_Icon_S_BrightBG cl_Icon_S"
                onClick={() => this.activateRadioButton(index)}
                style={{ height: "2vh", maxHeight: "1.5vw", width: "1.5vw", maxWidth: "2vh", margin: "auto 1vw", fill: "var(--bg-bright)" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 31 31"
              >
                <title>{e}</title>
                <circle cx="16" cy="16" r="13" />
              </svg>
            )}

            <p>{e}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default CRadioCluser;
