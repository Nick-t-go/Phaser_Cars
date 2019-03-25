import {
  ToggleButton,
} from './toggleButton';


class SoundButtons  {
  constructor(scene, width) {

    this.scene = scene;

    this.sfxToggle = new ToggleButton({
      scene: this.scene,
      backKey: 'toggleBack',
      onIcon: 'sfxOn',
      offIcon: 'sfxOff',
      value: true,
      event: this.scene.G.TOGGLE_SOUND,
      emitter: this.scene.emitter,
      width,
    });

    this.musicToggle = new ToggleButton({
      scene: this.scene,
      backKey: 'toggleBack',
      onIcon: 'musicOn',
      offIcon: 'musicOff',
      value: true,
      event: this.scene.G.TOGGLE_MUSIC,
      emitter: this.scene.emitter,
      width,
    });

    this.musicToggle.y = 100;
    this.musicToggle.x = 100;
    this.sfxToggle.x = width - this.sfxToggle.width / 2;
    this.sfxToggle.y = this.musicToggle.y;

    if (!this.scene.model.musicOn) this.musicToggle.toggle();
    if (!this.scene.model.soundOn) this.sfxToggle.toggle();

  }
}

export {
  SoundButtons,
}