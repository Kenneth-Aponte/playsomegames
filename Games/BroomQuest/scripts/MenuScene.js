export default class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');    
        //moving witch
        this.witch;
        this.witchDir = "R";
        //flags
        this.loaded = false;
        //buttons
        this.startButtonText;
        this.startButton;
        //text
        this.gameNameText;
    }
    



    preload(){
        this.load.image('layer9', './assets/City Backround Layer9.png');
        this.load.image('layer8', './assets/City Backround Layer8.png');
        this.load.image('layer7', './assets/City Backround Layer7.png');
        this.load.image('layer6', './assets/City Backround Layer6.png');
        this.load.image('layer5', './assets/City Backround Layer5.png');
        this.load.image('layer4', './assets/City Backround Layer4.png');
        this.load.image('layer3', './assets/City Backround Layer3.png');
        this.load.image('layer2', './assets/City Backround Layer2.png');
        this.load.image('layer1', './assets/City Backround Layer1.png');
        this.load.image('sword', './assets/sword.png');

        this.load.spritesheet('button1', './assets/button1.png',{frameWidth: 29, frameHeight: 10});
        this.load.spritesheet('witchR', './assets/witchRight.png',{frameWidth: 32, frameHeight: 26});
        this.load.spritesheet('witchL', './assets/witchLeft.png',{frameWidth: 32, frameHeight: 26});
    

        this.loadFont();
    }


    create(){
        if(this.loaded){
            //static images --> background
            this.add.image(0,0,'layer9').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,0,'layer8').setOrigin(0,0).setScale(2,2);
            this.add.image(0,0,'layer7').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,0,'layer6').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,0,'layer5').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,0,'layer4').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,0,'layer3').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,0,'layer2').setOrigin(0,0).setScale(2.2,2);
            this.add.image(0,-150,'layer1').setOrigin(0,0).setScale(2.2,2);
            
            //Buttons
            //start button
            this.startButton = this.physics.add.sprite(640,484,'button1').setScale(10);
            this.startButtonText = this.add.text(640,480, 'PLAY', { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(5);
            this.startButton.setInteractive();

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

            //text
            this.gameNameText = this.add.text(640,200,'BROOM QUEST', { fontFamily: 'editundo', fontSize: '180px', color: '#d9d9d9'}).setOrigin(0.5,0).setResolution(10);
            this.gameNameText.setShadow(90,90,'#8c8c8c');

            //witch
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

            this.witch.anims.play('right');
            this.witch.setVelocityX(200);
        }
    }

    
    update(){
        if(this.loaded){
            //witch movement around the screen
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
    }

    startGame(){
        this.scene.stop('GameScene');//just in case
        this.scene.start('GameScene');
    }

    async loadFont(){
        const font = new FontFace('editundo', 'url(https://fonts.cdnfonts.com/s/29055/editundo.woff)');
        await font.load();
        document.fonts.add(font);
        document.body.classList.add('fonts-loaded');
        this.loaded = true;
    }
}

