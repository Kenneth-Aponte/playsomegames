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

        this.loadingText = this.add.text(50,this.sys.game.config.height - 50, 'Loading...', { fontFamily: 'arial', fontSize: '20px', color: '#ffffff'}).setOrigin(0,0.5);
        this.percentageText = this.add.text(this.sys.game.config.width-50,this.sys.game.config.height - 50, '0', { fontFamily: 'arial', fontSize: '20px', color: '#ffffff'}).setOrigin(1,0.5);

        this.loadingTextInterval = setInterval(() => {
            if(this.loadingText.text == 'Loading...'){
                this.loadingText.setText('Loading..');
            }else{
                this.loadingText.setText('Loading...');
            }
        }, 500); // 500ms

        //loading bar
        this.load.on('progress', (value) => {
            g.clear();
            g.fillStyle(0x172022, 1);
            g.fillRect(0,0,this.sys.game.config.width, this.sys.game.config.height);

            g.fillStyle(0xffffff, 1);
            g.fillRect(0, this.sys.game.config.height - 30, this.sys.game.config.width * value, 10);
            
            this.percentageText.setText(Phaser.Math.RoundTo(value*100,0) + '%');
        });

        //done hence, start the initial scene which is temporarily
        this.load.on('complete', () => {
            clearInterval(this.loadingTextInterval);
            g.destroy();
            this.scene.start('ArcadeScene');
        });

        //arcade interior
        this.load.spritesheet('playerMain', './assets/sprites/character1_running.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('playerMainIdle', './assets/sprites/character1_idle.png', {frameWidth: 16, frameHeight: 32});

        this.load.spritesheet('character2Idle', './assets/sprites/character2_idle.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('character3Idle', './assets/sprites/character3_idle.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('character4Idle', './assets/sprites/character4_idle.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('character5Idle', './assets/sprites/character5_idle.png', {frameWidth: 16, frameHeight: 32});
        // this.load.spritesheet('character2Running', './assets/sprites/character2_Running.png', {frameWidth: 16, frameHeight: 32});
        // this.load.spritesheet('character3Running', './assets/sprites/character3_Running.png', {frameWidth: 16, frameHeight: 32});
        // this.load.spritesheet('character4Running', './assets/sprites/character4_Running.png', {frameWidth: 16, frameHeight: 32});
        // this.load.spritesheet('character5Running', './assets/sprites/character5_Running.png', {frameWidth: 16, frameHeight: 32});

        this.load.image('RoomBuilder', './assets/tilesets/Room_Builder_16x16-extruded.png');
        this.load.image('Basement', './assets/tilesets/14_Basement_Shadowless.png');
        this.load.image('Generic', './assets/tilesets/1_Generic_Shadowless.png');
        this.load.image('ShootingRange', './assets/tilesets/25_Shooting_Range_Shadowless.png');
        
        
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

        // this.load.audio('introBQ', '../../assets/BroomQuest_assets/intro_music.wav');
        this.load.audio('start', '../../assets/BroomQuest_assets/secret.wav');
        this.load.audio('bird', '../../assets/BroomQuest_assets/bird.wav');
        // this.load.audio('game_over', '../../assets/BroomQuest_assets/Game-Over.wav');
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