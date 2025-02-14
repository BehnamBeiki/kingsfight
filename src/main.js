import Phaser from 'phaser';
import { CONFIG } from './config';
import { SCENES } from './scenes';
// import { resizeWindow } from './resizeWindow';

export default new Phaser.Game({
  ...CONFIG,
  scene: SCENES,
});

// const game = new Phaser.Game({
//   ...CONFIG,
//   scene: SCENES,
// });

// resizeWindow(game);
