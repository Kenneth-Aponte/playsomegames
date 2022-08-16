export default class GameScene_SS extends Phaser.Scene {
    constructor(){
        super('GameScene_SS');
    }
    
    create(){
        //player
        this.player;
        this.playerBullets;
        this.playerLives = 3;
        this.livesImage;
        this.playerDead = false;
        this.fireTime = this.MAXFIRERATE = 8, this.bulletsShot = 0, this.bulletsMissed = 0;
        this.accuracy = 0;
        //explosions
        this.explosions;
        //stars
        this.stars;
        this.starColors = ['ebc634','34d3eb','eb34d9','34eb46', 'ffffff', 'ffffff', 'ffffff']
        //side rocks
        this.sideRocks;
        //enemies
        this.enemies1, this.enemies2, this.enemies3;
        this.e2Bullets;
        //input keys
        this.keyW, this.keyA, this.keyS, this.keyD, this.cursors, this.keySpace, this.keyEnter, this.keyC;
        //text
        this.FPS, this.scoreText, this.roundText, this.middleScreenText, this.playerLivesText, this.gameOverBottomText, this.accuracyText, this.showControlsText, this.controlsText;
        //score et. al.
        this.score = 0, this.round = 1;
        this.enemies1Spawned = 0, this.enemies1Left = 0, this.maxE1 = 3, this.e1Killed = 0;
        this.enemies2Spawned = 0, this.enemies2Left = 0, this.maxE2 = 4, this.e2Killed = 0;
        this.enemies3Spawned = 0, this.enemies3Left = 0, this.maxE3 = 5, this.e3Killed = 0;
        //sounds
        this.introSong, this.fire1, this.fire2, this.expSound1, this.expSound2, this.expSound3, this.respawnSound, this.enemyMoveSound, this.enemyMoveSound2, this.newRoundSound, this.gameOverSound;
        //other flags
        this.gameStarted = false, this.gameOver = false, this.nextRoundCalled = false, this.countDown = 5;
        this.flashInt, this.countDownInt;//intervals
    
        this.controlsMenuString = ('-').repeat(49) + '\nCONTROLS:\n\n-MOVE: *ARROW-KEYS* OR *WASD-KEYS* \n-SHOOT: *SPACE*\n-HIDE THIS MENU: *C*\n' + ('-').repeat(49);
        


        this.resize(1280,720);

        this.physics.world.setBounds(80,200,1120,520);
    
        //space (aka moving stars)
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 30,
        });
        
        this.stars.children.iterate((star) => {
            let size = Phaser.Math.Between(1,2);
            star.setScale(size, size);
            star.setX(Phaser.Math.Between(140,1000));//aslso changed in the update method
            star.setY(Phaser.Math.Between(0,720));
            star.setTint(parseInt('0x' + this.starColors[Phaser.Math.Between(0,6)]));
            star.setVelocityY(Phaser.Math.Between(100,500));//also changed in the update method
        });
    
        //side rocks
        this.sideRocks = this.physics.add.group();
        
        this.sideRocks.create(-40,512,'sideRock').setScale(4).setAngle(180);
        this.sideRocks.create(-40,-512,'sideRock').setScale(4).setAngle(180);
        this.sideRocks.create(1320,512,'sideRock').setScale(4);
        this.sideRocks.create(1320,-512,'sideRock').setScale(4);
        
        this.sideRocks.setTint('0x6d6145');
        
        
        //player
        this.player = this.physics.add.sprite(600,500,'shipST').setScale(5).setOrigin(0,0);
        this.player.setSize(16,15);
        this.player.body.setOffset(0,0);
    
        //small thrust
        this.anims.create({
            key: 'leftST',
            frames: [{key: 'shipST',frame: 0}],
        });
        this.anims.create({
            key: 'centerST',
            frames: [{key: 'shipST',frame: 1}],
        });
        this.anims.create({
            key: 'rightST',
            frames: [{key: 'shipST',frame: 2}],
        });
    
        //big thrust
        this.anims.create({
            key: 'leftBT',
            frames: [{key: 'shipBT',frame: 0}],
        });
        this.anims.create({
            key: 'centerBT',
            frames: [{key: 'shipBT',frame: 1}],
        });
        this.anims.create({
            key: 'rightBT',
            frames: [{key: 'shipBT',frame: 2}],
        });
    
        //no thrust
        this.anims.create({
            key: 'leftNT',
            frames: [{key: 'shipNT',frame: 0}],
        });
        this.anims.create({
            key: 'centerNT',
            frames: [{key: 'shipNT',frame: 1}],
        });
        this.anims.create({
            key: 'rightNT',
            frames: [{key: 'shipNT',frame: 2}],
        });
    
        //starts centered
        this.player.anims.play('centerST');
    
        //player bullets
        this.playerBullets = this.physics.add.group();//created in runtime
    
        this.explosions = this.physics.add.group();
    
        //dead animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosionPlayer', {start: 0, end: 4}),
            frameRate: 5,
            repeat: 0,
        });
    
    
        //enemies1 
        this.enemies1 = this.physics.add.group();
    
        this.anims.create({
            key: 'move1',
            frames: this.anims.generateFrameNumbers('enemies1',{start: 0, end: 4}),
            frameRate: 7,
            repeat: -1
        });
    
        //enemies2
        this.enemies2 = this.physics.add.group();
    
        this.anims.create({
            key: 'move2',
            frames: this.anims.generateFrameNumbers('enemies2', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        })
    
        //enemy2 bullets
        this.e2Bullets = this.physics.add.group();//then again, created in runtime
        
        //enemies3
        this.enemies3 = this.physics.add.group();
    
        //colliders
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.playerBullets, this.enemies1, this.enemy1Hit, null, this);
        this.physics.add.collider(this.playerBullets, this.enemies2, this.enemy2Hit, null, this);
        this.physics.add.collider(this.playerBullets, this.enemies3, this.enemy3Hit, null, this);
        this.physics.add.collider(this.player, this.enemies1, this.playerHit, null, this);
        this.physics.add.collider(this.player, this.enemies2, this.playerHit, null, this);
        this.physics.add.collider(this.player, this.e2Bullets, this.playerHit, null, this);
        this.physics.add.collider(this.player, this.enemies3, this.playerHit, null,this);
    
        //inputs 
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
        //text
        this.FPS = this.add.text(1220, 16, '0', { fontFamily: 'serious1', fontSize: '32px', fill: '#ffffff' }).setResolution(5);
        this.scoreText = this.add.text(20,16,'', { fontFamily: 'serious1', fontSize: '32px', fill: '#ffffff'}).setResolution(5);
        this.roundText = this.add.text(20,48,'', { fontFamily: 'serious1', fontSize: '32px', fill: '#ffffff'}).setResolution(5);
        this.accuracyText = this.add.text(20,48,'', { fontFamily: 'serious1', fontSize: '64px', fill: '#ffffff'}).setOrigin(0.5,0).setResolution(5);
        this.accuracyText.visible = false;
        this.playerLivesText = this.add.text(50,650,'', { fontFamily: 'serious1', fontSize: '30px', fill: '#ffffff'}).setOrigin(0,0.5).setResolution(5);
        this.middleScreenText = this.add.text(640,240,'', { fontFamily: 'serious1', fontSize: '64px', color: '#77cc2a'}).setOrigin(0.5,0).setResolution(5);
        this.middleScreenText.setShadow(16, 16, '#008050');
        this.gameOverBottomText = this.add.text(0,0,'', { fontFamily: 'serious1', fontSize: '28px', color: '#77cc2a'}).setOrigin(0.5,0).setResolution(5);
        this.showControlsText = this.add.text(1260,680,'PRESS *C* TO SHOW CONTROLS', { fontFamily: 'serious1', fontSize: '16px', color: '#ffffff'}).setOrigin(1,0).setResolution(9);
        this.controlsText = this.add.text(760,500,this.controlsMenuString, { fontFamily: 'serious1', fontSize: '24px', color: '#ffffff'}).setResolution(10);
        this.controlsText.visible = false;
    
        //GUI
        this.livesImage = this.add.image(100,650,'shipGUI').setScale(5);
        this.livesImage.visible = false;
    
        //audio
        this.fire1 = this.sound.add('fire1');
        this.fire2 = this.sound.add('fire2');
        this.fire2.volume = 0.5;
        this.introSong = this.sound.add('introSS')
        this.expSound1 = this.sound.add('explosion1');
        this.expSound2 = this.sound.add('explosion2');
        this.expSound2.volume = 0.5;
        this.expSound3 = this.sound.add('explosion3');
        this.respawnSound = this.sound.add('respawn');
        this.enemyMoveSound = this.sound.add('moveSound');
        this.enemyMoveSound2 = this.sound.add('moveSound2');
        this.newRoundSound = this.sound.add('newRound');
        this.gameOverSound = this.sound.add('gameOver');
    }
    

    update(){
        if(this.gameStarted && !this.playerDead){
            //movement vertical
            if((this.keyW.isDown || this.cursors.up.isDown) && !this.keyA.isDown && !this.cursors.left.isDown && !this.keyD.isDown && !this.cursors.right.isDown){
                this.player.anims.play('centerBT', true);
                this.player.setVelocityY(-500);
            }
            else if((this.keyS.isDown || this.cursors.down.isDown) && !this.keyA.isDown && !this.cursors.left.isDown && !this.keyD.isDown && !this.cursors.right.isDown){
                this.player.anims.play('centerNT', true);
                this.player.setVelocityY(500);
            }
            else{
                this.player.anims.play('centerST', true);
                this.player.setVelocityY(0);
            }

            //movement horizontal
            if(this.keyA.isDown || this.cursors.left.isDown){
                if(this.keyW.isDown || this.cursors.up.isDown){
                    this.player.anims.play('leftBT', true);
                    this.player.setVelocity(-353,-353);
                }
                else if(this.keyS.isDown || this.cursors.down.isDown){
                    this.player.anims.play('leftNT', true);
                    this.player.setVelocity(-353,353);
                }else{
                    this.player.anims.play('leftST', true);
                    this.player.setVelocityX(-500);
                }
            }
            else if(this.keyD.isDown || this.cursors.right.isDown){
                if(this.keyW.isDown || this.cursors.up.isDown){
                    this.player.anims.play('rightBT', true);
                    this.player.setVelocity(353,-353);
                }
                else if(this.keyS.isDown || this.cursors.down.isDown){
                    this.player.anims.play('rightNT', true);
                    this.player.setVelocity(353,353);
                }else{
                    this.player.anims.play('rightST', true);
                    this.player.setVelocityX(500);
                }
            }
            else{
                this.player.setVelocityX(0);
            }

            //shooting
            if(this.fireTime > 0){
                this.fireTime--;
            }
            else if(this.keySpace.isDown && !this.nextRoundCalled){
                this.fire1.play();
                this.fireTime = this.MAXFIRERATE;
                this.playerBullets.create(this.player.x+40, this.player.y, 'pBullet').setVelocityY(-1000).setScale(3);
                this.bulletsShot++;
            } 
            this.playerBullets.children.each((pB) => {
                //out of screeen
                if(pB.y < 0){
                    pB.destroy();
                    //remove points
                    if(this.score >= 5){
                        this.score -=5;
                        this.scoreText.setText('SCORE: ' + this.score.toString());
                    }
                    this.bulletsMissed++;
                }
            });

            //accuracy 
            if(this.bulletsShot > 0){//obvious reasons
                this.accuracy = (this.bulletsShot - this.bulletsMissed)/this.bulletsShot * 100;
            }

            //enemy1 movement 
            this.enemies1.children.each((e1) =>{
                if(e1.y >= 720){
                    e1.y = 0;
                    e1.x = (Phaser.Math.Between(0,1280));
                }
                
                if(this.player.y - e1.y > 200){
                    const _vel = 500;
                    const _angle = Math.atan((this.player.y - e1.y)/((this.player.x + this.player.body.width/2) - e1.x));
                    e1.rotation = ((this.player.x + this.player.body.width/2) > e1.x) ? -Math.PI/2 + _angle: Math.PI/2 + _angle;
        
                    if((this.player.x + this.player.body.width/2) > e1.x){
                        e1.setVelocityX(Math.cos(_angle)*_vel);
                        e1.setVelocityY(Math.sin(_angle)*_vel);
                    }
                    else {
                        e1.setVelocityX(Math.cos(Math.PI-_angle)*_vel);
                        e1.setVelocityY(Math.sin(-_angle)*_vel);
                    }
                }
            });

            //enemy2 movement and shooting
            this.enemies2.children.each((e2) => {
                if(e2.y >= 720){
                    e2.y = -300;
                    e2.setVelocityY(200);
                }
                if((e2.y >= 150) && e2.body.velocity.y != 300){
                    e2.y = 150;
                    e2.setVelocityY(0);
                    //randomly move out of the screen
                    if(Phaser.Math.Between(0,500) == 1){
                            e2.setVelocityY(300);
                            this.enemyMoveSound.play();                        
                    }
                }

                //randomly shoot
                if(e2.y >= 0 && Phaser.Math.Between(0,200) == 1){
                    //shoot
                    this.e2Bullets.create(e2.x, e2.y,'e2Bullet').setVelocityY(800).setScale(3);
                    this.fire2.play();
                }

            });

            this.e2Bullets.children.each((e2B) => {
                if(e2B.y >= 720){
                    e2B.destroy();
                }
            });

            //enemy3 movement
            this.enemies3.children.each((e3) => {
                if(e3.y >= 720){
                    e3.y = -400;
                    e3.setVelocityY(200);
                }
                if((e3.y >= 100) && e3.body.velocity.y != 500){
                    e3.y = 100;
                    e3.setVelocityY(0);
                    //randomly move out of the screen
                    if(Phaser.Math.Between(0,400) == 1){
                        e3.setVelocityY(500);
                        this.enemyMoveSound2.play();
                    }
                }
            });

            //explosions
            this.explosions.children.each((exp) => {
                if(exp.anims.currentFrame.index == 5){
                    exp.destroy();
                } 
            });

            //new round check
            if(!this.nextRoundCalled && (this.enemies1Spawned == 0 && this.enemies1Left == 0)  && (this.enemies2Spawned == 0 && this.enemies2Left == 0) && (this.enemies3Spawned == 0 && this.enemies3Left == 0)){
                this.countDown = 3;
                this.middleScreenText.style.color = '#77cc2a';
                this.middleScreenText.style.shadowColor = '#008050';
                this.middleScreenText.visible = true;
                this.middleScreenText.setText('NEXT ROUND IN ' + this.countDown.toString())
                this.newRound(this.e1Killed*2,this.e2Killed*2,this.e3Killed*2);
                this.nextRoundCalled = true;
            }

            //turn volume down on intro song since game started
            if(this.introSong.volume > 0){
                this.introSong.volume -= 0.01;
            }

        }else if(!this.playerDead){
            if(this.middleScreenText.text == ''){
                this.middleScreenText.setText('PRESS ENTER TO START!');
                this.flashInt = setInterval(() => {
                    this.middleScreenText.visible = !this.middleScreenText.visible;
                }, 500);
            }
            if(this.keyEnter.isDown && !this.nextRoundCalled){
                //initial function calls
                this.introSong.play();
                this.gameStart_Spawn();
                clearInterval(this.flashInt);
                this.middleScreenText.visible = true;//the flash could ended with it invisible
                this.middleScreenText.setText(this.countDown);
                this.scoreText.setText("SCORE: 0");
                this.roundText.setText("ROUND: 1");
                this.playerLivesText.setText(this.playerLives);
                this.livesImage.visible = true;
                this.nextRoundCalled = true;
                this.controlsText.visible = false;
                this.showControlsText.visible = false;  
            }
            //show/hide menu
            if(Phaser.Input.Keyboard.JustDown(this.keyC) && !this.nextRoundCalled){
                this.showControlsText.visible = !this.showControlsText.visible;
                this.controlsText.visible = !this.controlsText.visible;
            }
        }
        else if(this.gameOver){
            if(this.keyEnter.isDown){
                this.gameOverSound.stop();
                this.scene.run('ArcadeScene');
                this.scene.start('UIScene');
            }
        }
        
        //moving sensation
        //change star X and reset Y to make a moving space
        this.stars.children.iterate((star) => {
            if(star.y > 720 ){
                star.y = -1;
                star.x = Phaser.Math.Between(140,1000);
                star.setVelocityY(Phaser.Math.Between(100,500));
            }
        });

        //moving sides --> resets their y pos back to -512 to maintain a flawless loop 
        this.sideRocks.children.iterate((sideRock) => {
            sideRock.y += 16;
            if(sideRock.y >= 1232){
                sideRock.y = -512;//should be -816, though i am allowing some overlap just in case
            }
        });

        //update current fps 
        this.FPS.setText(Phaser.Math.RoundTo(this.game.loop.actualFps,0));

    }

    //other functions
    gameStart_Spawn(){
        this.countDownInt = setInterval(() => {    
            this.countDown--;
            this.middleScreenText.setText(this.countDown);
        }, 1000);

        setTimeout(() => {
            this.spawnEnemy('enemies1',0,-1000,0,400,3,0);
            this.spawnEnemy('enemies1',641,-1000,0,400,3,0);
            this.spawnEnemy('enemies1',1280,-1000,0,400,3,0);

            this.spawnEnemy('enemies2',256, -1000,0,200,3,0);
            this.spawnEnemy('enemies2',512, -1000,0,200,3,0);
            this.spawnEnemy('enemies2',768, -1000,0,200,3,0);
            this.spawnEnemy('enemies2',1024, -1000,0,200,3,0);

            this.spawnEnemy('enemies3', 128, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 384, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 640, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 892, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 1152, -1100, 0, 200, 3, 0);

            this.enemies1Spawned = 3;
            this.enemies2Spawned = 4;
            this.enemies3Spawned = 5;
            this.enemies1Left = 0;
            this.enemies2Left = 0;
            this.enemies3Left = 0;
            this.gameStarted=true;
            this.nextRoundCalled = false;
            this.middleScreenText.visible = false;
            clearInterval(this.countDownInt);
        },5000);
    }


    newRound(e1Count, e2Count, e3Count){
        this.newRoundSound.play();
        this.countDownInt = setInterval(() => {
            this.countDown--;
            this.middleScreenText.style.color = '#77cc2a';
            this.middleScreenText.style.shadowColor = '#008050';
            this.middleScreenText.setText('NEXT ROUND IN ' + this.countDown.toString());
        }, 1000);

        setTimeout(() => {
            this.round++;
            if(this.round%3 == 0){
                this.maxE1 += 1;
            }

            //enemies1
            this.enemies1Left = e1Count;
            for(let i = 0; i < this.maxE1; i++){
                this.spawnEnemy('enemies1',Phaser.Math.Between(0,1280), -Phaser.Math.Between(200,2000), 0, 400, 3, 0);
                this.enemies1Spawned++;
                this.enemies1Left--;
            }

            //enemies2
            this.enemies2Left = e2Count - 4;
            this.enemies2Spawned = 4;
            this.spawnEnemy('enemies2',256, -1000,0,200,3,0);
            this.spawnEnemy('enemies2',512, -1000,0,200,3,0);
            this.spawnEnemy('enemies2',768, -1000,0,200,3,0);
            this.spawnEnemy('enemies2',1024, -1000,0,200,3,0);
            
            //enemies3
            this.enemies3Left = e3Count - 5;
            this.enemies3Spawned = 5;
            this.spawnEnemy('enemies3', 128, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 384, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 640, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 892, -1100, 0, 200, 3, 0);
            this.spawnEnemy('enemies3', 1152, -1100, 0, 200, 3, 0);

            this.nextRoundCalled = false;
            this.middleScreenText.visible = false;
            clearInterval(this.countDownInt);
            this.roundText.setText('ROUND: ' + this.round.toString());
        }, 3000);
    }


    spawnEnemy(key, x, y, velX, velY, scale, rotation){
        if(key == 'enemies1'){
            var newE1 = this.enemies1.create(x,y,key).setScale(scale).setVelocity(velX,velY).setRotation(rotation);
            newE1.anims.play('move1');
            if(this.playerDead){newE1.setVelocity(0,0);}
        }
        else if(key == 'enemies2'){
            var newE2 = this.enemies2.create(x,y,key).setScale(scale).setVelocity(velX,velY).setRotation(rotation);
            newE2.anims.play('move2');
            newE2.setPushable(false);
            if(this.playerDead){newE2.setVelocity(0,0);}
        }
        else if(key == 'enemies3'){
            var newE3 = this.enemies3.create(x,y,key).setScale(scale).setVelocity(velX,velY).setRotation(rotation);
            newE3.setPushable(false);
            if(this.playerDead){newE3.setVelocity(0,0);}
        }
    }


    enemy1Hit(pB, e1){
        //new explosion --> animation
        var exp = this.explosions.create(e1.x, e1.y, 'explosionPlayer').setScale(3);
        exp.anims.play('explode', true);
        this.expSound1.play();
        //destroy both entities that collided
        pB.destroy();
        e1.destroy();
        //score and respawn other enemies if left to spawn in curr round 
        this.score+=100;
        this.scoreText.setText('SCORE: ' + this.score.toString());
        this.enemies1Spawned--;
        this.e1Killed++;
        if(this.enemies1Left > 0){
            this.spawnEnemy('enemies1',Phaser.Math.Between(0,1280), -1000, 0, 400, 3, 0);
            this.enemies1Spawned++;
            this.enemies1Left--;
        }
    }

    enemy2Hit(pB, e2){
        //new explosion --> animation
        const newX = e2.x;
        var exp = this.explosions.create(e2.x, e2.y, 'explosionPlayer').setScale(3);
        exp.anims.play('explode', true); 
        this.expSound3.play();
        //destroy both entities that collided
        pB.destroy();
        e2.destroy();
        //score and respawn other enemies if left to spawn in curr round 
        this.score+=200;
        this.scoreText.setText('SCORE: ' +this.score.toString());
        this.enemies2Spawned--;
        this.e2Killed++;
        if(this.enemies2Left > 0){
            this.spawnEnemy('enemies2',newX, -1000, 0,200,3,0);
            this.enemies2Spawned++;
            this.enemies2Left--;
        }
    }

    enemy3Hit(pB, e3){
        //new explosion --> animation
        const newX = e3.x;
        var exp = this.explosions.create(e3.x, e3.y, 'explosionPlayer').setScale(3);
        exp.anims.play('explode', true);
        this.expSound3.play();
        //destroy both entities that collided
        pB.destroy();
        e3.destroy();
        //score and respawn other enemies if left to spawn in curr round 
        this.score+=300;
        this.scoreText.setText('SCORE: ' + this.score.toString());
        this.enemies3Spawned--;
        this.e3Killed++;
        if(this.enemies3Left > 0){
            this.spawnEnemy('enemies3',newX, -1100, 0,200,3,0);
            this.enemies3Spawned++;
            this.enemies3Left--;
        }
    }


    playerHit(p,e){
        if(!this.playerDead){//avoid player being hit by 2 at the same time
            this.player.anims.play('explode', true);
            this.expSound2.play();
            this.playerLives--;
            this.playerLivesText.setText(this.playerLives);
            
            this.enemies1.children.iterate((e1) =>{
                e1.y = -Phaser.Math.Between(200,2000);
                e1.x = Phaser.Math.Between(100,1180);
                e1.setVelocity(0, 0);
                e1.rotation = 0;
            });
            
            this.enemies2.children.iterate((e2) => {
                e2.y = -500;
                e2.setVelocityY(0);
            });
        
            this.e2Bullets.children.each((e2B) => {
                e2B.destroy();
            });

            this.enemies3.children.iterate((e3) => {
                e3.y = -600;
                e3.setVelocityY(0);
            })
        
            this.player.setVelocity(0,0);
            this.playerDead = true;
            if(this.playerLives > 0){
                this.middleScreenText.style.color = '#f5e749';
                this.middleScreenText.style.shadowColor = '#f07f16';
                this.middleScreenText.setText('RESPAWNING');
                this.middleScreenText.visible = true;
            }
            setTimeout(() => {
                if(this.playerLives > 0){
                    this.playerDead = false;
                    this.enemies1.children.iterate((e1) => {
                        e1.setVelocityY(500);
                    });
                    this.enemies2.children.iterate((e2) => {
                        e2.setVelocityY(200);
                    })
                    this.enemies3.children.iterate((e3) => {
                        e3.setVelocityY(200);
                    })
                    this.player.x = 600;
                    this.player.y = 500;
                    this.respawnSound.play();
                    this.middleScreenText.visible = false;
                }
                else{//GAME IS OVER
                    this.player.visible = false;
                    this.playerLivesText.visible = false;
                    this.livesImage.visible = false;
                    
                    this.middleScreenText.style.color = '#ff4646';
                    this.middleScreenText.style.shadowColor = '#9e1328';
                    this.middleScreenText.setFontSize(128);
                    this.middleScreenText.setShadowOffset(32,32);
                    this.middleScreenText.y = 150;
                    this.middleScreenText.setText('GAME OVER');
                    this.middleScreenText.visible = true;
                    
                    this.scoreText.setOrigin(0.5, 0);
                    this.scoreText.setFontSize(64);
                    this.roundText.setOrigin(0.5, 0);
                    this.roundText.setFontSize(64);
                    this.scoreText.x = this.middleScreenText.x;
                    this.scoreText.y = this.middleScreenText.y + 180;
                    this.roundText.x = this.middleScreenText.x;
                    this.roundText.y = this.scoreText.y + 80;
                    this.accuracyText.x = this.middleScreenText.x;
                    this.accuracyText.y = this.roundText.y + 80;
                    this.accuracyText.setText('ACCURACY: ' +  Phaser.Math.RoundTo(this.accuracy, -1) + '%');
                    this.accuracyText.visible = true;
        
                    this.gameOverBottomText.setOrigin(0.5,0);
                    this.gameOverBottomText.x = this.middleScreenText.x;
                    this.gameOverBottomText.y = 680;
                    this.gameOverBottomText.setText('PRESS ENTER TO EXIT!');
                    
                    setInterval(() =>{
                        this.gameOverBottomText.visible = !this.gameOverBottomText.visible; 
                    }, 500);
                    
                    this.gameOverSound.play();
                    this.gameOver = true;
                }
            }, 3000);
        }
    }



    resize(w,h){
        this.scale.setGameSize(w,h);
        this.cameras.resize(w,h);
        this.scale.updateScale();
        this.scale.updateBounds();
    }
}