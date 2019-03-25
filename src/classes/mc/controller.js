class Controller {
  constructor(emitter, G, model) {
    this.model = model;
    emitter.on(G.SET_SCORE, this.setScore, this);
    emitter.on(G.UP_POINTS, this.upPoints, this);
    emitter.on(G.TOGGLE_SOUND, this.toggleSound, this);
    emitter.on(G.TOGGLE_MUSIC, this.toggleMusic, this);
  }

  setScore(score) {
    this.model.score = score;
  }

  upPoints(points) {
    const score = this.model.score + points;
    this.model.score = score;
  }

  toggleSound(val) {
    this.model.soundOn = val;
  }

  toggleMusic(val) {
    this.model.musicOn = val;
  }

}

export {
  Controller
}