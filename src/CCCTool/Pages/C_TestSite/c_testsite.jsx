//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_testsite.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";

import C_CCCTestSite from "./C_TestSite_CCC/c_testsite_ccc";

// Libs
import { CMS } from "ccctool-lib/lib/cms/class_cms";

class C_TestSite extends Component {
  state = {};

  render() {
    return (
      <div>
        {(() => {
          switch (true) {
            case this.props.selectedCMS instanceof CMS:
              return <C_CCCTestSite></C_CCCTestSite>;
            default:
              return <p>Error (CMS Undefined Type)</p>;
          }
        })()}
      </div>
    );
  }
}

export default C_TestSite;
