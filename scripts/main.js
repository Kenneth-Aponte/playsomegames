import GameScene_Main from "./GameScene_Main.js";
import UIScene from "./UIScene.js";

// screen.orientation.lock('landscape');

var config = {
    type: Phaser.AUTO,
    width: Math.floor(720*(document.getElementById('main').clientWidth/document.getElementById('main').clientHeight)),
    height: 720,
    backgroundColor: '#000000',
    scale : {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Math.floor(720*(document.getElementById('main').clientWidth/document.getElementById('main').clientHeight)),
        height: 720,
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
    scene: [GameScene_Main, UIScene],//TODO: Have a boot scene and stuff before the actual game
};

new Phaser.Game(config);