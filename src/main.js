import Phaser from 'phaser';
import { CONFIG } from './config';
import { SCENES } from './scenes';
import Resize from './resize';
// import { Resize } from './resize';

const game = new Phaser.Game({
  ...CONFIG,
  scene: SCENES,
});

game.events.once('Boot', () => {
  const resizeHandler = new Resize(game);
  resizeHandler.init();
});

// window.addEventListener('resize', () => Resize(game));
// game.events.on('ready', () => {
//   Resize(game);
// });
