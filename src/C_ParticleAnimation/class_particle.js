//////////////////////////////////////////////
//////////////      HEADER      //////////////
//////////////////////////////////////////////
// File :: Class Particle
// Author :: Pascal Nardini
// License :: MIT

//////////////////////////////////////////////
//////////////////////////////////////////////

import random from "ccctool-lib/lib/helper/random";
import { vec_Diff, vecScalMulti, vecLength, vecNorm } from "ccctool-lib/lib/helper/math";

class Particle {
  //////// Private Varaibles ////////
  #maxVelocity = 1;
  #minVelocity = 1;
  #posX = undefined;
  #posY = undefined;
  #maxRad = 20;
  #minRad = 2;
  #posXChange = 1;
  #posYChange = 1;
  #color = { space: "hsv", c1: random.randomArbitrary(0, 1.0), c2: random.randomArbitrary(0.1, 0.25), c3: 1.0 };
  #radius = 5;
  #radiusChange = 1; // 1 pixel per
  #isShrinking = true;

  constructor() {
    this.#isShrinking = random.randomInt(0, 1000) > 500 ? true : false; // random true or false;
    this.setParticleVars(document.body.clientWidth <= 0 ? 1080 : document.body.clientWidth, document.body.clientHeight <= 0 ? 1080 : document.body.clientHeight);
  }

  setParticleVars(_width, _height) {
    this.#posX = random.randomInt(0, _width);
    this.#posY = random.randomInt(0, _height);
    let pixelRef = Math.min(_width, _height);
    this.#maxVelocity = pixelRef * 0.0005; // velocity can be a float, we use parseInt at the determination of the position. So the velocity can be slower than one pixel.
    this.#minVelocity = pixelRef * 0.00015;
    this.#maxRad = parseInt(pixelRef * 0.02);
    if (this.#maxRad < 10) this.#maxRad = 10;
    this.#minRad = parseInt(pixelRef * 0.005);
    if (this.#minRad < 2) this.#minRad = 2;
    this.#radiusChange = random.randomArbitrary(pixelRef * 0.0000025, pixelRef * 0.00001);
    this.#posXChange = random.randomArbitrary(-this.#maxVelocity, this.#maxVelocity);
    this.#posYChange = random.randomArbitrary(-this.#maxVelocity, this.#maxVelocity);
    this.#radius = random.randomInt(this.#minRad, this.#maxRad);
  }

  setNewVec() {
    this.#posXChange = random.randomArbitrary(-this.#maxVelocity, this.#maxVelocity);
    this.#posYChange = random.randomArbitrary(-this.#maxVelocity, this.#maxVelocity);
  }

  checkParticleSize(_min, _max) {
    if (this.#radius >= this.#maxRad) this.#isShrinking = true;
    if (this.#radius <= this.#minRad) this.#isShrinking = false;
  }

  checkParticleVector(_width, _height) {
    if (this.#posX <= 0) {
      this.#posXChange = random.randomArbitrary(this.#minVelocity, this.#maxVelocity);
      this.#posX = 0;
    }
    if (this.#posY <= 0) {
      this.#posYChange = random.randomArbitrary(this.#minVelocity, this.#maxVelocity);
      this.#posY = 0;
    }
    if (this.#posX >= _width) {
      this.#posXChange = random.randomArbitrary(-this.#maxVelocity, -this.#minVelocity);
      this.#posX = _width;
    }
    if (this.#posY >= _height) {
      this.#posYChange = random.randomArbitrary(-this.#maxVelocity, -this.#minVelocity);
      this.#posY = _height;
    }
    if (Math.abs(this.#posXChange) < this.#minVelocity) this.#posXChange = random.randomArbitrary(-this.#maxVelocity, this.#maxVelocity);
    if (Math.abs(this.#posYChange) < this.#minVelocity) this.#posYChange = random.randomArbitrary(-this.#maxVelocity, this.#maxVelocity);
  }

  checkMousePos(_xPos, _yPos, _mouseDown, _mouseUp) {
    let dVec = vec_Diff([this.#posX, this.#posY], [_xPos, _yPos]); // direction vector pointing from mouse pos on the particel pos
    let dDis = vecLength(dVec);

    if (_mouseUp) {
      if (dDis <= 200) {
        let newV = vecScalMulti(vecNorm(dVec), 10 * this.#maxVelocity);
        this.#posXChange = newV[0];
        this.#posYChange = newV[1];
      }
    } else if (_mouseDown) {
      if (dDis <= 200) {
        let newV = vecScalMulti(vecNorm(dVec), -5 * this.#maxVelocity);
        this.#posXChange = newV[0];
        this.#posYChange = newV[1];
      }
    } else {
      if (dDis <= 1.2 * this.#radius) {
        let newV = vecScalMulti(vecNorm(dVec), vecLength([this.#posXChange, this.#posYChange]));
        this.#posXChange = newV[0];
        this.#posYChange = newV[1];
      }
    }
  }

  updateParticle() {
    this.#radius += this.#isShrinking ? -this.#radiusChange : this.#radiusChange;
    if (this.#radius < 1) this.#radius = 1;
    this.#posX = this.#posX + this.#posXChange;
    this.#posY = this.#posY + this.#posYChange;
  }

  getPosX() {
    return this.#posX; //Math.round(this.#posX);
  }

  getPosY() {
    return this.#posY; //Math.round(this.#posY);
  }

  getRadius() {
    return this.#radius;
  }

  getColor() {
    return this.#color;
  }
}

///////////////////////////////////////////////////
export { Particle };
