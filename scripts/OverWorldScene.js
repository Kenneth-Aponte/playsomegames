// import movingObject from "./movingObject.js";

export default class OverWorldScene extends Phaser.Scene {
    constructor(){
        super('OverWorldScene')
    }

    preload(){
        //TODO: have a boot scene for all of this
        this.load.spritesheet('playerTemp', './assets/sprites/Alex_run_16x16.png', {frameWidth: 16, frameHeight: 32});

        this.load.image('RoomBuilder', './assets/tilesets/Room_Builder_16x16-extruded.png');
        this.load.image('Basement', './assets/tilesets/14_Basement_16x16.png');
        this.load.image('Generic', './assets/tilesets/1_Generic_16x16.png');

        this.load.spritesheet('joystick', './assets/images/Joystick1.png', {frameWidth: 20, frameHeight: 20});

        this.load.tilemapTiledJSON('map', './assets/tilemaps/mainTempPSG.tmj');
    }

    create(){
        //vars
        this.keyboardInput;
        this.joystickInput = {
            left: false,
            right: false,
            up: false,
            down: false,
        }

        //adding the UI scene that runs in parallel with this one
        this.scene.launch('UIScene');

        this.map = this.make.tilemap({key: 'map'});

        this.roomTS = this.map.addTilesetImage('Room_Builder', 'RoomBuilder',16,16,1,2);
        this.basementTS = this.map.addTilesetImage('Basement', 'Basement');
        this.genericTS = this.map.addTilesetImage('Generic', 'Generic');
        
        //layers
        this.belowLayer = this.map.createLayer('BelowPlayer', this.roomTS, 0,0);
        this.wallsLayer = this.map.createLayer('walls', this.roomTS,0,0);
        this.gamesLayer = this.map.createLayer('Games', this.basementTS, 0,0);
        this.aboveLayer = this.map.createLayer('AbovePlayer', this.basementTS, 0,0);
        this.furnitureLayer = this.map.createLayer('Furniture', [this.basementTS, this.genericTS], 0,0);
        this.collisionsLayer = this.map.createLayer('Collisions', this.basementTS, 0, 0);
        
        this.collisionsLayer.setCollisionByProperty({collides: true});
        this.collisionsLayer.visible = false;
        this.aboveLayer.setDepth(10);

        // this.testGroup = this.add.group();
        //testing
        // this.objectsGroup = this.map.createFromObjects('objectTest',[{
        //     gid: 9016,
        //     classType: movingObject,
        // },{
        //     id: 11,
        //     classType: movingObject,
        // }]);

        // this.objectLayer = this.map.getLayer('objectTest');
        // this.objectLayer.setCollisionByProperty({collides: true});
        // console.log(this.objectLayer);
        // this.testingLayer.setCollisionByProperty({collides: true});
        //fix the depth later too


        //player
        //make a spawn point later
        this.player = this.physics.add.sprite(600,200, 'playerTemp').setSize(14,6).setOffset(1,26);

        //anims
        this.rightAnim = this.anims.create({
            key: 'playerRight',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 0, end: 5}),
            frameRate: 12,
            repeat: -1,
        });
        this.backAnim = this.anims.create({
            key: 'playerBack',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 6, end: 11}),
            frameRate: 12,
            repeat: -1,
        });
        this.leftAnim = this.anims.create({
            key: 'playerLeft',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 12, end: 17}),
            frameRate: 12,
            repeat: -1,
        });
        this.frontAnim = this.anims.create({
            key: 'playerFront',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 18, end: 23}),
            frameRate: 12,
            repeat: -1,
        });
        
        //camera
        this.camera = this.cameras.main;
        this.camera.zoom = Math.floor(5);
        this.camera.startFollow(this.player);
    

        //collisions
        this.physics.add.collider(this.player,this.collisionsLayer);//this will be just the walls layer later

        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    
    update(time, delta){
        //TODO: add WASD
        this.keyboardInput = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown || this.cursors.left.isDown || this.joystickInput.left,
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown || this.cursors.right.isDown || this.joystickInput.right,
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown || this.cursors.up.isDown || this.joystickInput.up,
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown || this.cursors.down.isDown || this.joystickInput.down,
        }

        const speed = 50;
        const prevVelX = this.player.body.velocity.x;
        const prevVelY = this.player.body.velocity.y;

        this.player.setVelocity(0);

        //horizontal movement
        if(this.keyboardInput.left){
            this.player.setVelocityX(-speed);
        }
        else if(this.keyboardInput.right){
            this.player.setVelocityX(speed);
        }

        //vertical movement
        if(this.keyboardInput.up){
            this.player.setVelocityY(-speed);
        }
        else if(this.keyboardInput.down){
            this.player.setVelocityY(speed);
        }
        
        if (this.keyboardInput.left) {
            this.player.anims.play('playerLeft', true);
        } 
        else if (this.keyboardInput.right) {
            this.player.anims.play('playerRight', true);
        } 
        else if (this.keyboardInput.up) {
            this.player.anims.play('playerBack', true);
        } 
        else if (this.keyboardInput.down) {
            this.player.anims.play('playerFront', true);
        } 
        else {
            this.player.anims.stop();
            //pick an idle frame depending on the direction we were facing since we're not moving now
            if(prevVelX > 0){
                this.player.anims.setCurrentFrame(this.rightAnim.getFrameAt(2));
            }
            else if(prevVelY < 0){
                this.player.anims.setCurrentFrame(this.backAnim.getFrameAt(2))
            }
            else if(prevVelX < 0){
                this.player.anims.setCurrentFrame(this.leftAnim.getFrameAt(2))
            }
            else if(prevVelY > 0){
                this.player.anims.setCurrentFrame(this.frontAnim.getFrameAt(2))
            }
        }

        //normalize to avoid faster speed on diagonal
        this.player.body.velocity.normalize().scale(speed);

        //resizing
        var expectedW = Math.floor(720*(document.getElementById('main').clientWidth/document.getElementById('main').clientHeight));
        var expectedH = 720;
        if(this.game.canvas.width != expectedW || this.game.canvas.height != expectedH){
            this.resize(expectedW,expectedH);
        }
    }

    resetJoystick(){
        this.joystickInput = {
            left: false,
            right: false,
            up: false,
            down: false,
        }
    }

    resize(w,h){
        this.scale.updateScale();
        this.scale.updateBounds();
        this.scale.setGameSize(w,h);
        this.cameras.resize(w,h);
        this.scene.get('UIScene').resize(w, h);//calls the resize method on UIScene

    }

}