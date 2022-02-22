import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/CSS/filter.css";

function F_NavigateButton(props) {
  let navigate = useNavigate();
  return (
    <div className="cl_OpeningSelect_Div cl_blur" onClick={() => {
            if(props.navURL!=null){
               navigate(props.navURL);
            }
      }}>
      {props.children}
    </div>
  );
}

export default F_NavigateButton;
