import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.setPath('assets');
    this.load.image('bg', 'space.png');
    this.load.image('play_button', 'play_button.png');
    this.load.image('online_button', 'online_button.png');
    this.load.image('king', 'group_1000.png');
    this.load.image('dragon', 'group_1033.png');
    this.load.image('wolf', 'group_1034.png');
    this.load.image('bear', 'group_1035.png');
    this.load.image('snake', 'group_1036.png');
    this.load.image('panter', 'group_1037.png');
    this.load.image('staff', 'group_1038.png');
    this.load.image('sheild', 'group_1039.png');
    this.load.image('flame', 'group_1040.png');
    this.load.image('fruit', 'group_1041.png');
    this.load.image('ogre', 'group_1043.png');
    this.load.image('centaur', 'group_1044.png');
    this.load.image('troll', 'group_1045.png');
    this.load.image('devil', 'group_1067.png');
  }

  create() {
    this.scene.start('MainMenu');
  }
}
