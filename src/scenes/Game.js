import { Scene } from "phaser";

let ground,
  info,
  start,
  play,
  player,
  npc,
  round = 0,
  pool = [],
  poolNpc = [];

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    let cards = [
      "king",
      "dragon",
      "wolf",
      "bear",
      "snake",
      "panter",
      "staff",
      "sheild",
      "flame",
      "fruit",
      "ogre",
      "centaur",
      "troll",
      "devil",
    ];

    pool = Phaser.Utils.Array.Shuffle(cards).slice(4);
    poolNpc = Phaser.Utils.Array.Shuffle(cards).slice(4);
    ground = this.add.image(480, 300, "bg");

    info = this.add
      .text(this.cameras.main.width / 2, 580, "", {
        fontFamily: "Humongous of Eternity St",
        fontSize: 20,
        fontStyle: "normal",
        color: "#ede9e0",
      })
      .setShadow(1.5, 1, "#965515", 1)
      .setOrigin(0.5);

    start = this.add
      .image(480, 650, "online_button")
      .setInteractive()
      .setVisible(false);
    start.once(
      "pointerup",
      function () {
        this.scene.start("GameOver");
        round = 0;
        pool = [];
        poolNpc = [];
      },
      this
    );

    play = this.add.image(480, 650, "play_button").setInteractive();
    play.on(
      "pointerup",

      function () {
        player = this.add.image(480, 480, pool[Math.floor(Math.random() * 10)]);

        if (ground.texture !== player.texture) {
          this.tweens.add({
            targets: player,
            y: 300,
            ease: "Power1",
            duration: 500,
            delay: 100,
            onStart: onStartHandler,
            onComplete: onCompleteHandler,
            onCompleteParams: [player],
          });

          npc = this.add
            .image(480, 120, poolNpc[Math.floor(Math.random() * 10)])
            .setVisible(false);

          if (player.texture !== npc.texture) {
            this.tweens.add({
              targets: npc,
              y: 300,
              ease: "Power1",
              duration: 500,
              delay: 1100,
              onComplete: onCompleteHandler1,
              onCompleteParams: [npc],
            });
          } else {
            start.setVisible(true);
            npc.setVisible(true);
            play.setVisible(false);
            this.add
              .text(this.cameras.main.width / 2, 470, `YOU LOSE`, {
                fontFamily: "Humongous of Eternity St",
                fontSize: 20,
                fontStyle: "normal",
                color: "#ede9e0",
              })
              .setShadow(1.5, 1, "#965515", 1)
              .setOrigin(0.5);
          }
        } else {
          start.setVisible(true);
          play.setVisible(false);
          this.add
            .text(this.cameras.main.width / 2, 120, `YOU WIN`, {
              fontFamily: "Humongous of Eternity St",
              fontSize: 20,
              fontStyle: "normal",
              color: "#ede9e0",
            })
            .setShadow(1.5, 1, "#965515", 1)
            .setOrigin(0.5);
        }
      },
      this
    );

    function onStartHandler() {
      ground.texture = player.texture;
      play.setVisible(false);
      round++;
    }

    function onCompleteHandler() {
      npc.setVisible(true);
    }

    function onCompleteHandler1() {
      ground.texture = npc.texture;
      play.setVisible(true);
    }
  }

  update() {
    info.setText(` Round ${round}`);
  }
}
