class Controller {
  constructor(emitter, G, model) {
    this.model = model;
    emitter.on(G.SET_SCORE, this.setScore, this);
    emitter.on(G.UP_POINTS, this.upPoints, this);
  }

  setScore(score) {
    this.model.score = score;
  }

  upPoints(points) {
    const score = this.model.score + points;
    this.model.score = score;
  }
}

export { Controller }