export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key){
        super(scene,x,y, key);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        
        this.body.setSize(14,6);
        this.body.setOffset(1,26);
        this.setDepth(2);

        this.anims.play('playerFrontIdle');
    }

    update(time, delta, userInput){

        const speed = 70;
        const prevAnim = this.anims.currentAnim.key;


        this.body.setVelocity(0);

        //horizontal movement
        if(userInput.left){
            this.body.setVelocityX(-speed);
        }
        else if(userInput.right){
            this.body.setVelocityX(speed);
        }

        //vertical movement
        if(userInput.up){
            this.body.setVelocityY(-speed);
        }
        else if(userInput.down){
            this.body.setVelocityY(speed);
        }
        
        //animations
        //if moving left or right then prioritize that over the rest
        if (userInput.left) {
            this.anims.play('playerLeft', true);
        } 
        else if (userInput.right) {
            this.anims.play('playerRight', true);
        } 
        else if (userInput.up) {
            this.anims.play('playerBack', true);
        } 
        else if (userInput.down) {
            this.anims.play('playerFront', true);
        } 
        else {
            //player not moving
            if(!prevAnim.endsWith('Idle')){
                this.anims.play(prevAnim + "Idle", true);
            }
        }

        //normalize to avoid faster speed on diagonal
        this.body.velocity.normalize().scale(speed);

    }
}