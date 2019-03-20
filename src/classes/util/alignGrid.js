class AlignGrid {

  constructor(config, screenConfig) {
    this.config = config;
    if (!config.scene) {
      console.log('missing scene');
      return;
    }
    if (!config.rows) {
      this.config.rows = 5;
    }
    if (!config.cols) {
      this.config.cols = 5;
    }
    if (!config.height) {
      this.config.height = screenConfig.height;
    }
    if (!config.width) {
      this.config.width = screenConfig.width;
    }
    this.scene = config.scene;
    this.cw = this.config.width / this.config.cols;
    this.ch = this.config.height / this.config.rows;
  }

  show() {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);
    for (let i = 0; i < this.config.width; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }
    for (let k = 0; k < this.config.height; k += this.ch) {
      this.graphics.moveTo(0, k);
      this.graphics.lineTo(this.config.width, k);
    }
    this.graphics.strokePath();
  }

  placeAt(xx, yy, obj) {
    // calc position based up the cell width and the cell height
    let x2 = this.cw * xx + this.cw / 2;
    let y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index, obj) {
    // calc position using grid index
    let yy = Math.floor(index / this.config.cols);
    let xx = index - (yy * this.config.cols);

    this.placeAt(xx, yy, obj);
  }

  showNumbers() {
  	this.show();
    let count = 0;
    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        let numText = this.scene.add.text(0, 0, count, {
          color: '#ff0000',
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }
}

export {
  AlignGrid
};