import NPC_Person from "../entities/NPC_Person.js";
import Player from "../entities/Player.js";

export default class GameScene_Main extends Phaser.Scene {
    constructor(){
        super('ArcadeScene');
    }

    create(){
        //both of these get merged together later on
        this.userInput = {
            left: false,
            right: false,
            up: false,
            down: false,
            interacts: false,
        }
        this.mobileInput = {
            left: false,
            right: false,
            up: false,
            down: false,
            A_Button: false,
        }

        //other vars
        this.gameNames = ['Space Survival', 'MenuScene_BQ', 'meh'];
        
        //adding the UI scene that runs in parallel with this one
        this.scene.launch('UIScene');
        
        //animations
        this.setUpAnimations();

        //everything related to the map starts here
        this.map = this.make.tilemap({key: 'map'});

        //tilesets
        this.roomTS = this.map.addTilesetImage('Room_Builder', 'RoomBuilder',16,16,1,2);
        this.basementTS = this.map.addTilesetImage('Basement', 'Basement');
        this.genericTS = this.map.addTilesetImage('Generic', 'Generic');
        
        //layers
        this.belowLayer = this.map.createLayer('BelowPlayer', this.roomTS, 0,0);
        this.wallsLayer = this.map.createLayer('walls', this.roomTS,0,0);
        this.gamesLayer = this.map.createLayer('Games', this.basementTS, 0,0);
        this.aboveLayer = this.map.createLayer('AbovePlayer', this.basementTS, 0, 0);
        this.furnitureLayer = this.map.createLayer('Furniture', [this.basementTS, this.genericTS], 0,0);
        this.collisionsLayer = this.map.createLayer('Collisions', this.basementTS, 0, 0);
        
        //changes to layers
        this.aboveLayer.setDepth(10);
        this.collisionsLayer.setCollisionByProperty({collides: true});
        this.collisionsLayer.visible = false;
        
        //OBJECTS
        this.collideObjectsGroup = this.physics.add.group();
        this.collidingObjects = this.map.createFromObjects('objectCollision', {});

        this.collidingObjects.forEach((object) => {
            this.collideObjectsGroup.add(object);
            object.setY(object.y + object.body.height);
            object.body.setImmovable(true);
            object.visible = false;
        });

        this.interactiveObjectsGroup = this.physics.add.group();
        this.interactiveObjects = this.map.createFromObjects('objectInteractive', {});

        this.interactiveObjects.forEach((object) => {
            this.interactiveObjectsGroup.add(object);
            object.setY(object.y + object.body.height);
            object.body.setImmovable(true);
            object.visible = false;
        });

        
        this.entityObjectsGroup = this.physics.add.group();
        this.entityObjects = this.map.createFromObjects('objectEntities', {});//this will just be NPC_Charracter in the future
        
        this.entityObjects.forEach((object) => {
            object.destroy();//destroy it as we are making a new one based on its properties with our custom class
            var newObj = new NPC_Person(this,object.x,object.y)
            this.entityObjectsGroup.add(newObj);
            newObj.body.setImmovable(true);
        });
        
        //player 
        //make a spawn point later
        this.player = new Player(this, 600, 200, 'playerTemp');
        
        //camera
        this.camera = this.cameras.main;
        this.camera.zoom = 5;
        this.camera.startFollow(this.player);
    
        //collisions
        this.physics.add.collider(this.player, this.collisionsLayer);
        this.physics.add.collider(this.player, this.collideObjectsGroup);
        this.physics.add.collider(this.player, this.entityObjectsGroup);
        
        //overlaps
        this.physics.add.overlap(this.player, this.interactiveObjectsGroup, this.playerInteracts, null, this);

        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    
    update(time, delta){
        //set user inputs
        this.userInput = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown || this.cursors.left.isDown || this.mobileInput.left,
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown || this.cursors.right.isDown || this.mobileInput.right,
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown || this.cursors.up.isDown || this.mobileInput.up,
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown || this.cursors.down.isDown || this.mobileInput.down,
            interacts: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) || this.mobileInput.A_Button,
        }

        //upate player
        this.player.update(time, delta, this.userInput);

        //update other entities
        this.entityObjectsGroup.children.each((eO) => {
            eO.update();
        })



        //resizing and scaling
        var expectedW = Math.floor(720*(document.getElementById('main').clientWidth/document.getElementById('main').clientHeight));
        var expectedH = 720;
        if(this.game.canvas.width != expectedW || this.game.canvas.height != expectedH){
            this.resize(expectedW,expectedH);
        }
    }

    resetMobile(){
        this.mobileInput.left = false;
        this.mobileInput.right = false;
        this.mobileInput.up = false;
        this.mobileInput.down = false;
    }

    
    setUpAnimations(){
        //player running
        this.anims.create({
            key: 'playerRight',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 0, end: 5}),
            frameRate: 14,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerBack',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 6, end: 11}),
            frameRate: 14,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerLeft',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 12, end: 17}),
            frameRate: 14,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerFront',
            frames: this.anims.generateFrameNumbers('playerTemp', {start: 18, end: 23}),
            frameRate: 14,
            repeat: -1,
        });
        
        //player idle
        this.anims.create({
            key: 'playerRightIdle',
            frames: this.anims.generateFrameNumbers('playerTempIdle', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerBackIdle',
            frames: this.anims.generateFrameNumbers('playerTempIdle', {start: 6, end: 11}),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerLeftIdle',
            frames: this.anims.generateFrameNumbers('playerTempIdle', {start: 12, end: 17}),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerFrontIdle',
            frames: this.anims.generateFrameNumbers('playerTempIdle', {start: 18, end: 23}),
            frameRate: 10,
            repeat: -1,
        });
    }


    //collide and overlap calls
    playerInteracts(player,object){
        if(this.userInput.interacts){
            if(object.data.list.interaction.startsWith('launch-game')){
                // console.log(object.data.list.interaction.charAt(12));
                this.scene.start(this.gameNames[1]);//temp
                this.scene.stop('UIScene');
            }
            this.userInput.interacts = false
            this.mobileInput.A_Button = false;
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