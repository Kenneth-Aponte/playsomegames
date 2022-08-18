export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
    }
    
    create(){
        this.startJoystick = false;
        this.joystickPointer;

        this.height = this.game.canvas.height;
        this.width = this.game.canvas.width;

        this.OWScene;

        //joystick and buttons
        if(!this.sys.game.device.os.desktop){
            
            //joystick
            this.joystick = this.physics.add.image(this.width*0.15,this.height*0.7, 'joystick_BG').setScale(2/3).setAlpha(0.6);
            this.joystickHandle = this.physics.add.image(this.width*0.15,this.height*0.7, 'joystick_FG').setScale(2/3).setAlpha(0.6);
            this.joystick.setInteractive();

            //joystick events
            this.joystick.on('pointerdown',(pointer) => {
                this.joystickPointer = pointer;
                this.startJoystick = true;
            });
            this.joystick.on('pointerup', () => {
                this.startJoystick = false;
                this.OWScene.resetMobile();
                this.joystickHandle.x = this.joystick.x;
                this.joystickHandle.y = this.joystick.y;
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
        if(this.OWScene != undefined){
            //joystick
            if(this.startJoystick){
                //did i stop clicking?
                if(!this.joystickPointer.isDown){
                    this.startJoystick = false;
                    this.OWScene.resetMobile();
                    this.joystickHandle.x = this.joystick.x;
                    this.joystickHandle.y = this.joystick.y;
                }else{
                    //reset all movement
                    this.OWScene.resetMobile();
    
                    //there is a distance from the center that will not listen to inputs as i want an area for your finger to rest
                    const dist = Math.sqrt(Math.pow(this.joystickPointer.x-this.joystick.x,2) + Math.pow(this.joystickPointer.y-this.joystick.y,2))
            
                    if(dist  > (this.joystick.width*this.joystick.scaleX)/8){//outside of rest zone, hence can move
                        var angle = Math.atan2((this.joystickPointer.y - this.joystick.y),(this.joystickPointer.x-this.joystick.x));//in radians
                        angle = -1*angle*180/(Math.PI);//in deg
                        if(this.joystickPointer.y > this.joystick.y){
                            angle+=360;
                        }

                        //so that the handle doesn't exit the circle
                        if(dist < (this.joystick.width*this.joystick.scaleX)/2){
                            this.joystickHandle.x = this.joystickPointer.x;
                            this.joystickHandle.y = this.joystickPointer.y;
                        }else{
                            this.joystickHandle.x = this.joystick.x + ((this.joystick.width*this.joystick.scaleX)/2)*Math.cos(-1*Phaser.Math.DegToRad(angle));
                            this.joystickHandle.y = this.joystick.y + ((this.joystick.width*this.joystick.scaleX)/2)*Math.sin(-1*Phaser.Math.DegToRad(angle));
                        }

                        //the angle is now between 0 and  360 (easier to worth with imo)
                        //main 4 directions 
                        if(angle > 337.5 || angle < 22.5){//must be an or (think about it)
                            this.OWScene.mobileInput.right = true;
                        }
                        else if(angle > 157.5 && angle < 202.5){
                            this.OWScene.mobileInput.left = true;
                        }else if(angle > 247.5 && angle < 292.5){
                            this.OWScene.mobileInput.down = true;
                        }
                        else if(angle > 67.5 && angle < 112.5 ){
                            this.OWScene.mobileInput.up = true;
                        }
                        //4 combined directions
                        else if(angle > 22.5 && angle < 67.5){
                            this.OWScene.mobileInput.right = true;
                            this.OWScene.mobileInput.up = true;
        
                        }else if(angle > 112.5 && angle < 157.5){
                            this.OWScene.mobileInput.up = true;
                            this.OWScene.mobileInput.left = true;
        
                        }else if(angle > 202.5 && angle < 247.5){
                            this.OWScene.mobileInput.left = true;
                            this.OWScene.mobileInput.down = true;
        
                        }else if(angle > 292.5 && angle < 337.5){
                            this.OWScene.mobileInput.down = true;
                            this.OWScene.mobileInput.right = true;
                        }
                    }else{//indisde rest zone
                        this.joystickHandle.x = this.joystick.x;
                        this.joystickHandle.y = this.joystick.y;
                    }
                }
            }
        }

    }

    resize(w, h){
        this.width = w;
        this.height = h;
        if(!this.sys.game.device.os.desktop){
            this.joystick.x = this.joystickHandle.x  = w*0.15;
            this.joystick.y = this.joystickHandle.y  = h*0.7;
            this.A_Button.x = w*0.85;
            this.A_Button.y = h*0.6;
        }
    }
}