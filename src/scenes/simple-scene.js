import {
  Road,
} from '../classes/road';
import { Model } from '../classes/mc/model';
import { screenConfig, Constants } from '../constants';
import { Controller } from '../classes/mc/controller';
import { ScoreBox } from '../classes/components/scoreBox';



class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.image('road', 'assets/road-rush-image-1/road.jpg');
    this.load.spritesheet('cars', 'assets/road-rush-image-1/cars.png', {
      frameWidth: 60,
      frameHeight: 126,
    });
    this.load.image('line', 'assets/road-rush-image-1/line.png');
    this.load.image('barrier', 'assets/objs/barrier.png');
    this.load.image('cone', 'assets/objs/cone.png');
    this.load.image('pcar1', 'assets/objs/pcar1.png');
    this.load.image('pcar2', 'assets/objs/pcar2.png');
  }

  create() {
    this.road = new Road({
      scene: this,
    });
    this.road.x = screenConfig.width / 2;
    this.road.makeLines();
    this.emitter = new Phaser.Events.EventEmitter();
    this.gameConstants = new Constants();
    this.model = new Model(this.emitter, this.gameConstants);
    this.controller = new Controller(this.emitter, this.gameConstants, this.model);
    this.sb = new ScoreBox({ scene:this });
    this.model.score = 100;
    this.sb.x = screenConfig.width - 125;
    this.sb.y = 50;
  }

  update() {
    this.road.moveLines();
    this.road.moveObject();
  }
}

export {
  SceneMain,
};