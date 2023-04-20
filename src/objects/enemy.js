import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";

function getRandomInt(max) {return Math.floor(Math.random() * max);}

let enemyStat = [
                    {name: 'Wiliam', hp: 100, atk: 10, def: 3},
                    {name: 'cd', hp: 100, atk: 10, def: 3},
                    {name: 'ef', hp: 100, atk: 10, def: 3},
                    {name: 'gh', hp: 100, atk: 10, def: 3},
                    {name: 'ij', hp: 100, atk: 10, def: 3},
                    {name: 'kl', hp: 100, atk: 10, def: 3},
                    {name: 'mn', hp: 100, atk: 10, def: 3},
                    {name: 'op', hp: 100, atk: 10, def: 3},
                    {name: 'qr', hp: 100, atk: 10, def: 3},
                    {name: 'st', hp: 100, atk: 10, def: 3},
                    {name: 'uv', hp: 100, atk: 10, def: 3},
                    {name: 'wx', hp: 100, atk: 10, def: 3},
                    {name: 'yz', hp: 100, atk: 10, def: 3},
                    {name: 'ac', hp: 100, atk: 10, def: 3},
                    {name: 'ad', hp: 100, atk: 10, def: 3},
                    {name: 'af', hp: 100, atk: 10, def: 3},
                ];

export class Enemy extends CollisionSprite {
    constructor(container) {
        super(container);
        this.container = container;
        this.level = 0;
        this.description = "This is an enemy. Scary!";

        let x = getRandomInt(16);
        this.sprite.texture = spritesheet.textures["enemy_" + x];

        this.hp = 10;
        this.max_hp = 10;
        this.attack = 5;
        this.defense = 1;
        this.turn = 0;
    }

    checkForBattle() {
        // Detect if player is in the column next to the enemy
        if (this.container.player.col == this.col) {
            if (this.container.player.row == this.row - 1 || this.container.player.row == this.row + 1) {
                this.triggerBattle();
                console.log("Time to dududududududuel!")
                return true;
            }
        }

        // Detect if player is in the row next to the enemy
        if (this.container.player.row == this.row) {
            if (this.container.player.col == this.col - 1 || this.container.player.col == this.col + 1) {
                this.triggerBattle();
                console.log("Time to dududududududuel!")
                return true;
            }
        }
    }

    playTurn() {
        let check = this.checkForBattle();
        if (!check) {
            this.move();
            this.checkForBattle();
        }
    }

    move() {
        // console.log(this);
        const path = this.minDistance();
    }

    minDistance() {
        let source = {
            row: this.row,
            col: this.col,
        };

        let cost = Array.from(Array(this.container.rows), () => Array(this.container.cols).fill(0));

        const q = [];
        let found = false;
        q.push(source);
        const move_row = [-1, 0, 0, 1];
        const move_col = [0, -1, 1, 0];

        while (q.length > 0) {
            let cell = q.pop();

            let i = cell.row;
            let j = cell.col;

            // if destination is found, we are done
            if (this.container.grids[i][j] == this.container.player) {
                found = true;
                break;
            }

            // go in all 4 directions
            for (let k = 0; k < 4; k++) {
                const x = i + move_row[k];
                const y = j + move_col[k];

                if ((this.can_move(x, y) || this.container.grids[x][y] == this.container.player) && cost[x][y] == 0) {
                    q.push({row: x, col: y});
                    cost[x][y] = cost[i][j] + 1;
                }
            }
        }

        if (!found) {
            return -1;
        }

        // trace back the path
        let min = 100000;
        let min_row = -1;
        let min_col = -1;

        const path = [[this.container.player.row, this.container.player.col]];
        const visited = Array.from(Array(this.container.rows), () => Array(this.container.cols).fill(false));

        let n = 10;

        while (n--) {
            let i = path[path.length - 1][0];
            let j = path[path.length - 1][1];

            min = 100000;
            min_row = -1;
            min_col = -1;

            if (i == source.row && j == source.col) {
                break;
            }

            for (let k = 0; k < 4; k++) {
                const x = i + move_row[k];
                const y = j + move_col[k];

                if ((this.can_move(x, y) && cost[x][y] < min && cost[x][y] !== 0 && visited[x][y] == false) || (x == source.row && y == source.col)) {
                    min = cost[x][y];
                    min_row = x;
                    min_col = y;
                    // console.log(x, y);
                }
            }
            path.push([min_row, min_col]);
        }

        return path.reverse();
    }

    left_move() {
        if (this.object.x > 0) {
            this.object.x -= 64;
        }
    }

    right_move() {
        if (this.object.x < this.object.container.width - CONSTANT.GRID_SIZE) {
            this.object.x += 64;
        }
    }

    up_move() {
        if (this.object.y > 0) {
            this.object.y -= 64;
        }
    }

    down_move() {
        if (this.object.y < this.object.container.height - CONSTANT.GRID_SIZE) {
            this.object.y += 64;
        }
    }

    getDiscirption(){
        return {level: this.level, hp: this.hp, max_hp: this.max_hp, attack: this.attack, defense: this.defense};
    }
}
