import GameScene from "./GameScene.js";

export default class GameOverScene extends Phaser.Scene {
    constructor(){
        super('GameOverScene');
        //buttons
        this.menuButtonText;
        this.menuButton;
        //text
        this.gameOverText;

        this.score;
        this.scoreText;

        this.gameOverMusic;
    }

    init(data){
        //passing the score from the prev scene (GameScene)
        this.score = data;
    }


    create(){
        //reset the game scene (apparently this is the only way to do a proper restart)
        this.scene.remove('GameScene');
        this.scene.add('GameScene', GameScene);
        
        //static images --> background
        this.add.image(640,0,'layer9').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,400,'layer6').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,200,'layer5').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,200,'layer3').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,-180,'layer1').setScale(4).setOrigin(0.5,0.5);

        //Buttons
        //menu button
        this.menuButton = this.physics.add.sprite(640,484,'button1').setScale(10);
        this.menuButtonText = this.add.text(640,480, 'MENU', { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(5);
        this.menuButton.setInteractive();

        this.anims.create({
            key: 'rest',
            frames: [{key: 'button1', frame: 0}]
        });
        this.anims.create({
            key: 'active',
            frames: [{key: 'button1', frame: 1}]
        });

        //menu button events
        this.menuButton.on('pointerover', () => {
            this.menuButton.setTint('0xdddddd');
            this.menuButtonText.setTint('0xdddddd');
        });
        this.menuButton.on('pointerout', () => {
            this.menuButton.setTint('0xffffff');
            this.menuButtonText.setTint('0xffffff');
        });
        this.menuButton.on('pointerdown', () => {
            this.menuButton.anims.play('active');
        });
        this.menuButton.on('pointerup', () => {
            //changes to the next state
            this.menuButton.anims.play('rest');
            this.startGame();
        });

        //text
        this.gameOverText = this.add.text(640,200,'GAME OVER', { fontFamily: 'editundo', fontSize: '180px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(10);
        this.gameOverText.setShadow(90,90,'#8c8c8c');
        this.scoreText = this.add.text(640,350,'SCORE: ' + this.score.toString(), { fontFamily: 'editundo', fontSize: '90px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(10);
        this.scoreText.setShadow(45,45,'#8c8c8c');
        
        this.gameOverMusic = this.sound.add('game_over');
        this.gameOverMusic.play();
    }


    startGame(){
        this.gameOverMusic.stop();
        this.scene.stop('MenuScene');
        this.scene.start('MenuScene');
    }
}

