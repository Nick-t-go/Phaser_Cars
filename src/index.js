import 'phaser';
import { ScreenConfig } from './classes/util/screenConfig';
import { SceneMain } from './scenes/simple-scene';
import { SceneTitle } from './scenes/scene-title';
import { SceneOver } from './scenes/scene-over';

const gameConfig = {
  width: ScreenConfig.width(),
  height: ScreenConfig.height(),
  scene: [SceneTitle, SceneMain, SceneOver],
};

const game = new Phaser.Game(gameConfig);
