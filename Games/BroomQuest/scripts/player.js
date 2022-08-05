export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,key){
        super(scene,x,y,key);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(4);
        this.body.setSize(20,20);
        this.anims.play('right');

        this.dead = false;
    }

    update(keys){
        let input = {
            fly: Phaser.Input.Keyboard.JustDown(keys.fly) || this.scene.pointerDown,
        }
        if(!this.dead){
            if(this.scene.gameStarted){
                if(input.fly){
                    this.body.setVelocityY(-550);
                    this.scene.pointerDown = false;
                }
            }
            if(this.body.checkWorldBounds()){
                this.dead = true;
                this.body.setVelocityY(0);
            }
        }else{
            //TODO: some death animation maybe who knows
        }
    }
}