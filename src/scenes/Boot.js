import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {}

  create() {
    // this.registry.set("bg", "");
    // this.registry.set("start", "");
    // this.registry.set("warning", "");
    // this.registry.set("play", "");
    // this.registry.set("player", "");
    // this.registry.set("ground", "");
    // this.registry.set("npc", "");
    // this.registry.set("tween", "");
    // this.registry.set("tweenNpc", "");
    // this.registry.set("select", 0);
    // this.registry.set("round", 0);
    // this.registry.set("pool", []);
    // this.registry.set("poolDeleted", []);
    // this.registry.set("poolNpc", []);

    this.scene.start("Preloader");
  }
}
