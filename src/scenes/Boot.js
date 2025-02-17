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
  }

  create() {
    this.scene.start('Preloader');
  }
}
