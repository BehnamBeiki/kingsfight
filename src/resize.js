export default class Resize {
  constructor(game) {
    this.game = game;
  }

  init() {
    this.game.scale.on('resize', this.resize.bind(this));
    this.resize(
      this.game.scale.gameSize,
      this.game.scale.baseSize,
      this.game.scale.displaySize,
      this.game.scale.resolution
    );
  }
}
