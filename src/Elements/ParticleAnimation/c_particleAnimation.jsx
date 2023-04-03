import React, { Component } from "react";
import { Particle } from "./class_particle";
import { Color } from "ccctool-lib/lib/color/class_Color";

class CPixelAnimation extends Component {
  numParticles = 0;
  particles = [];
  workColor = undefined;
  mouseX = 0;
  mouseY = 0;
  mouseD = false;
  mouseU = false;

  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.workColor = new Color("hsv", 0, 0, 0);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);

    const canvas = this.canvasRef.current;
    canvas.addEventListener("mousemove", this.mouseMove);
    canvas.addEventListener("mousedown", this.mouseDown);
    canvas.addEventListener("mouseup", this.mouseUp);
    canvas.addEventListener("mouseleave", this.mouseLeave);
    canvas.addEventListener("mouseenter", this.mouseEnter);

    canvas.style.overflow = "hidden";
    let rect = canvas.getBoundingClientRect();
    if (this.props.numParticles !== undefined) this.numParticles = parseInt(this.props.numParticles);

    if (rect.width > 0 && rect.height > 0) {
      for (let i = 0; i < this.numParticles; i++) {
        this.particles.push(new Particle());
        this.particles[i].setParticleVars(rect.width, rect.height);
      }
    } else {
      for (let i = 0; i < this.numParticles; i++) {
        this.particles.push(new Particle());
      }
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
    const canvas = this.canvasRef.current;
    canvas.removeEventListener("mousemove", this.mouseMove);
    canvas.removeEventListener("mousedown", this.mouseDown);
    canvas.removeEventListener("mouseup", this.mouseUp);
    canvas.removeEventListener("mouseleave", this.mouseLeave);
    canvas.removeEventListener("mouseenter", this.mouseEnter);
  }

  render() {
    return <canvas ref={this.canvasRef} style={this.props.style}></canvas>;
  }

  /****************************************************
   *  Normal Particle Animation
   ****************************************************/
  startAnimation() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.drawParticles();
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  drawParticles() {
    const canvas = this.canvasRef.current;

    try {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const width = canvas.width;
      const height = canvas.height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].checkParticleSize();
        this.particles[i].checkParticleVector(width, height);
        this.particles[i].updateParticle();
        this.workColor.setColorJSON(this.particles[i].getColor());
        this.particles[i].checkMousePos(this.mouseX, this.mouseY, this.mouseD, this.mouseU);

        ctx.beginPath();
        ctx.fillStyle = this.workColor.getRGBString(false, 0.5);
        ctx.arc(this.particles[i].getPosX(), this.particles[i].getPosY(), this.particles[i].getRadius(), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
      }

      if (this.mouseU) this.mouseU = false;
    } catch (error) {
      console.error(error.message);
      cancelAnimationFrame(this.rAF);
    }
  }

  mouseDown = () => {
    this.mouseD = true;
  };

  mouseUp = () => {
    this.mouseU = true;
    this.mouseD = false;
  };

  mouseMove = (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  mouseLeave = () => {
    if (this.mouseD) this.mouseU = true;
    this.mouseD = false;
  };

  mouseEnter = () => {
    this.mouseU = false;
    this.mouseD = false;
  };
  /****************************************************
   *  Stop Animation
   ****************************************************/

  stopAnimationDark() {
    this.stopAnimation(getComputedStyle(document.documentElement).getPropertyValue("--bg-dark-alpha-5"));
  }

  stopAnimationWarning() {
    this.stopAnimation(getComputedStyle(document.documentElement).getPropertyValue("--bg-warning-alpha-10"));
  }

  stopAnimation(_color) {
    cancelAnimationFrame(this.rAF);
    this.rAF = undefined;
    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    let darkBGColor = _color;
    for (var i = 0; i < this.particles.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = darkBGColor;
      ctx.arc(this.particles[i].getPosX(), this.particles[i].getPosY(), this.particles[i].getRadius(), 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }
}

export default CPixelAnimation;
