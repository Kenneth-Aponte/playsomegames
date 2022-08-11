export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
        this.startJoystick = false;
    }
    
    create(){
        this.height = this.game.canvas.height;
        this.width = this.game.canvas.width;

        this.OWScene = this.scene.get('GameScene_Main');

        //joystick
        if(!this.sys.game.device.os.desktop){
            this.joystick = this.physics.add.sprite(this.width*0.15,this.height*0.7, 'joystick').setScale(8).setAlpha(0.6);
            this.joystick.setInteractive();
    
            //joystick animations
            this.joystickAnim = this.anims.create({
                key:'handle',
                frames: this.anims.generateFrameNumbers('joystick', {start: 0, end: 8}),
                frameRate: 0,
            })
            this.joystick.anims.play('handle');

            //joystick events
            this.joystick.on('pointerdown',() => {
                this.startJoystick = true;
            });
            this.joystick.on('pointerup', () => {
                this.startJoystick = false;
                this.OWScene.resetJoystick();
                this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(0));
            });       
        }
    }


    update(){
        //joystick
        if(this.startJoystick){
            //did i stop clicking?
            if(!this.input.activePointer.isDown){
                this.startJoystick = false;
                this.OWScene.resetJoystick();
                this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(0));
            }else{
                //reset all movement
                this.OWScene.resetJoystick();

                //there is a distance from the center that will not listen to inputs as i want an area for your finger to rest
                const dist = Math.sqrt(Math.pow(this.input.x-this.joystick.x,2) + Math.pow(this.input.y-this.joystick.y,2))
        
                if(dist  > (this.joystick.width*this.joystick.scaleX)/4){//outside of rest zone, hence can move
                    var angle = Math.atan2((this.input.y - this.joystick.y),(this.input.x-this.joystick.x));//in radians
                    angle = -1*angle*180/(Math.PI);//in deg
                    if(this.input.y > this.joystick.y){
                        angle+=360;
                    }
                    //the angle is now between 0 and  360 (easier to worth with imo)
                    //main 4 directions 
                    if(angle > 337.5 || angle < 22.5){//must be an or (think about it)
                        this.OWScene.joystickInput.right = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(1));
                    }
                    else if(angle > 157.5 && angle < 202.5){
                        this.OWScene.joystickInput.left = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(2));
                    }else if(angle > 247.5 && angle < 292.5){
                        this.OWScene.joystickInput.down = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(4));
                    }
                    else if(angle > 67.5 && angle < 112.5 ){
                        this.OWScene.joystickInput.up = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(3));
                    }
                    //4 combined directions
                    else if(angle > 22.5 && angle < 67.5){
                        this.OWScene.joystickInput.right = true;
                        this.OWScene.joystickInput.up = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(5));
    
                    }else if(angle > 112.5 && angle < 157.5){
                        this.OWScene.joystickInput.up = true;
                        this.OWScene.joystickInput.left = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(6));
    
                    }else if(angle > 202.5 && angle < 247.5){
                        this.OWScene.joystickInput.left = true;
                        this.OWScene.joystickInput.down = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(7));
    
                    }else if(angle > 292.5 && angle < 337.5){
                        this.OWScene.joystickInput.down = true;
                        this.OWScene.joystickInput.right = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(8));
                    }
                }
            }
        }
        

    }

    resize(w, h){
        this.width = w;
        this.height = h;
        if(!this.sys.game.device.os.desktop){
            this.joystick.x = w*0.15;
            this.joystick.y = h*0.7;
        }
    }
}