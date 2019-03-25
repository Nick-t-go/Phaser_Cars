import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  Align,
} from '../classes/util/align';
import {
  FlatButton,
} from '../classes/ui/flatButton';


class SceneOver extends Phaser.Scene {
  constructor() {
    super('SceneOver');
  }

  preload() {
    this.load.image('title', 'assets/title/title.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
  }

  create() {
    const gridConfig = {
      rows: 11,
      cols: 11,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();

    this.alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    this.backImage = this.add.image(ScreenConfig.width() / 2, ScreenConfig.height() / 2, 'titleBack');

    const title = this.add.image(0, 0, 'title');
    const btnStart = new FlatButton({
      scene: this,
      key: 'button1',
      text: 'Play Again!',
      event: 'start_game',
      emitter: this.emitter,

    });

    Align.scaleToGameW(title, 0.8, ScreenConfig.width());
    this.alignGrid.placeAtIndex(38, title);
    this.alignGrid.placeAtIndex(93, btnStart);

    this.emitter.on('start_game', this.startGame, this);
  }

  startGame() {
  	console.log('hap')
    this.scene.start('SceneMain');
  }
  // update() {

  // }
}

export {
  SceneOver
}