class Align {
  static scaleToGameW(obj, per, width) {
    obj.displayWidth = width * per;
    obj.scaleY = obj.scaleX;
  }

  static center(obj, width, height) {
    obj.x = width / 2;
    obj.y = height / 2;
  }

  static centerH(obj, width) {
    obj.x = width / 2;
  }

  static centerV(obj, height) {
    obj.y = height / 2;
  }
}

export { Align }