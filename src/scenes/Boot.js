import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.bitmapFont(
      'Syncopate',
      'assets/fonts/Syncopate_0.png',
      'assets/fonts/Syncopate.fnt'
    );
    // let font = new FontFace('Crimson', 'url(assets/fonts/Crimson.ttf)');
    // font.load().then((loadedFont) => {
    //   document.fonts.add(loadedFont);
    //   return document.fonts.ready;
    // });
  }

  create() {
    this.scene.start('Preloader');
  }
}
