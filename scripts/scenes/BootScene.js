// import test from '../../assets/BroomQuest_assets'
export default class BootScene extends Phaser.Scene {
    constructor(){
        super('BootScene');
    }

    preload(){
        //progress bar
        const g = this.add.graphics();
        
        //fonts
        this.loadFont();

        //loading bar
        this.load.on('progress', (value) => {
            g.clear();
            g.fillStyle(0xffffff, 1);
            g.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
            // console.log(value);
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


        //BroomQuest
        this.load.image('layer9', '../../assets/BroomQuest_assets/City Backround Layer9.png');
        this.load.image('layer8', '../../assets/BroomQuest_assets/City Backround Layer8.png');
        this.load.image('layer7', '../../assets/BroomQuest_assets/City Backround Layer7.png');
        this.load.image('layer6', '../../assets/BroomQuest_assets/City Backround Layer6.png');
        this.load.image('layer5', '../../assets/BroomQuest_assets/City Backround Layer5.png');
        this.load.image('layer4', '../../assets/BroomQuest_assets/City Backround Layer4.png');
        this.load.image('layer3', '../../assets/BroomQuest_assets/City Backround Layer3.png');
        this.load.image('layer2', '../../assets/BroomQuest_assets/City Backround Layer2.png');
        this.load.image('layer1', '../../assets/BroomQuest_assets/City Backround Layer1.png');

        this.load.spritesheet('button1', '../../assets/BroomQuest_assets/button1.png',{frameWidth: 29, frameHeight: 10});
        this.load.spritesheet('witchR', '../../assets/BroomQuest_assets/witchRight.png',{frameWidth: 32, frameHeight: 26});
        this.load.spritesheet('witchL', '../../assets/BroomQuest_assets/witchLeft.png',{frameWidth: 32, frameHeight: 26});
        this.load.spritesheet('bombT', '../../assets/BroomQuest_assets/bomb_T.png', {frameWidth: 24, frameHeight: 256});
        this.load.spritesheet('bombB', '../../assets/BroomQuest_assets/bomb_B.png', {frameWidth: 24, frameHeight: 256});
        this.load.spritesheet('explosion', '../../assets/BroomQuest_assets/explosion.png',{frameWidth: 16,frameHeight: 16});

        this.load.audio('intro', '../../assets/BroomQuest_assets/intro_music.wav');
        this.load.audio('start', '../../assets/BroomQuest_assets/secret.wav');
        this.load.audio('bird', '../../assets/BroomQuest_assets/bird.wav');
        this.load.audio('game_over', '../../assets/BroomQuest_assets/Game-Over.wav');
        this.load.audio('dead_explosion', '../../assets/BroomQuest_assets/ExplosionSound.wav');

    }

    async loadFont(){
        const font = new FontFace('editundo', 'url(https://fonts.cdnfonts.com/s/29055/editundo.woff)');
        //load the one from space survival later too
        await font.load();
        document.fonts.add(font);
        document.body.classList.add('fonts-loaded');
    }
}