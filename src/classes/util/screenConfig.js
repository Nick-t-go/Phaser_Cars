class ScreenConfig {
  static isMobile() {
    return navigator.userAgent.indexOf('Mobile') || navigator.userAgent.indexOf('Tablet');
  }

  static height() {
    const height = 680;
    if (this.isMobile) {
      return window.innerHeight;
    }
    return height;
  }

  static width() {
    const width = 600;
    if (this.isMobile) {
      return window.innerWidth;
    }
    return width;
  }
}

export {
  ScreenConfig,
};