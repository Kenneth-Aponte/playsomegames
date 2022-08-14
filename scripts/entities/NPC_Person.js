export default class NPC_Person extends Phaser.GameObjects.Sprite{
    //TODO: this file will prob change a lot in the future, it is temp
    constructor(scene,x,y){
        let key = 'playerTemp';//TODO: pick a random key
        
        super(scene,x,y);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setSize(14,6);
        this.body.setOffset(1,26);
        this.y -= this.height/2;
        // console.log(this);
        
        
        //vars
        this.action;
        
        this.anims.play('playerBackIdle');
    }
    
    
    update(){
        if(this.scene.player.y <= this.y && this.depth != 10){
            this.depth = 10;
        }else if(this.scene.player.y > this.y && this.depth != 0){
            this.depth = 0;
        }
    }
}
