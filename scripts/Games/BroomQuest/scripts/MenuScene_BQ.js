export default class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene_BQ');    
        //moving witch
        this.witch;
        this.witchDir = "R";
        //buttons
        this.startButtonText, this.exitButtonText;
        this.startButton, this.exitButton;
        //text
        this.gameNameText;
        this.introMusic;
    }


    create(){
        this.resize(1280,720);
        //static images --> background
        this.add.image(640,0,'layer9').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,400,'layer6').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,200,'layer5').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,200,'layer3').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,-180,'layer1').setScale(4).setOrigin(0.5,0.5);
        
        //Buttons

        //start button
        this.startButton = this.physics.add.sprite(450,484,'button1').setScale(10);
        this.startButtonText = this.add.text(450,480, 'PLAY', { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(5);
        this.startButton.setInteractive();

        //button animations
        this.anims.create({
            key: 'rest',
            frames: [{key: 'button1', frame: 0}]
        });
        this.anims.create({
            key: 'active',
            frames: [{key: 'button1', frame: 1}]
        });

        //start button events
        this.startButton.on('pointerover', () => {
            this.startButton.setTint('0xdddddd');
            this.startButtonText.setTint('0xdddddd');
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setTint('0xffffff');
            this.startButtonText.setTint('0xffffff');
        });
        this.startButton.on('pointerdown', () => {
            this.startButton.anims.play('active');
        });
        this.startButton.on('pointerup', () => {
            //changes to the next state
            this.startButton.anims.play('rest');
            this.startGame();
        });

        //exit button
        this.exitButton = this.physics.add.sprite(830, 484, 'button1').setScale(10); 
        this.exitButtonText = this.add.text(830,480, 'EXIT', { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(5);
        this.exitButton.setInteractive();

        //exit button events
        this.exitButton.on('pointerover', () => {
            this.exitButton.setTint('0xdddddd');
            this.exitButtonText.setTint('0xdddddd');
        });
        this.exitButton.on('pointerout', () => {
            this.exitButton.setTint('0xffffff');
            this.exitButtonText.setTint('0xffffff');
        });
        this.exitButton.on('pointerdown', () => {
            this.exitButton.anims.play('active');
        });
        this.exitButton.on('pointerup', () => {
            //changes to the next state
            this.exitButton.anims.play('rest');
            this.exitGame();
        });


        //text
        this.gameNameText = this.add.text(640,200,'BROOM QUEST', { fontFamily: 'editundo', fontSize: '180px', color: '#d9d9d9'}).setOrigin(0.5,0).setResolution(10);
        this.gameNameText.setShadow(90,90,'#8c8c8c');

        //animations
        this.witch = this.physics.add.sprite(200,150,'witchR').setScale(4);
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('witchR', {start: 0, end: 3}),
            frameRate: 16,
            repeat: -1,
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('witchL', {start: 0, end: 3}),
            frameRate: 16,
            repeat: -1,
        });

        //bomb wick tick
        this.anims.create({
            key: 'tick_B',
            frames: this.anims.generateFrameNumbers('bombB', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tick_T',
            frames: this.anims.generateFrameNumbers('bombT', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        //explosion
        this.newAnim = this.anims.create({
            key: 'bomb_explosion',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 4}),
            frameRate: 5
        });


        this.witch.anims.play('right');
        this.witch.setVelocityX(200);

        this.introMusic = this.sound.add('intro');
        this.introMusic.loop = true;
        this.introMusic.play();
    }

    
    update(){
        // witch movement around the screen
        if(this.witchDir == "R"){//right
            if(this.witch.body.velocity.x == 0 && Phaser.Math.Between(0, 100) == 1){//stopped moving
                this.witch.setVelocityX(-200,0);
                this.witchDir = "L";
            }
            else if(this.witch.x >= 1080){
                this.witch.setVelocity(0,0);
                this.witch.anims.play('left', true);
            }
        }else{//left
            if(this.witch.body.velocity.x == 0 && Phaser.Math.Between(0, 100) == 1){//stopped moving
                this.witch.setVelocityX(200,0);
                this.witchDir = "R";
            }
            else if(this.witch.x <= 200){
                this.witch.setVelocity(0,0);
                this.witch.anims.play('right',true);
            }    
        }
    }


    startGame(){
        this.introMusic.stop();
        this.scene.start('GameScene_BQ');
    }

    exitGame(){
        this.introMusic.stop();
        this.scene.stop('MenuScene_BQ');
        this.scene.run('ArcadeScene');
        this.scene.start('UIScene');
    }


    resize(w,h){
        this.scale.setGameSize(w,h);
        this.cameras.resize(w,h);
        this.scale.updateScale();
        this.scale.updateBounds();
    }
}

