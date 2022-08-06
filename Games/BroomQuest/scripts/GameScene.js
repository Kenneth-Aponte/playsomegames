import Player from "./player.js";
import BombPair from "./bombPair.js";

export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene');

        //vars
        this.gameStarted = false;
        this.pointerDown = false;
        this.nextSceneCalled = false;
        this.score = 0;
        this.FPS = 0;
        
        //text
        this.scoreText;
        this.controlsText;

        //audio
        this.startSound;
        this.birdSound;
        this.explosionSound;
    }

    
    create(){
        //background
        this.add.image(640,0,'layer9').setScale(4).setOrigin(0.5,0.5);
        this.add.image(640,400,'layer6').setScale(4).setOrigin(0.5,0.5);

        this.layers = this.add.group();
        this.layers.create(640,200, 'layer5').setOrigin(0.5,0.5).setScale(4);
        this.layers.create(640 + 600*3,200, 'layer5').setOrigin(0.5,0.5).setScale(4);
        this.layers.create(640,200, 'layer3').setOrigin(0.5,0.5).setScale(4);
        this.layers.create(640 + 600*3,200, 'layer3').setOrigin(0.5,0.5).setScale(4);
        this.layers.create(640,-180, 'layer1').setOrigin(0.5,0.5).setScale(4);
        this.layers.create(640 + 600*3,-180, 'layer1').setOrigin(0.5,0.5).setScale(4);

        //player
        this.player = new Player(this,400,280,'witchR');
        
        //Bombs
        this.bombPairs = [];
        
        //keys
        this.keys = {
            fly: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        }

        this.input.on('pointerdown', () => {this.pointerDown = true;})
        
        this.FPS = this.add.text(1220, 16, '0', { fontFamily: 'editundo', fontSize: '32px', fill: '#ffffff' }).setResolution(5);
        this.controlsText = this.add.text(640, 360, 'TAP TO FLY!', { fontFamily: 'editundo', fontSize: '64px', fill: '#d9d9d9' }).setResolution(10).setOrigin(0.5,0.5);
        this.controlsText.setShadow(32,32,'#8c8c8c');  
        
        if(this.sys.game.device.os.desktop){
            this.controlsText.setText('PRESS SPACE TO FLY!');
        }

        this.controlsInterval = setInterval(() => {
            this.controlsText.visible = !this.controlsText.visible;
        }, 300);

        this.startSound = this.sound.add('start');
        this.birdSound = this.sound.add('bird');
        this.explosionSound = this.sound.add('dead_explosion');
    }


    update(){
        //entity updates
        if(!this.player.dead){
            this.player.update(this.keys);

            //moving background
            if(this.gameStarted){
                this.layers.children.iterate((l) => {
                    if(l.texture.key == 'layer1'){
                        l.x-=4;
                    }
                    else if(l.texture.key == 'layer3'){
                        l.x-=2;
                    }
                    else{
                        l.x-=1;
                    }
    
                    if(l.x <= -600*2){
                        l.x = 640 + 600*3;
                    }
                });
            }

            this.bombPairs.forEach((sP) =>{
                sP.update();
                if(!this.player.dead){
                    if(this.physics.world.collide(this.player, sP.getTopBomb())){
                        this.player.dead = true;
                        //top bomb explodes
                        sP.hitTopBomb();
                        this.explosionSound.play();

                    }
                    else if(this.physics.world.collide(this.player, sP.getBottomBomb())){
                        this.player.dead = true;
                        //bottom bomb explodes
                        sP.hitBottomBomb();
                        this.explosionSound.play();
                    }
                }
            });
            
            if((this.keys.fly.isDown || this.pointerDown) && !this.gameStarted){
                this.physics.world.gravity.y = 2100;
                this.player.body.setVelocityY(-550);
                this.gameStarted = true;
                this.pointerDown = false;
                //populate bombs list
                this.bombPairs.push(new BombPair(this,1500,Phaser.Math.Between(200,520),'bomb'));
                this.bombPairs.push(new BombPair(this,2000,Phaser.Math.Between(200,520),'bomb'));
                this.bombPairs.push(new BombPair(this,2500,Phaser.Math.Between(200,520),'bomb'));
                //text
                this.scoreText = this.add.text(640,200, this.score, { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(10);
                this.scoreText.setShadow(40,40, '#8c8c8c');
                //hide controls 
                clearInterval(this.controlsInterval);
                this.controlsText.visible = false;
                this.startSound.play();
            }
        }
        else {//game is over
            //dead witch animation
            this.player.rotation += 0.5;
            this.bombPairs.forEach((sP2) =>{
                
                sP2.getTopBomb().body.setVelocityX(0);
                sP2.getBottomBomb().body.setVelocityX(0);
            });
            if(!this.nextSceneCalled){
                setTimeout(() => {
                    this.scene.stop('GameOverScene');
                    this.scene.start('GameOverScene', this.score.toString());
                }, 2000);
                this.nextSceneCalled = true;
            }
        }
        //update current fps 
        this.FPS.setText(Phaser.Math.RoundTo(this.game.loop.actualFps,0));
    }
}