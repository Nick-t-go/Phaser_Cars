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

  preload() {

  }

  create() {
    this.road = new Road({
      scene: this,
    });
    this.road.x = ScreenConfig.width() / 2;
    this.road.makeLines();
    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);
    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });

    this.scoreBox = new ScoreBox({
      scene: this,
    });
    this.model.score = 100;

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
  }

  update() {
    if (this.model.gameOver) return;
    this.road.moveLines();
    this.road.moveObject();
  }
}

export {
  SceneMain,
};