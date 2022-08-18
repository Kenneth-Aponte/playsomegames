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
        
        
        
        this.load.tilemapTiledJSON('map', './assets/tilemaps/mainTempPSG.tmj');
        
        //UI
        this.load.image('joystick_BG', './assets/images/Joystick.png');
        this.load.image('joystick_FG', './assets/images/LargeHandleFilled.png');
        
        this.load.spritesheet('button_A', './assets/images/A_Button.png', {frameWidth: 16, frameHeight: 16});

        //Space Survival
        this.load.image('star','../../assets/SpaceSurvival_assets/star.png');
        this.load.image('sideRock','../../assets/SpaceSurvival_assets/clouds.png');
        this.load.image('pBullet','../../assets/SpaceSurvival_assets/pBullet.png');
        this.load.image('e2Bullet','../../assets/SpaceSurvival_assets/e2Bullet.png');
        this.load.image('shipGUI', '../../assets/SpaceSurvival_assets/shipGUI.png');
        this.load.image('enemies3', '../../assets/SpaceSurvival_assets/enemy3.png');
        
        this.load.spritesheet('shipNT','../../assets/SpaceSurvival_assets/shipST.png', {frameWidth: 16, frameHeight: 14});
        this.load.spritesheet('shipST','../../assets/SpaceSurvival_assets/shipST.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('shipBT','../../assets/SpaceSurvival_assets/shipBT.png', {frameWidth: 16, frameHeight: 22});
        this.load.spritesheet('enemies1','../../assets/SpaceSurvival_assets/enemy1.png', {frameWidth: 16, frameHeight: 13});
        this.load.spritesheet('enemies2','../../assets/SpaceSurvival_assets/enemy2.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('explosionPlayer','../../assets/SpaceSurvival_assets/playerExplosion.png', {frameWidth: 16, frameHeight: 16});
    
        this.load.audio('fire1','../../assets/SpaceSurvival_assets/LaserFire1.wav');
        this.load.audio('fire2','../../assets/SpaceSurvival_assets/LaserFire2.wav');
        this.load.audio('introSS','../../assets/SpaceSurvival_assets/intro_cut.mp3');
        this.load.audio('explosion1', '../../assets/SpaceSurvival_assets/hurt.wav');
        this.load.audio('explosion2', '../../assets/SpaceSurvival_assets/Explosion2.wav');
        this.load.audio('explosion3', '../../assets/SpaceSurvival_assets/Explosion3.wav');
        this.load.audio('respawn', '../../assets/SpaceSurvival_assets/VictorySmall.wav');
        this.load.audio('newRound', '../../assets/SpaceSurvival_assets/VictoryBig.wav');
        this.load.audio('gameOver', '../../assets/SpaceSurvival_assets/GameOver.wav');
        this.load.audio('moveSound', '../../assets/SpaceSurvival_assets/enemy2move.wav') 
        this.load.audio('moveSound2', '../../assets/SpaceSurvival_assets/enemy3move.wav') 

        //Broom Quest
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

        this.load.audio('introBQ', '../../assets/BroomQuest_assets/intro_music.wav');
        this.load.audio('start', '../../assets/BroomQuest_assets/secret.wav');
        this.load.audio('bird', '../../assets/BroomQuest_assets/bird.wav');
        this.load.audio('game_over', '../../assets/BroomQuest_assets/Game-Over.wav');
        this.load.audio('dead_explosion', '../../assets/BroomQuest_assets/ExplosionSound.wav');

    }

    async loadFont(){
        const font1 = new FontFace('editundo', 'url(https://fonts.cdnfonts.com/s/29055/editundo.woff)');
        const font2 = new FontFace('serious1', 'url(https://fonts.cdnfonts.com/s/7418/Serious-1.woff)');
        await font1.load();
        await font2.load();
        document.fonts.add(font1);
        document.fonts.add(font2);
        document.body.classList.add('fonts-loaded');
    }
}