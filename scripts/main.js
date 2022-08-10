import OverWorldScene from "./OverWorldScene.js";
import UIScene from "./UIScene.js";

// screen.orientation.lock('landscape');

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    scale : {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false,
        },
    }, 
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    pixelArt: true,
    parent: 'main',
    scene: [OverWorldScene, UIScene],//TODO: Have a boot scene and stuff before the actual game
};

new Phaser.Game(config);