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

// export function Resize(game) {
//   const targetAspectRatio = 1920 / 1080; // Desired aspect ratio (4:3)
//   const windowWidth = window.innerWidth;
//   const windowHeight = window.innerHeight;
//   const windowAspectRatio = windowWidth / windowHeight;

//   let newWidth, newHeight;

//   if (windowAspectRatio > targetAspectRatio) {
//     // Window is too wide, limit height
//     newHeight = windowHeight;
//     newWidth = newHeight * targetAspectRatio;
//   } else {
//     // Window is too tall, limit width
//     newWidth = windowWidth;
//     newHeight = newWidth / targetAspectRatio;
//   }

//   // Resize the Phaser game
//   game.scale.resize(newWidth, newHeight);
//   game.canvas.style.width = `${newWidth}px`;
//   game.canvas.style.height = `${newHeight}px`;
// }
