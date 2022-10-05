export default class NPC_Person extends Phaser.GameObjects.Sprite{
    //TODO: this file will prob change a lot in the future, it is temp
    constructor(scene,x,y,facing,action){
        let keys = ['character2','character3','character4','character5'];
        
        super(scene,x,y);
        
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setSize(14,6);
        this.body.setOffset(1,26);
        this.body.setImmovable(true);
        this.y -= this.height/2;
        // console.log(this);
        //vars
        this.key = keys[Phaser.Math.Between(0,3)];
        
        //animations for idle
        this.anims.create({
            key: this.key + 'Right' + 'Idle',
            frames: this.anims.generateFrameNumbers(this.key + "Idle", {start: 0, end: 5}),
            frameRate: 14,
            repeat: -1,
        });
        this.anims.create({
            key: this.key + 'Back' + 'Idle',
            frames: this.anims.generateFrameNumbers(this.key + "Idle", {start: 6, end: 11}),
            frameRate: 14,
            repeat: -1,
        });
        this.anims.create({
            key: this.key + 'Left' + 'Idle',
            frames: this.anims.generateFrameNumbers(this.key + "Idle", {start: 12, end: 17}),
            frameRate: 14,
            repeat: -1,
        });
        this.anims.create({
            key: this.key + 'Front' + 'Idle',
            frames: this.anims.generateFrameNumbers(this.key + "Idle", {start: 18, end: 23}),
            frameRate: 14,
            repeat: -1,
        });

        this.directions = ['Front','Back','Right','Left'];
        
        this.action = action;
        this.facing = facing;
        if(this.facing == 'Random'){
            this.facing = this.directions[Phaser.Math.Between(0,3)];
        }
        
        this.anims.play(this.key + this.facing + 'Idle');
    }
    
    
    update(){
        //this makes this character be either above or below the player
        if(this.scene.player.y <= this.y && this.depth != 10){
            this.depth = 10;
        }else if(this.scene.player.y > this.y && this.depth != 0){
            this.depth = 0;
        }

        //code for them running around
        //randomly change their direction
        if(this.action == "run"){
            if(Phaser.Math.Between(0,100) == 1){
                this.facing = this.directions[Phaser.Math.Between(0,3)];
                this.anims.play(this.key+this.facing+'Idle', true);
            }
        }
    }
}
