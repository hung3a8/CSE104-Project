import { app } from './main.js';
import { Player } from './objects/player.js';
import { Enemy } from './objects/enemy.js';
import { Tree } from './objects/tree.js';
import * as Demo from './containers/demo.js';
import * as Info from './containers/info.js';
import { Sprite, Texture } from '../include/pixi.mjs';


let currentContainer = Demo.container;
let infoContainer = Info.container;
const player = new Player(currentContainer);
const dummy = new Sprite(Texture.WHITE);
const dummy2 = new Sprite(Texture.WHITE);
const dummyenemy = new Enemy(currentContainer);

currentContainer.addChildAtPosition(dummy, 1, 1);
currentContainer.addChildAtPosition(player.sprite, 0, 0);
currentContainer.addChildAtPosition(dummy2, currentContainer.rows-1, currentContainer.cols-1);
currentContainer.addChildAtPosition(dummyenemy.sprite, 5, 5);
console.log(currentContainer.grids);
console.log(player.can_move(0, 0));

function getRandomInt(max) {return Math.floor(Math.random() * max);}

for(let i=0;i<10;i++){
    let tree = new Tree(currentContainer);
    let randomrow = getRandomInt(currentContainer.rows);
    let randomcol = getRandomInt(currentContainer.cols);
    console.log(randomrow, randomcol, currentContainer.grids[randomrow][randomcol]);
    if(currentContainer.grids[randomrow][randomcol] === null){
        currentContainer.addChildAtPosition(tree.sprite, randomrow, randomcol);
    }
}

window.container = currentContainer;

export function setup() {
    app.stage.addChild(currentContainer);
    app.stage.addChild(infoContainer);
}

export function gameLoop(delta) {
    currentContainer.position.x = -player.x + app.screen.width / 2;
    currentContainer.position.y = -player.y + app.screen.height / 2;
}
