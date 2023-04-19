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

currentContainer.addChildAtPosition(player.sprite, 1, 1);
const cursor = new PlayerCursor(currentContainer, player);
currentContainer.addChild(cursor.sprite);
player.setCursor(cursor);

let ene = new Enemy(currentContainer);
currentContainer.addChildAtPosition(ene.sprite, 2, 1);

for(let i=0;i<bgContainer.rows;i++){
    let tree = new Tree(bgContainer);
    currentContainer.addChildAtPosition(tree.sprite, i, 0);
    tree = new Tree(bgContainer);
    currentContainer.addChildAtPosition(tree.sprite, i, bgContainer.cols-1);
}
for(let i=0;i<bgContainer.cols;i++){
    let tree = new Tree(bgContainer);
    currentContainer.addChildAtPosition(tree.sprite, 0, i);
    tree = new Tree(bgContainer);
    currentContainer.addChildAtPosition(tree.sprite, bgContainer.rows-1, i);
}

function getRandomInt(max) {return Math.floor(Math.random() * max);}

function spawnEntity(total, Entity){
    for(let _=0;_<total;_++){   // try to spawn "total" Entity
        let entity = new Entity(currentContainer);
        let randomrow = getRandomInt(currentContainer.rows);
        let randomcol = getRandomInt(currentContainer.cols);
        if(currentContainer.grids[randomrow][randomcol] === null){
            currentContainer.addChildAtPosition(entity.sprite, randomrow, randomcol);
        }
    }
}

spawnEntity(10, Enemy);
spawnEntity(10, Tree);

function spawnHouse(House){
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
                    let dummy = new House(currentContainer, i*3+j);
                    currentContainer.addChildAtPosition(dummy.sprite, randomrow+i, randomcol+j);
                }
            }
            break;
        }
    }
}

spawnHouse(OrangeHouse);
spawnHouse(WoodenHouse);

function checkSpawnable(row, col){
    if(row < 0 || row >= bgContainer.rows || col < 0 || col >= bgContainer.cols){return false;}
    if(bgContainer.grids[row][col] !== null){return false;}
    let spi = currentContainer.grids[row][col];
    if(spi === null || spi instanceof Enemy || spi instanceof Player){return true;}
    return false;
}

function spawnBg(sprite, beginRow, beginCol, decayRate=0.85){
    if(!checkSpawnable(beginRow, beginCol)){return 0;}
    let spawnRate = 1;
    let dx = [0, 1, 0, -1, 1, 1, -1, -1];
    let dy = [-1, 0, 1, 0, 1, -1, 1, -1];
    let stack = [];
    stack.push({row: beginRow, col: beginCol});
    while(stack.length > 0){
        let pos = stack.pop();
        let dummy = new sprite(bgContainer);
        bgContainer.addChildAtPosition(dummy.sprite, pos.row, pos.col);
        for(let i=0;i<dx.length;i++){
            let newrow = pos.row + dx[i];
            let newcol = pos.col + dy[i];
            if(checkSpawnable(newrow, newcol)){
                let chance = Math.random();
                if(chance > spawnRate){continue;}
                spawnRate *= decayRate;
                console.log(spawnRate);
                stack.push({row: newrow, col: newcol});
            }
        }
    }
}

for(let i=0;i<2;i++){
    while(true){
        let randomrow = getRandomInt(bgContainer.rows);
        let randomcol = getRandomInt(bgContainer.cols);
        if(checkSpawnable(randomrow, randomcol)){
            spawnBg(Grass, randomrow, randomcol);
            break;
        }
    }
    while(true){
        let randomrow = getRandomInt(bgContainer.rows);
        let randomcol = getRandomInt(bgContainer.cols);
        if(checkSpawnable(randomrow, randomcol)){
            spawnBg(Dirt, randomrow, randomcol);
            break;
        }
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

    bgContainer.position.x = -cursor.x + app.screen.width / 2;
    bgContainer.position.y = -cursor.y + app.screen.height / 2;

    bgContainer.update();
}
