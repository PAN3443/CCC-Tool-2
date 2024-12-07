import React, { Component } from "react";

import CCCCEdit from "./C_Edit_CCC/c_level0_edit_ccc";

// Libs
import { CMS } from "ccctool-lib/lib/cms/class_cms";

class CEdit extends Component {
  state = {};

  render() {
    return (
      <div>
        {(() => {
          switch (true) {
            case this.props.selectedCMS instanceof CMS:
              return <CCCCEdit></CCCCEdit>;
            default:
              return <p>Error (CMS Undefined Type)</p>;
          }
        })()}
      </div>
    );
  }
}

export default CEdit;
