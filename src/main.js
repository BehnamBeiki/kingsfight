import Phaser from 'phaser';
import { CONFIG } from './config';
import { SCENES } from './scenes';
// import Resize from './resize';

export default new Phaser.Game({
  ...CONFIG,
  scene: SCENES,
});

// const game = new Phaser.Game({
//   ...CONFIG,
//   scene: SCENES,
// });

// game.events.once('Boot', () => {
//   const resizeHandler = new Resize(game);
//   resizeHandler.init();
// });
