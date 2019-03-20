class Model {
  constructor(emitter, gameConstants) {
    this.emitter = emitter;
    this.gameConstants = gameConstants;
    this._score = 0;
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