// export default class movingObject extends Phaser.GameObjects.Sprite{
//     //still a wip
//     constructor(scene,x,y){
//         super(scene, x,y,'playerTemp');
//         this.scene = scene;
//         this.scene.physics.world.enable(this);
//         this.scene.add.existing(this);
//         this.body.setImmovable(true);
//         this.anims.create({
//             key: 'playerRight',
//             frames: this.anims.generateFrameNumbers('playerTemp', {start: 0, end: 5}),
//             frameRate: 12,
//             repeat: -1,
//         });
//         this.anims.play('playerRight');
//     }

//     create(){
//         console.log('here');
//     }

// }
