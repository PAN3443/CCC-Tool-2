import React, { Component } from "react";
import "../../Style/CSS/filter.css";

class CMoveableBox extends Component {
  state = {
    top: 20,
    left: 20
  };

  mouseStartX = 0;
  mouseStartY = 0;
  mouseIsDown = false;

  constructor() {
    super();
    this.ref_Window = React.createRef();
  }

  componentDidMount(){

  }

  render() {
    return (
      <div
        ref={this.ref_Window}
        style={{
          position: "absolute",
          top: this.state.top+"px",
          left: this.state.left+"px",
          border: "var(--border-width) solid var(--borderColor-brightBG)",
          margin: "auto",
          zIndex: "100",
          borderRadius: "var(--border-radius)",
          overflow: "hidden",
        }}
      >
        <div
          onMouseUp={() => this.stopDrag()}
          onMouseLeave={() => this.stopDrag()}
          onMouseDown={(event) => this.startDrag(event)}
          onMouseMove={(event) => this.startMoving(event)}
          className="cl_row"
          style={{ padding: "1vh 2vw", background: "var(--bg-dark)", zIndex: "101", cursor: "move" }}
        >
          <h3 className="cl_notSelectable" style={{ margin: "auto", color: "var(--bg-bright)" }}>{this.props.header}</h3>
        </div>
        <div style={{ background: "white" }}>{this.props.children}</div>
      </div>
    );
  }

  stopDrag = () => {
    this.mouseIsDown = false;
  };

  startDrag = (event) => {
    this.mouseIsDown = true;
    this.mouseStartX = event.pageX;
    this.mouseStartY = event.pageY;

      this.moveWindowHeight = this.ref_Window.current.scrollHeight;
      this.moveWindowWidth = this.ref_Window.current.scrollWidth;
      
      const documentBody = document.body;
      const documentHtml = document.documentElement;

      this.documentHeight = Math.max( documentBody.scrollHeight, documentBody.offsetHeight, 
        documentHtml.clientHeight, documentHtml.scrollHeight, documentHtml.offsetHeight );
        this.documentWidth = Math.max( documentBody.scrollWidth, documentBody.offsetWidth, 
        documentHtml.clientWidth, documentHtml.scrollWidth, documentHtml.offsetWidth );
  };

  startMoving = (event) => {
    if (this.mouseIsDown) {
      const diffX = event.pageX - this.mouseStartX;
      const diffY = event.pageY - this.mouseStartY;
      this.mouseStartX = event.pageX;
      this.mouseStartY = event.pageY;

      //check new Position
      let newPosTop = this.state.top + diffY;
      let newPosLeft = this.state.left + diffX;

      if(newPosTop<0){
        newPosTop=0;
      }

      if(newPosLeft<0){
        newPosLeft=0;
      }

      if(newPosTop+this.moveWindowHeight>this.documentHeight){
        newPosTop=this.documentHeight-this.moveWindowHeight;
      }

      if(newPosLeft+this.moveWindowWidth>this.documentWidth){
        newPosLeft=this.documentWidth-this.moveWindowWidth;
      }
      
      this.setState({
        top: newPosTop,
        left: newPosLeft
      });
      
    }
  };

}

export default CMoveableBox;
