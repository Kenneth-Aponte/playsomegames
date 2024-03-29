import MenuScene from "./MenuScene.js";
import GameScene from "./GameScene.js";
import GameOverScene from "./GameOverScene.js";

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale : {
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,//for when i implement fs
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: {y: 200},
            debug: false,
        },
    }, 
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    pixelArt: true,
    parent: 'main',
    scene: [MenuScene, GameScene, GameOverScene],

};

new Phaser.Game(config);

