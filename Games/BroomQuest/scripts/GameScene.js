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
    }

    
    create(){
        //background
        this.add.image(640,0,'layer9').setOrigin(0,0).setScale(4,4).setOrigin(0.5,0.5);
        this.add.image(640,400,'layer6').setOrigin(0,0).setScale(4,4).setOrigin(0.5,0.5);
        this.add.image(640,200,'layer5').setOrigin(0,0).setScale(4,4).setOrigin(0.5,0.5);
        this.add.image(640,200,'layer3').setOrigin(0,0).setScale(4,4).setOrigin(0.5,0.5);
        this.add.image(640,-180,'layer1').setOrigin(0,0).setScale(4,4).setOrigin(0.5,0.5);
        
        
        //player
        this.player = new Player(this,400,300,'witchR');
        
        //Bombs
        this.bombPairs = [];
        
        //keys
        this.keys = {
            fly: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        }

        this.input.on('pointerdown', () => {this.pointerDown = true;})
        
        this.FPS = this.add.text(1220, 16, '0', { fontFamily: 'editundo', fontSize: '32px', fill: '#ffffff' }).setResolution(5);
        //TODO: Game controls
    }


    update(){
        //entity updates
        if(!this.player.dead){
            this.player.update(this.keys);
            this.bombPairs.forEach((sP) =>{
                sP.update();
                if(!this.player.dead && (this.physics.world.collide(this.player, sP.getTopBomb()) || this.physics.world.collide(this.player, sP.getBottomBomb()))){
                    this.player.dead = true;
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
                this.scoreText = this.add.text(640,200, this.score, { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(5);
                //hide controls and other stuff
            }
        }
        else {//game is over
            this.bombPairs.forEach((sP2) =>{
                
                sP2.getTopBomb().body.setVelocityX(0);
                sP2.getBottomBomb().body.setVelocityX(0);
            });
            if(!this.nextSceneCalled){
                setTimeout(() => {
                    // console.log(this.scene);
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