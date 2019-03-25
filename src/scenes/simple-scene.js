import {
  Road,
} from '../classes/road';
import {
  Model,
} from '../classes/mc/model';
import {
  Constants,
} from '../constants';
import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  Controller,
} from '../classes/mc/controller';
import {
  ScoreBox,
} from '../classes/components/scoreBox';
import {
  AlignGrid,
} from '../classes/util/alignGrid';

import {
  SoundButtons,
} from '../classes/ui/soundButtons';

import {
  MediaManager,
} from '../classes/util/mediaManager';


class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }


  create() {
    this.road = new Road({
      scene: this,
    });
    this.road.x = ScreenConfig.width() * 0.25;
    this.road.makeLines();

    this.road2 = new Road({
      scene: this,
    });
    this.road2.x = ScreenConfig.width() * 0.75;
    this.road2.makeLines();

    this.road2.car.setFrame(1);

    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.model.speed = 1;
    this.model.score = 0;

    this.controller = new Controller(this.emitter, this.G, this.model);
    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });

    this.scoreBox = new ScoreBox({
      scene: this,
    });


    const gridConfig = {
      col: 5,
      row: 5,
      scene: this,
    };
    this.alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    this.soundBtns = new SoundButtons(this, ScreenConfig.width());
    this.alignGrid.showNumbers();
    this.alignGrid.placeAtIndex(0, this.soundBtns.musicToggle);
    this.alignGrid.placeAtIndex(4, this.soundBtns.sfxToggle);
    this.alignGrid.placeAtIndex(9, this.scoreBox);
    this.mediaManager.setBackgroundMusic('backgroundMusic');
    this.emitter.on(this.G.SCORE_UPDATED, this.scoreUpdated, this);
  }

  scoreUpdated() {
    if (this.model.score / 5 === Math.floor(this.model.score / 5) && this.model.speed < 1.5) {
      this.model.speed += 0.25;
    }
  }

  update() {
    if (this.model.gameOver) {
      this.emitter.emit(this.G.TOGGLE_MUSIC, false);
      return;
    }

    this.road.moveLines();
    this.road.moveObject();

    this.road2.moveLines();
    this.road2.moveObject();
  }
}

export {
  SceneMain,
};