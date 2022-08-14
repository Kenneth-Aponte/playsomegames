import BootScene from "./scenes/BootScene.js";
import ArcadeScene from "./scenes/ArcadeScene.js";
import UIScene from "./scenes/UIScene.js";

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
    input :{
		activePointers: 4,
	  },
    pixelArt: true,
    parent: 'main',
    scene: [BootScene, ArcadeScene, UIScene],//TODO: Have a boot scene and stuff before the actual game
};

new Phaser.Game(config);