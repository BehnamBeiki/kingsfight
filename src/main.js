import Phaser from 'phaser';
import './style.css';
import { config  } from './config';
import  scenes  from './scenes';
// import { resizeWindow } from './resizeWindow';

export default new Phaser.Game({
  ...config ,
  scene: scenes,
});

