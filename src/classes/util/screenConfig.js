class ScreenConfig {
  static isMobile() {
    return navigator.userAgent.indexOf('Mobile') !==-1 || navigator.userAgent.indexOf('Tablet')  !== -1;
  }

  static height() {
    const height = 680;
    if (this.isMobile()) {
      return window.innerHeight;
    }
    return height;
  }

  static width() {
    const width = 600;
    if (this.isMobile()) {
      return window.innerWidth;
    }
    return width;
  }
}

export {
  ScreenConfig,
};