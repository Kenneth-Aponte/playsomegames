export default class SwordPair {
    constructor(scene,x,y,key){
        this.scene = scene;
        this.addedScore = false;

        this.topSword = scene.physics.add.sprite(x,y,key).setScale(4).setFlipY(true).setTint('0x999999');
        this.topSword.y -= this.topSword.height*4/2 + 105;   
        this.topSword.body.setVelocityX(-400);
        this.topSword.body.setAllowGravity(false);
        this.topSword.setImmovable(true);

        this.bottomSword = scene.physics.add.sprite(x,y,key).setScale(4).setTint('0x999999');
        this.bottomSword.y += this.bottomSword.height*4/2 + 105;
        this.bottomSword.body.setVelocityX(-400);
        this.bottomSword.body.setAllowGravity(false);
        this.bottomSword.setImmovable(true);
        
    }

    update(){
        if(this.topSword.body.x <= -100){
            this.randY = Phaser.Math.Between(200,520);
            this.topSword.x = 1400;
            this.topSword.y = this.randY - (this.topSword.height*4/2 + 105);
            this.bottomSword.x = 1400;
            this.bottomSword.y = this.randY + (this.bottomSword.height*4/2 + 105);
            this.addedScore = false;
        }
        if(this.topSword.x <= 400 && !this.addedScore){
            this.scene.score+=1;
            this.scene.scoreText.setText(this.scene.score);
            this.addedScore = true;
        }
    }

    getTopSword(){
        return this.topSword;
    }

    getBottomSword(){
        return this.bottomSword;
    }
}