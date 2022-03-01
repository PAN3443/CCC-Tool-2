import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/CSS/filter.css";

function F_NavigateButton(props) {
  let navigate = useNavigate();
  return (
    <div onClick={() => {
            if(props.navURL!=null){
              navigate(props.navURL);
            }
            else if(props.navExternURL!=null){
              window.open(props.navExternURL, "_blank");
            }
      }}>
      {props.children}
    </div>
  );
}

export default F_NavigateButton;
