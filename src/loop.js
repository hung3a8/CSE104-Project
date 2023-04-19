import { app } from './main.js';
import { Player, PlayerCursor } from './objects/player.js';
import { Enemy } from './objects/enemy.js';
import { Tree } from './objects/tree.js';
import { OrangeHouse, WoodenHouse } from './objects/house.js';
import * as Demo from './containers/demo.js';
import { InfoContainer } from './containers/info.js';
import { Sprite, Texture } from '../include/pixi.mjs';
import { CONSTANT } from './constant.js';
import { Grass, Dirt } from './objects/bgobj.js';

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
                currentContainer.addChildAtPosition(dummy.sprite, randomrow + i, randomcol + j);
            }
        }
        break;
    }
}


function checkSpawnable(row, col){
    if(row < 0 || row >= bgContainer.rows || col < 0 || col >= bgContainer.cols){return false;}
    if(bgContainer.grids[row][col] !== null){return false;}
    let spi = currentContainer.grids[row][col];
    if(spi === null || spi instanceof Enemy || spi instanceof Player){return true;}
    return false;
}

function spawnBg(sprite, beginRow, beginCol, spawnRate){
    if(!checkSpawnable(beginRow, beginCol)){return 0;}
    let dx = [0, 1, 0, -1];
    let dy = [-1, 0, 1, 0];
    let stack = [];
    stack.push({row: beginRow, col: beginCol});
    while(stack.length > 0){
        let pos = stack.pop();
        let dummy = new sprite(bgContainer);
        bgContainer.addChildAtPosition(dummy.sprite, pos.row, pos.col);
        console.log(pos.row, pos.col);
        for(let i=0;i<4;i++){
            let newrow = pos.row + dx[i];
            let newcol = pos.col + dy[i];
            if(checkSpawnable(newrow, newcol)){
                let chance = Math.random();
                console.log(chance);
                if(chance > spawnRate){continue;}
                stack.push({row: newrow, col: newcol});
            }
        }
    }
}
for(let i=0;i<2;i++){
    spawnBg(Grass, getRandomInt(bgContainer.rows), getRandomInt(bgContainer.cols), 0.4);
    spawnBg(Dirt, getRandomInt(bgContainer.rows), getRandomInt(bgContainer.cols), 0.4);
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

    bgContainer.position.x = -cursor.x + app.screen.width / 2;
    bgContainer.position.y = -cursor.y + app.screen.height / 2;

    bgContainer.update();
}
