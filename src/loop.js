import { app } from './main.js';
import { Player, PlayerCursor } from './objects/player.js';
import { Enemy } from './objects/enemy.js';
import { Tree } from './objects/tree.js';
import { OrangeHouse, WoodenHouse } from './objects/house.js';
import * as Demo from './containers/demo.js';
import { InfoContainer } from './containers/info.js';
import { IntroContainer } from './containers/intro.js';
import { Sprite, Texture } from '../include/pixi.mjs';
import { CONSTANT } from './constant.js';
import { Grass, Dirt } from './objects/bgobj.js';
import { ItemSprite, Helmet, Armor, Knife, Broadsword, Roundshield, Ring} from './objects/item.js';
import { GameContainer } from './containers/base.js';

let gameContainer = Demo.container;
let bgContainer = Demo.bgcontainer;
let introContainer = new IntroContainer({ x: 0, y: 0, width: CONSTANT.CANVAS_WIDTH, height: CONSTANT.CANVAS_HEIGHT, gameContainer: gameContainer });
let currentContainer = introContainer;
const player = new Player(gameContainer);
let infoContainer = new InfoContainer({
    x: 0,
    y: CONSTANT.GAME_HEIGHT,
    width: CONSTANT.INFO_WIDTH,
    height: CONSTANT.INFO_HEIGHT,
    player: player,
});

gameContainer.setPlayer(player, 1, 1);
const cursor = new PlayerCursor(gameContainer, player);
gameContainer.addChild(cursor.sprite);
player.setCursor(cursor);

function getRandomInt(max) {return Math.floor(Math.random() * max);}

function spawnEntity(total, Entity){
    for(let _=0;_<total;_++){   // try to spawn "total" Entity
        let entity = new Entity(gameContainer);
        let randomrow = getRandomInt(gameContainer.rows);
        let randomcol = getRandomInt(gameContainer.cols);
        if(gameContainer.grids[randomrow][randomcol] === null){
            gameContainer.addChildAtPosition(entity.sprite, randomrow, randomcol);
        }
    }
}

function spawnHouse(House){
    for(let _=0;_<10;_++){  // try to spawn orange house
        let randomrow = getRandomInt(gameContainer.rows - 1);
        let randomcol = getRandomInt(gameContainer.cols - 2);
        let block = false;
        for(let i=0;i<2;i++){
            for(let j=0;j<3;j++){
                if(gameContainer.grids[randomrow+i][randomcol+j] !== null){
                    block = true;
                }
            }
        }
        if(!block){
            for(let i=0;i<2;i++){
                for(let j=0;j<3;j++){
                    let dummy = new House(gameContainer, i*3+j);
                    gameContainer.addChildAtPosition(dummy.sprite, randomrow+i, randomcol+j);
                }
            }
            break;
        }
    }
}

function checkSpawnable(row, col){
    if(row < 0 || row >= bgContainer.rows || col < 0 || col >= bgContainer.cols){return false;}
    if(bgContainer.grids[row][col] !== null){return false;}
    let spi = gameContainer.grids[row][col];
    if(spi === null || spi instanceof Enemy || spi instanceof Player || spi instanceof ItemSprite){return true;}
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
                stack.push({row: newrow, col: newcol});
            }
        }
    }
}

function spawnItem(total, Item){
    for(let _=0;_<total;_++){   // try to spawn "total" Item
        let item = new Item(currentContainer);
        let randomrow = getRandomInt(currentContainer.rows);
        let randomcol = getRandomInt(currentContainer.cols);
        if(currentContainer.grids[randomrow][randomcol] === null){
            currentContainer.addChildAtPosition(item.sprite, randomrow, randomcol);
        }
    }
}
window.container = currentContainer;

export function setup() {
    app.stage.addChild(bgContainer);
    app.stage.addChild(currentContainer);
    app.stage.addChild(infoContainer);
}

function countEnemy(){
    let count = 0;
    for(let i=0;i<currentContainer.rows;i++){
        for(let j=0;j<currentContainer.cols;j++){
            if(currentContainer.grids[i][j] instanceof Enemy){
                count++;
            }
        }
    }
    return count;
}

function clearGrid(){   
    // clear all grids except player and cursor of currentContainer
    for(let i=0;i<currentContainer.rows;i++){
        for(let j=0;j<currentContainer.cols;j++){
            if(currentContainer.grids[i][j] === null){continue;}
            if(currentContainer.grids[i][j] instanceof Player){continue;}
            if(currentContainer.grids[i][j] instanceof PlayerCursor){continue;}
            currentContainer.removeChildAtPosition(i, j);
        }
    }
    // clear all grass of bgContainer
    for(let i=0;i<bgContainer.rows;i++){
        for(let j=0;j<bgContainer.cols;j++){
            if(bgContainer.grids[i][j] === null){continue;}
            if(bgContainer.grids[i][j] instanceof Grass){
                bgContainer.removeChildAtPosition(i, j);
            }
        }
    }
}
let firstLevel = true;
export function gameLoop(delta) {
    if(countEnemy() === 0){
        clearGrid();
        if(firstLevel){firstLevel = false;}else{player.evolve();}
        for(let i=0;i<currentContainer.rows;i++){
            let tree = new Tree(currentContainer);
            currentContainer.addChildAtPosition(tree.sprite, i, 0);
            tree = new Tree(currentContainer);
            currentContainer.addChildAtPosition(tree.sprite, i, bgContainer.cols-1);
        }
        for(let i=0;i<currentContainer.cols;i++){
            let tree = new Tree(currentContainer);
            currentContainer.addChildAtPosition(tree.sprite, 0, i);
            tree = new Tree(currentContainer);
            currentContainer.addChildAtPosition(tree.sprite, bgContainer.rows-1, i);
        }
        spawnEntity(Math.floor(currentContainer.rows * currentContainer.cols / 5), Tree);
        spawnEntity(5, Enemy);
        spawnItem(3, Helmet);
        spawnItem(3, Armor);
        spawnItem(3, Knife);
        spawnItem(3, Broadsword);
        spawnItem(3, Roundshield);
        spawnItem(3, Ring);
        spawnHouse(OrangeHouse);
        spawnHouse(WoodenHouse);
        for(let i=0;i<8;i++){
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
    }
    currentContainer.position.x = -cursor.x + app.screen.width / 2;
    currentContainer.position.y = -cursor.y + app.screen.height / 2;

    currentContainer.update();
    infoContainer.update();

    bgContainer.position.x = currentContainer.position.x;
    bgContainer.position.y = currentContainer.position.y;
}
