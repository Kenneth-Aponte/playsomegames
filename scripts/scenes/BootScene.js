export default class BootScene extends Phaser.Scene {
    constructor(){
        super('BootScene');
    }

    preload(){
        //progress bar
        const g = this.add.graphics();

        //loading bar
        this.load.on('progress', (value) => {
            g.clear();
            g.fillStyle(0xffffff, 1);
            g.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
            console.log(value);
        });

        //done hence, start the initial scene which is temporarily
        this.load.on('complete', () => {
            //TODO: Animations
            g.destroy();
            this.scene.start('ArcadeScene');
        });

        //arcade interior
        this.load.spritesheet('playerTemp', './assets/sprites/Alex_run_16x16.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('playerTempIdle', './assets/sprites/Alex_idle_anim_16x16.png', {frameWidth: 16, frameHeight: 32});

        this.load.image('RoomBuilder', './assets/tilesets/Room_Builder_16x16-extruded.png');
        this.load.image('Basement', './assets/tilesets/14_Basement_16x16.png');
        this.load.image('Generic', './assets/tilesets/1_Generic_16x16.png');

        this.load.spritesheet('joystick', './assets/images/Joystick1.png', {frameWidth: 20, frameHeight: 20});
        this.load.spritesheet('button_A', './assets/images/A_Button.png', {frameWidth: 16, frameHeight: 16});

        this.load.tilemapTiledJSON('map', './assets/tilemaps/mainTempPSG.tmj');


        //load the other things from the other games and scenes

    }
}