import React, { Component } from "react";
import CHeader from "../../Elements/c_header";
import FNavigateButton from "../../Elements/Functionality/f_navigateButton";

class CDocu extends Component {
  state = {};
  render() {
    return (
      <div>
        <CHeader style={{ height: "25vh", width: "100vw" }}>
          <div className="cl_blur cl_row cl_noMark" style={{ position: "absolute", height: "25vh", width: "100vw", background: "var(--bg-point-out-alpha-90)", zIndex: "2", top: "0px", left: "0px" }}>
            <FNavigateButton navURL="/" style={{ margin: "auto", marginRight: "5vw" }}>
              <img src={"/CCC-Tool-2/img/Logos/CCC-2-LOGO.png"} alt="CCC-Tool Logo" style={{ height: "20vh" }}></img>
            </FNavigateButton>
            <h1
              style={{
                maxHeight: "25vh",
                marginLeft: "0vw",
                cursor: "default",
              }}
            >
              Documentation
            </h1>
          </div>
        </CHeader>
        <div style={{ width: "100vw", height: "75vh", background: "var(--bg-point-out-alpha-5)" }}>
          <p style={{ color: "var(--borderColor)", width: "fit-content", maxWidth: "50%", margin: "auto" }}>This Page is not implemented so far. Below you will find the "about" information from the old CCC-Tool.</p>
        </div>

        <div style={{ width: "75%", widthMax: "80%", margin: "auto", marginTop: "5vh", marginBottom: "5vh" }}>
          <div style={{ width: "100%", flexDirection: "row", marginTop: "5vh" }}>
            <div style={{ margin: "auto", width: "50%" }}>
              <h3 className="cl_marginTB_2_5">The CCC-Tool</h3>

              <p className="cl_marginTB_2_5">
                The CCC-Tool based on the idea of a general tool for the creation and export of colormaps with the effort to minimize the needed interaction components. To make this possible, we developed a colormap specification <strong>CMS</strong>
                . Furthermore, the tool offers different methods and functions for the analyzing and testing of colormaps. CCC-Tool supports some commonly-used color spaces and color difference metrics, currently including RGB, HSV, CIELAB (CIELCH),
                CIE94, CIEDE2000, and DIN99.
              </p>
            </div>

            <div style={{ margin: "auto", width: "40%" }}>
              <img alt="" src={"/CCC-Tool-2/img/AboutPage/edit_Example.png"} style={{ width: "100%" }}></img>
              <p className="cl_smallText">1. Figure: Screenshot of the Edit section.</p>
            </div>
          </div>

          <div style={{ width: "100%", flexDirection: "row", marginTop: "5vh" }}>
            <div style={{ margin: "auto", width: "50%" }}>
              <h3 className="cl_marginTB_2_5">Tool Structure </h3>

              <p className="cl_marginTB_2_5">
                The tool is separated into the sections "Welcome", "MyDesings", "Gallery", "New", "Edit" and "Test Functions". For a better overview and navigation, you can use the "Navigator Map" ("ctrl+m"). The MyDesings section is the center of
                this tool and is used for the management of your cms. You can start with the creation of cms with a collection of recommended colormaps at the Gallery-Section or with a completely new cms at the New section. At the Edit section, you
                can edit keys, add predefined cms or constant bands, change the interpolation color space, analyze for perceptual uniformity or order, and observe colorblindness. You can always export a colormap at the MyDesings, Gallery, and Edit
                section. Additional, it is possible to export a full session file at the MyDesings section, where you can also import cms- or session-files.
              </p>
            </div>

            <div style={{ margin: "auto", width: "40%" }}>
              <img alt="" src={"/CCC-Tool-2/img/AboutPage/navi_Example.png"} style={{ width: "100%" }}></img>
              <p className="cl_smallText">2. Figure: Screenshot of the Navigator Map.</p>
            </div>
          </div>

          <div style={{ width: "100%", flexDirection: "row", marginTop: "5vh" }}>
            <div style={{ margin: "auto", width: "50%" }}>
              <h3 className="cl_marginTB_2_5">The Colormap specification (CMS)</h3>
              <p className="cl_marginTB_2_5">
                The CMS was developed to describe colormaps with a minimum number of key-colors. Each key data tuple, k:= (type,x,c<sub>L</sub>,c<sub>M</sub>,c<sub>R</sub>,bur), where x is the corresponding data value, and c<sub>L</sub>,c<sub>M</sub>
                ,c
                <sub>R</sub> are the "color-foundation" of the colormap. c<sub>L</sub> determines the color gradient to the left side and c<sub>R</sub> to the right side. c<sub>M</sub> determine the color for the data value x. The boolean variable
                bur chooses keys as Burdock Key, which are used to determine sections in the cms. There are five types of keys, each of which is associated with different requirements for the three color specifications.
              </p>
              <ul>
                <li className="cl_marginTB_2_5">
                  <strong>nil key</strong>: c<sub>L</sub> = c<sub>M</sub> = c<sub>R</sub> = nil. The nil key is always placed at the first place of the cms and initialize a constant band as beginning of the cms.
                </li>
                <li className="cl_marginTB_2_5">
                  <strong>right key</strong>: c<sub>L</sub> = nil is undefined while c<sub>R</sub> = c<sub>M</sub> is defined. The right key is always placed at the first place of the cms and initialize a scaled band as beginning of the cms.
                </li>
                <li className="cl_marginTB_2_5">
                  <strong>left key</strong>: c<sub>R</sub> = nil is undefined while c<sub>L</sub> is defined. c<sub>M</sub> must be assigned to c<sub>L</sub> or the nil state of c<sub>R</sub>. The left key can be placed inside the cms and is always
                  placed at the end of the cms. Within the cms the left key initialize a constant band.
                </li>
                <li className="cl_marginTB_2_5">
                  <strong>dual key</strong>: c<sub>L</sub> = c<sub>M</sub> = c<sub>R</sub> are defined as the same color. The dual key is always placed inside the cms and initialize a continuous transition.
                </li>
                <li className="cl_marginTB_2_5">
                  <strong>twin key</strong>: c<sub>L</sub> and c<sub>R</sub> are defined separately, and have to be different colors (c<sub>R</sub> 6= c<sub>L</sub>). c<sub>M</sub> must be assigned to c<sub>L</sub> or c<sub>R</sub>. The twin key is
                  always placed inside the cms and initialize a discontinuous transition.
                </li>
              </ul>
            </div>

            <div style={{ margin: "auto", width: "40%" }}>
              <img alt="" src={"/CCC-Tool-2/img/AboutPage/cms_Example.png"} style={{ width: "100%" }}></img>
              <p className="cl_smallText">3. Figure: Examples for the use of the CMS keys.</p>
            </div>
          </div>

          <div style={{ width: "100%", flexDirection: "row", marginTop: "5vh" }}>
            <div style={{ margin: "auto", width: "50%" }}>
              <h3 className="cl_marginTB_2_5">CMS Visualization</h3>

              <p className="cl_marginTB_2_5">
                For the visualization of the CMS, the tool offers the two versions, the <strong>Linear Colormap</strong> and the <strong>Band Sketch</strong>. The Linear Colormap shows the colormap with the right ratio of the key reference values.
                Unlike that, the band sketch uses equal widths for each band, which is the reference area between two keys. The Band Sketch version is well-suited to show you relatively small colormap parts, which could be skipped at the Linear
                Colormap visualization. The Linear Colormap is always the top visualization, and the Band Sketch version is always the bottom ones. At the Edit section of the tool is also the <strong>Burdock-Key Line</strong> between the Linear
                Colormap and its key visualizations. The Burdock-Key Line highlights the Burdock Keys and allows the modifications of cms sections.
              </p>
            </div>

            <div style={{ margin: "auto", width: "40%" }}>
              <img alt="" src={"/CCC-Tool-2/img/AboutPage/cmsVis_Example.png"} style={{ width: "100%" }}></img>
              <p className="cl_smallText">4. Figure: Examples for the CMS visualization.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CDocu;
