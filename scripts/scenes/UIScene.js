export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
    }
    
    create(){
        this.startJoystick = false;
        this.joystickPointer;

        this.height = this.game.canvas.height;
        this.width = this.game.canvas.width;

        this.OWScene = this.scene.get('ArcadeScene');//TODO: change this

        //joystick and buttons
        if(!this.sys.game.device.os.desktop){
            
            //joystick
            this.joystick = this.physics.add.sprite(this.width*0.15,this.height*0.7, 'joystick').setScale(12).setAlpha(0.6);
            this.joystick.setInteractive();
    
            //joystick animations
            this.joystickAnim = this.anims.create({
                key:'handle',
                frames: this.anims.generateFrameNumbers('joystick', {start: 0, end: 8}),
                frameRate: 0
            })
            this.joystick.anims.play('handle');

            //joystick events
            this.joystick.on('pointerdown',(pointer) => {
                this.joystickPointer = pointer;
                this.startJoystick = true;
            });
            this.joystick.on('pointerup', () => {
                this.startJoystick = false;
                this.OWScene.resetMobile();
                this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(0));
            });     
            
            //A Button
            this.A_Button = this.physics.add.sprite(this.width*0.85, this.height*0.6,'button_A').setScale(8).setAlpha(0.6);
            this.A_Button.setInteractive();

            //A Button animations
            this.A_ButtonAnim = this.anims.create({
                key: 'pressA',
                frames: this.anims.generateFrameNumbers('button_A', {start: 0, end: 1}),
                frameRate: 0,
                repeat: -1
            });
            this.A_Button.anims.play('pressA');

            //A Button events
            this.A_Button.on('pointerdown', () => {
                this.A_Button.anims.setCurrentFrame(this.A_ButtonAnim.getFrameAt(1));
                this.A_Button.setTint('0x999999');
                this.OWScene.mobileInput.A_Button = true;
            });
            
            this.A_Button.on('pointerup', () => {
                this.A_Button.anims.setCurrentFrame(this.A_ButtonAnim.getFrameAt(0));
                this.A_Button.setTint('0xffffff');
                this.OWScene.mobileInput.A_Button = false;
            });

            this.A_Button.on('pointerout', () => {
                this.A_Button.anims.setCurrentFrame(this.A_ButtonAnim.getFrameAt(0));
                this.A_Button.setTint('0xffffff');
                this.OWScene.mobileInput.A_Button = false;
            });
        }
    }


    update(){
        //joystick
        if(this.startJoystick){
            //did i stop clicking?
            if(!this.joystickPointer.isDown){
                this.startJoystick = false;
                this.OWScene.resetMobile();
                this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(0));
            }else{
                //reset all movement
                this.OWScene.resetMobile();

                //there is a distance from the center that will not listen to inputs as i want an area for your finger to rest
                const dist = Math.sqrt(Math.pow(this.joystickPointer.x-this.joystick.x,2) + Math.pow(this.joystickPointer.y-this.joystick.y,2))
        
                if(dist  > (this.joystick.width*this.joystick.scaleX)/4){//outside of rest zone, hence can move
                    var angle = Math.atan2((this.joystickPointer.y - this.joystick.y),(this.joystickPointer.x-this.joystick.x));//in radians
                    angle = -1*angle*180/(Math.PI);//in deg
                    if(this.joystickPointer.y > this.joystick.y){
                        angle+=360;
                    }
                    //the angle is now between 0 and  360 (easier to worth with imo)
                    //main 4 directions 
                    if(angle > 337.5 || angle < 22.5){//must be an or (think about it)
                        this.OWScene.mobileInput.right = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(1));
                    }
                    else if(angle > 157.5 && angle < 202.5){
                        this.OWScene.mobileInput.left = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(2));
                    }else if(angle > 247.5 && angle < 292.5){
                        this.OWScene.mobileInput.down = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(4));
                    }
                    else if(angle > 67.5 && angle < 112.5 ){
                        this.OWScene.mobileInput.up = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(3));
                    }
                    //4 combined directions
                    else if(angle > 22.5 && angle < 67.5){
                        this.OWScene.mobileInput.right = true;
                        this.OWScene.mobileInput.up = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(5));
    
                    }else if(angle > 112.5 && angle < 157.5){
                        this.OWScene.mobileInput.up = true;
                        this.OWScene.mobileInput.left = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(6));
    
                    }else if(angle > 202.5 && angle < 247.5){
                        this.OWScene.mobileInput.left = true;
                        this.OWScene.mobileInput.down = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(7));
    
                    }else if(angle > 292.5 && angle < 337.5){
                        this.OWScene.mobileInput.down = true;
                        this.OWScene.mobileInput.right = true;
                        this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(8));
                    }
                }else{//indisde rest zone
                    this.joystick.anims.setCurrentFrame(this.joystickAnim.getFrameAt(0));
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
            this.A_Button.x = w*0.85;
            this.A_Button.y = h*0.6;
        }
    }
}