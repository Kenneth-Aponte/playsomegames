import BootScene from "./scenes/BootScene.js";
import ArcadeScene from "./scenes/ArcadeScene.js";
import UIScene from "./scenes/UIScene.js";

import MenuScene_BQ from "./Games/BroomQuest/scripts/MenuScene_BQ.js";
import GameScene_BQ from "./Games/BroomQuest/scripts/GameScene_BQ.js";
import GameOverScene_BQ from "./Games/BroomQuest/scripts/GameOverScene_BQ.js";
import GameScene_SS from "./Games/SpaceSurvival/scripts/GameScene_SS.js";

var config = {
    type: Phaser.AUTO,
    width: Math.floor(720*(document.getElementById('main').clientWidth/document.getElementById('main').clientHeight)),
    height: 720,
    backgroundColor: '#000000',
    scale : {
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        // width: Math.floor(720*(document.getElementById('main').clientWidth/document.getElementById('main').clientHeight)),
        // height: 720,
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
    scene: [BootScene, ArcadeScene, UIScene, GameScene_SS, MenuScene_BQ, GameScene_BQ, GameOverScene_BQ],
};

new Phaser.Game(config);