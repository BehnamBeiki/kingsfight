import { Scene } from 'phaser';

let start,
  info,
  warn,
  select = 0;
export let pool = [];

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    const hGap = this.scale.width / 10;
    const vGap = this.scale.height / 10;

    this.add.image(hGap * 5, vGap * 5, 'bg').setOrigin(0.5, 0.5);

    const card1 = Phaser.Utils.Array.Shuffle([
      'king',
      'dragon',
      'wolf',
      'bear',
      'snake',
      'panther',
      'staff',
    ]);
    const card2 = Phaser.Utils.Array.Shuffle([
      'shield',
      'flame',
      'fruit',
      'ogre',
      'centaur',
      'troll',
      'devil',
    ]);

    let left = hGap;
    let left1 = hGap;
    const j = hGap;

    card1.forEach((card, i) => {
      const cards1 = this.add
        .image((left += j), vGap * 2, card)
        .setInteractive();
      cards1.name = `cards1-${i}`;
      cards1.on('pointerup', () => this.clickHandler(cards1));
    });

    card2.forEach((card, i) => {
      const cards2 = this.add
        .image((left1 += j), vGap * 5, card)
        .setInteractive();
      cards2.name = `cards2-${i}`;

      cards2.on('pointerup', () => this.clickHandler(cards2));
    });

    start = this.add
      .image(hGap * 5, vGap * 9, 'online_button')
      .setInteractive();
    start.on('pointerup', () => {
      this.scene.start('Game', { playerPool: pool });
      select = 0;
    });

    info = this.add
      .bitmapText(hGap * 5, vGap * 7, 'Syncopate', '')
      .setOrigin(0.5);
    warn = this.add
      .bitmapText(hGap * 5, vGap * 8, 'Syncopate', '')
      .setOrigin(0.5);

    this.input.mouse.disableContextMenu();
  }

  update() {
    info.setText(`You have selected ${select} cards`);

    if (select === 10) {
      warn.setText("You're good to go");
      start.setVisible(true);
    } else if (select < 10) {
      warn.setText(`Please add ${10 - select} cards`);
      start.setVisible(false);
    } else {
      warn.setText(`Please remove ${select - 10} cards`);
      start.setVisible(false);
    }
  }

  clickHandler(cards) {
    if (!cards.isTinted) {
      cards.setTint(0x008080);
      select++;
      if (!pool.includes(cards.texture.key)) pool.push(cards.texture.key);
    } else {
      cards.clearTint();
      select--;
      const index = pool.indexOf(cards.texture.key);
      if (index !== -1) pool.splice(index, 1);
    }
  }
}
