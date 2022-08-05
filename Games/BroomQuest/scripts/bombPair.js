export default class BombPair {
    constructor(scene,x,y,key){
        this.scene = scene;
        this.addedScore = false;

        this.topBomb = scene.physics.add.sprite(x,y,'bombT').setScale(4).setTint('0x919aff');
        this.topBomb.y -= this.topBomb.height*4/2 + 85;   
        this.topBomb.body.setVelocityX(-400);
        this.topBomb.body.setAllowGravity(false);
        this.topBomb.body.setSize(14,250);
        this.topBomb.setImmovable(true);
        this.topBomb.anims.play('tick_T');

        this.bottomBomb = scene.physics.add.sprite(x,y,'bombB').setScale(4).setTint('0x919aff');
        this.bottomBomb.y += this.bottomBomb.height*4/2 + 85;
        this.bottomBomb.body.setVelocityX(-400);
        this.bottomBomb.body.setAllowGravity(false);
        this.bottomBomb.body.setSize(14,250);
        this.bottomBomb.setImmovable(true);
        this.bottomBomb.anims.play('tick_B');
        
    }

    update(){
        if(this.topBomb.body.x <= -100){
            this.randY = Phaser.Math.Between(200,520);
            this.topBomb.x = 1400;
            this.topBomb.y = this.randY - (this.topBomb.height*4/2 + 85);
            this.bottomBomb.x = 1400;
            this.bottomBomb.y = this.randY + (this.bottomBomb.height*4/2 + 85);
            this.addedScore = false;
        }
        if(this.topBomb.x <= 400 && !this.addedScore){
            this.scene.score+=1;
            this.scene.scoreText.setText(this.scene.score);
            this.addedScore = true;
        }
    }

    getTopBomb(){
        return this.topBomb;
    }

    getBottomBomb(){
        return this.bottomBomb;
    }
}