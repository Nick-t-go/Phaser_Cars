import 'phaser';
import { ScreenConfig } from './classes/util/screenConfig';
import { SceneMain } from './scenes/simple-scene';

const gameConfig = {
  width: ScreenConfig.width(),
  height: ScreenConfig.height(),
  scene: SceneMain,
};

const game = new Phaser.Game(gameConfig);
