import React from "react";

function FKeyRendering(props) {
  let keyInput = [];
  let backgroundColor = "none";

  switch (props.cmsKey.getType()) {
    case "nil":
      keyInput.push(getNilKeySVG(false, false));
      break;
    case "right":
      backgroundColor = props.cmsKey.getCR().getRGBString(false);
      keyInput.push(getNilKeySVG(true, false));
      break;
    case "left":
      backgroundColor = props.cmsKey.getCL().getRGBString(false);
      keyInput.push(getNilKeySVG(true, true));
      break;
    case "twin":
      backgroundColor = props.cmsKey.getCR().getRGBString(false);
      let topColor = backgroundColor;
      if (!props.cmsKey.getMoT()) {
        topColor = props.cmsKey.getCL().getRGBString(false);
      }
      //topDiv
      keyInput.push(React.createElement("div", { title: topColor, style: { height: "40%", width: "100%", borderBottom: "var(--border-width) solid var(--borderColor)", background: topColor } }));
      //leftDiv
      keyInput.push(
        React.createElement("div", {
          title: props.cmsKey.getCL().getRGBString(false),
          style: { height: "60%", width: "50%", borderRight: "var(--border-width) solid var(--borderColor)", background: props.cmsKey.getCL().getRGBString(false) },
        })
      );
      break;
    case "dual":
      backgroundColor = props.cmsKey.getCL().getRGBString(false);
      break;
    default:
  }

  return React.createElement(
    "div",
    { title: backgroundColor, style: { margin: "auto 1vw", height: "3vh", width: "3vh", border: "var(--border-width) solid var(--borderColor)", borderRadius: "var(--border-radius)", overflow: "hidden", background: backgroundColor } },
    keyInput
  );
}

function getNilKeySVG(doHalf, doMarginLeft) {
  let style = { background: "var(--bg-app)", stroke: "var(--font-color)", width: "100%", margin: "0vh 0vw 0vh 0vw", borderLeft: "none", borderRight: "none", height: "100%" };
  if (doHalf) {
    style.width = "50%";
    if (doMarginLeft) {
      style.margin = "0vh 0vw 0vh auto";
      style.borderLeft = "var(--border-width) solid var(--font-color)";
    } else {
      style.margin = "0vh auto 0vh 0vw";
      style.borderRight = "var(--border-width) solid var(--font-color)";
    }
  }

  return React.createElement(
    "svg",
    {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid meet",
      style: style,
    },
    React.createElement("line", {
      x1: "0",
      y1: "20",
      x2: "20",
      y2: "0",
    })
  );
}

export default FKeyRendering;
