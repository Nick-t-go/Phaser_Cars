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

    this.load.image('toggleBack', 'assets/ui/toggles/1.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');

    this.load.audio('backgroundMusic', ['assets/audio/random-race.mp3', 'audio/random-race.ogg']);
    this.load.audio('boom', ['assets/audio/boom.mp3', 'assets/audio/boom.ogg']);
    this.load.audio('whoosh', ['assets/audio/whoosh.mp3', 'assets/audio/whoosh.ogg']);

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