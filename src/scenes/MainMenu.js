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

    const cards = Phaser.Utils.Array.Shuffle([
      'king',
      'dragon',
      'wolf',
      'bear',
      'snake',
      'panther',
      'staff',
      'shield',
      'flame',
      'fruit',
      'ogre',
      'centaur',
      'troll',
      'devil',
    ]);

    cards.forEach((card, i) => {
      const row = Math.floor(i / 7);
      const x = hGap * ((i % 7) + 1);
      const y = vGap * (row === 0 ? 2 : 5);
      const cardImage = this.add.image(x + hGap, y, card).setInteractive();
      cardImage.name = `card-${i}`;
      cardImage.on('pointerup', () => this.clickHandler(cardImage));
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
      cards.setTint(0x666666);
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
