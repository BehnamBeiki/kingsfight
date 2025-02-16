import { Scene } from 'phaser';

let info,
  start,
  select = 0;

export class GameOver extends Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.image(480, 300, 'bg');
    start = this.add.image(480, 650, 'online_button').setInteractive();

    info = this.add
      .text(this.cameras.main.width / 2, 300, '', {
        fontFamily: 'Crimson',
        fontSize: '20px',
        color: '#ede9e0',
      })
      .setOrigin(0.5);

    info.setText(`            Written by :
    
    
               Behnam Beiki
    
              -VirtualLich-
        
      behnam_beiki@yahoo.com
        
        `);

    start.on(
      'pointerup',
      function () {
        this.scene.start('Boot');
        select = 0;
      },
      this
    );
  }
}
