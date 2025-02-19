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
    const hGap = this.scale.width / 10;
    const vGap = this.scale.height / 10;

    this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);

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

    let left = hGap;
    let left1 = hGap;
    let j = hGap;

    for (let i = 0; i <= 6; i++) {
      let cards1 = this.add.image((left += j), vGap * 2, card1[i]);
      cards1.setInteractive();
      cards1.name = 'cards1-' + i;

      let cards2 = this.add.image((left1 += j), vGap * 5, card2[i]);
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
      .image(hGap * 5, vGap * 9, 'online_button')
      .setInteractive();

    start.on(
      'pointerup',
      function () {
        this.scene.start('Game');
        select = 0;
      },
      this
    );

    info = this.add.bitmapText(hGap * 5, vGap * 7, 'Syncopate').setOrigin(0.5);

    warning = this.add
      .bitmapText(hGap * 5, vGap * 8, 'Syncopate')
      .setOrigin(0.5);

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
