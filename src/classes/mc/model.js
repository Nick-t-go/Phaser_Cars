class Model {
  constructor(emitter, gameConstants) {
    this.emitter = emitter;
    this.gameConstants = gameConstants;
    this._score = 0;
    this.soundOn = true;
    this._musicOn = true;
    this.gameOver = false;
  }

  set musicOn(val) {
    this._musicOn = val;
    this.emitter.emit(this.gameConstants.MUSIC_CHANGED);
  }

  get musicOn(){
    return this._musicOn
  }

  set score(val) {
    this._score = val;
    console.log('Score updated');
    this.emitter.emit(this.gameConstants.SCORE_UPDATED);
  }

  get score() {
    return this._score;
  }
}

export {
  Model
}