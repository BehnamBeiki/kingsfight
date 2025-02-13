import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("bg", "assets/space.png");
    this.load.image("play_button", "assets/play_button.png");
    this.load.image("online_button", "assets/online_button.png");
    this.load.image("king", "assets/group_1000.png");
    this.load.image("dragon", "assets/group_1033.png");
    this.load.image("wolf", "assets/group_1034.png");
    this.load.image("bear", "assets/group_1035.png");
    this.load.image("snake", "assets/group_1036.png");
    this.load.image("panter", "assets/group_1037.png");
    this.load.image("staff", "assets/group_1038.png");
    this.load.image("sheild", "assets/group_1039.png");
    this.load.image("flame", "assets/group_1040.png");
    this.load.image("fruit", "assets/group_1041.png");
    this.load.image("ogre", "assets/group_1043.png");
    this.load.image("centaur", "assets/group_1044.png");
    this.load.image("troll", "assets/group_1045.png");
    this.load.image("devil", "assets/group_1067.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
