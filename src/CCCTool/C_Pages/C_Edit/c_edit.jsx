//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: c_edit.jsx (Component)
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////
import React, { Component } from "react";

import C_CCCEdit from "./C_Edit_CCC/c_level0_edit_ccc";

// Libs
import { CMS } from "ccctool-lib/lib/cms/class_cms";

class C_Edit extends Component {
  state = {};

  render() {
    return (
      <div>
        {(() => {
          switch (true) {
            case this.props.selectedCMS instanceof CMS:
              return <C_CCCEdit></C_CCCEdit>;
            default:
              return <p>Error (CMS Undefined Type)</p>;
          }
        })()}
      </div>
    );
  }
}

export default C_Edit;
