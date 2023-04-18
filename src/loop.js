import { app } from './main.js';
import { Player, PlayerCursor } from './objects/player.js';
import { Enemy } from './objects/enemy.js';
import { Tree } from './objects/tree.js';
import { OrangeHouse, WoodenHouse } from './objects/house.js';
import * as Demo from './containers/demo.js';
import { InfoContainer } from './containers/info.js';
import { Sprite, Texture } from '../include/pixi.mjs';
import { CONSTANT } from './constant.js';

let bgContainer = Demo.bgcontainer;
let currentContainer = Demo.container;
const player = new Player(currentContainer);
let infoContainer = new InfoContainer({
    x: 0,
    y: CONSTANT.GAME_HEIGHT,
    width: CONSTANT.INFO_WIDTH,
    height: CONSTANT.INFO_HEIGHT,
    player: player,
});

currentContainer.addChildAtPosition(player.sprite, 0, 0);
const cursor = new PlayerCursor(currentContainer, player);
currentContainer.addChild(cursor.sprite);
player.setCursor(cursor);

const dummyenemy = new Enemy(currentContainer);
currentContainer.addChildAtPosition(dummyenemy.sprite, 5, 5);
// console.log(currentContainer.grids);
// console.log(player.can_move(0, 0));

function getRandomInt(max) {return Math.floor(Math.random() * max);}

for(let i=0;i<5;i++){
    let enemy = new Enemy(currentContainer);
    let randomrow = getRandomInt(currentContainer.rows);
    let randomcol = getRandomInt(currentContainer.cols);
    if(currentContainer.grids[randomrow][randomcol] === null){
        currentContainer.addChildAtPosition(enemy.sprite, randomrow, randomcol);
    }
}
for(let i=0;i<10;i++){
    let tree = new Tree(currentContainer);
    let randomrow = getRandomInt(currentContainer.rows);
    let randomcol = getRandomInt(currentContainer.cols);
    // console.log(randomrow, randomcol, currentContainer.grids[randomrow][randomcol]);
    if(currentContainer.grids[randomrow][randomcol] === null){
        currentContainer.addChildAtPosition(tree.sprite, randomrow, randomcol);
    }
}

for(let _=0;_<10;_++){  // try to spawn orange house
    let randomrow = getRandomInt(currentContainer.rows - 1);
    let randomcol = getRandomInt(currentContainer.cols - 2);
    let block = false;
    for(let i=0;i<2;i++){
        for(let j=0;j<3;j++){
            if(currentContainer.grids[randomrow+i][randomcol+j] !== null){
                block = true;
            }
        }
    }
    if(!block){
        for(let i=0;i<2;i++){
            for(let j=0;j<3;j++){
                let dummy = new OrangeHouse(currentContainer, i*3+j);
                // console.log(dummy, randomrow+i, randomcol+j);
                currentContainer.addChildAtPosition(dummy.sprite, randomrow+i, randomcol+j);
            }
        }
        break;
    }
}

for(let _=0;_<10;_++){  // try to spawn wooden house
    let randomrow = getRandomInt(currentContainer.rows - 1);
    let randomcol = getRandomInt(currentContainer.cols - 2);
    let block = false;
    for(let i=0;i<2;i++){
        for(let j=0;j<3;j++){
            if(currentContainer.grids[randomrow+i][randomcol+j] !== null){
                block = true;
            }
        }
    }
    if(!block){
        for(let i=0;i<2;i++){
            for(let j=0;j<3;j++){
                let dummy = new WoodenHouse(currentContainer, i*3+j);
                // console.log(dummy, randomrow+i, randomcol+j);
                currentContainer.addChildAtPosition(dummy.sprite, randomrow + i, randomcol + j);
            }
        }
        break;
    }
}

window.container = currentContainer;

export function setup() {
    app.stage.addChild(bgContainer);
    app.stage.addChild(currentContainer);
    app.stage.addChild(infoContainer);
}

export function gameLoop(delta) {
    currentContainer.position.x = -cursor.x + app.screen.width / 2;
    currentContainer.position.y = -cursor.y + app.screen.height / 2;

    currentContainer.update();
    infoContainer.update();
}
