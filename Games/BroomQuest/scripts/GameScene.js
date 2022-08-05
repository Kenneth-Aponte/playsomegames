import Player from "./player.js";
import SwordPair from "./swordPair.js";

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
        this.add.image(0,0,'layer9').setOrigin(0,0).setScale(2.2,2);//static
        this.add.image(0,0,'layer8').setOrigin(0,0).setScale(2,2);//static
        this.add.image(0,0,'layer7').setOrigin(0,0).setScale(2.2,2);//static
        this.add.image(0,0,'layer6').setOrigin(0,0).setScale(2.2,2);//static
        this.add.image(0,0,'layer5').setOrigin(0,0).setScale(2.2,2);//static
        this.add.image(0,0,'layer4').setOrigin(0,0).setScale(2.2,2);//move
        this.add.image(0,0,'layer3').setOrigin(0,0).setScale(2.2,2);//move
        this.add.image(0,0,'layer2').setOrigin(0,0).setScale(2.2,2);//move
        this.add.image(0,-150,'layer1').setOrigin(0,0).setScale(2.2,2);//move
        
        
        //player
        this.player = new Player(this,400,300,'witchR');
        
        //swords
        this.swordPairs = [];
        
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
            this.swordPairs.forEach((sP) =>{
                sP.update();
                if(!this.player.dead && (this.physics.world.collide(this.player, sP.getTopSword()) || this.physics.world.collide(this.player, sP.getBottomSword()))){
                    this.player.dead = true;
                }
            });
            
            if((this.keys.fly.isDown || this.pointerDown) && !this.gameStarted){
                this.physics.world.gravity.y = 2100;
                this.player.body.setVelocityY(-550);
                this.gameStarted = true;
                this.pointerDown = false;
                //populate swords list
                this.swordPairs.push(new SwordPair(this,1500,Phaser.Math.Between(200,520),'sword'));
                this.swordPairs.push(new SwordPair(this,2000,Phaser.Math.Between(200,520),'sword'));
                this.swordPairs.push(new SwordPair(this,2500,Phaser.Math.Between(200,520),'sword'));
                //text
                this.scoreText = this.add.text(640,200, this.score, { fontFamily: 'editundo', fontSize: '80px', color: '#d9d9d9'}).setOrigin(0.5,0.5).setResolution(5);
                //hide controls and other stuff
            }
        }
        else {//game is over
            this.swordPairs.forEach((sP2) =>{
                
                sP2.getTopSword().body.setVelocityX(0);
                sP2.getBottomSword().body.setVelocityX(0);
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