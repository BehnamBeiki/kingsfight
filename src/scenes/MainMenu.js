import { Scene } from 'phaser';

let start,
  info,
  warning,
  select = 0,
  pool = [],
  poolDeleted = [];

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    this.add.image(480, 360, 'bg');
    let card1 = ['king', 'dragon', 'wolf', 'bear', 'snake', 'panter', 'staff'];
    let card2 = [
      'sheild',
      'flame',
      'fruit',
      'ogre',
      'centaur',
      'troll',
      'devil',
    ];
    let left = 0;
    let left1 = 0;
    let j = 120;

    for (let i = 0; i <= 6; i++) {
      let cards1 = this.add.image((left += j), 120, card1[i]);
      cards1.setInteractive();
      cards1.name = 'cards1-' + i;

      let cards2 = this.add.image((left1 += j), 320, card2[i]);
      cards2.setInteractive();
      cards2.name = 'cards2-' + i;

      cards1.on('clicked', this.clickHandler, this);
      cards2.on('clicked', this.clickHandler, this);
    }

    this.input.on(
      'gameobjectup',
      function (pointer, gameObject) {
        gameObject.emit('clicked', gameObject);
      },
      this
    );

    start = this.add
      .image(this.scale.width / 2, (this.scale.height * 7) / 8, 'online_button')
      .setInteractive();
    start.on(
      'pointerup',
      function () {
        this.scene.start('Game');
        select = 0;
      },
      this
    );

    // const centerX = this.scale.width / 2;
    // const centerY = this.scale.height / 2;
    // const leftHalf = this.scale.width / 4;
    // const rightHalf = (this.scale.width * 3) / 4;
    // const topHalf = this.scale.height / 4;
    // const bottomHalf = (this.scale.height * 3) / 4;

    info = this.add
      .bitmapText(
        this.scale.width / 2,
        (this.scale.height * 2) / 3,
        'Syncopate'
      )
      .setOrigin(0.5);

    warning = this.add
      .bitmapText(
        this.scale.width / 2,
        (this.scale.height * 3) / 4,
        'Syncopate'
      )
      .setOrigin(0.5);

    // warning = this.add
    //   .text(this.scale.width / 2, (this.scale.height * 3) / 4, '', {
    //     fontFamily: 'Tahoma',
    //     fontSize: '20px',
    //     color: '#ede9e0',
    //   })
    //   .setOrigin(0.5);

    this.input.mouse.disableContextMenu();
  }

  update() {
    info.setText(`You have selected ${select} cards`);

    if (select === 10) {
      warning.setText(`You're good to go`);
      start.setVisible(true);
    } else if (select < 10) {
      warning.setText(`Please add ${10 - select} cards`);
      start.setVisible(false);
    } else if (select > 10) {
      warning.setText(`Please remove ${Math.abs(10 - select)} cards`);
      start.setVisible(false);
    }
  }

  clickHandler(cards) {
    if (cards.isTinted == 0) {
      cards.setTint(0x008080);
      select++;
      pool[pool.length] = cards.texture;
    } else {
      cards.clearTint();
      select--;
      poolDeleted = pool.splice(pool.indexOf(cards.texture), 1);
    }
  }
}
