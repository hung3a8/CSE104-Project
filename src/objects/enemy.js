import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";

function getRandomInt(max) {return Math.floor(Math.random() * max);}

export class Enemy extends CollisionSprite {
    MAX_PLAYER_FIND = 10;
    constructor(container, level) {
        super(container);
        this.level = level;
        this.description = "This is an enemy.";

        let x = getRandomInt(16);
        this.sprite.texture = spritesheet.textures["enemy_" + x];

        this.max_hp = 10 + getRandomInt(this.level) * 3;
        this.hp = this.max_hp;
        this.attack = 5 + getRandomInt(this.level);
        this.defense = 1 + Math.floor(getRandomInt(this.level) / 3);
        this.range = 1 + Math.floor(getRandomInt(this.level) / 4);
        this.turn = 0;
        this.xp = getRandomInt(10) + getRandomInt(this.level) * 2;
        console.log(this.level, this.max_hp, this.attack, this.defense, this.range, this.xp);
    }

    get info() {
        return;
    }

    die() {
        this.outOfBattle();
        this.container.player.add_xp(this.xp);
        super.die();
    }

    triggerBattle() {
        this.battleLock = true;
        this.container.player.battleLock = true;
        this.container.player.addBattle(this);
    }

    outOfBattle() {
        this.battleLock = false;
        this.container.player.battles = this.container.player.battles.filter((e) => e != this);
        if (this.container.player.battles.length == 0) {
            this.container.player.battleLock = false;
        }
    }

    checkForBattle() {
        if (this.checkInRange(this.container.player.row, this.container.player.col)) {
            this.triggerBattle();
            return true;
        }

        return false;
    }

    checkInRange(row, col) {
        if (Math.abs(this.row - row) <= this.range && Math.abs(this.col - col) <= this.range) {
            return true;
        }
        return false;
    }

    interact(player) {
        this.inflictDamage(player.attack);
    }

    playTurn() {
        let check = this.checkForBattle();
        if (!check) {
            this.move();
            if (this.checkForBattle()) {
                this.attackObject(this.container.player);
            }
        } else {
            this.attackObject(this.container.player);
        }
    }

    move() {
        const path = this.minDistance();
        // if (path.length > this.MAX_PLAYER_FIND) {
        //     return;
        // }

        let max_range = this.range;
        // Ignore the last element in the path, which is the player and the first element, which is the enemy itself
        for (let i = 1; i < path.length - 1 && max_range > 0; i++) {
            let to_row = path[i][0];
            let to_col = path[i][1];
            if (this.can_move(to_row, to_col)) {
                this.container.grids[this.row][this.col] = null;
                this.row = to_row;
                this.col = to_col;
                this.sprite.x = this.col * CONSTANT.GRID_SIZE;
                this.sprite.y = this.row * CONSTANT.GRID_SIZE;
                this.container.grids[this.row][this.col] = this;
                max_range--;
            }
        }
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
            let cell = q.shift();

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
                }
            }
            path.push([min_row, min_col]);
        }

        return path.reverse();
    }

    update() {
        super.update();
        this.description = `This is an enemy. [HP: ${this.hp}/${this.max_hp}] [ATK: ${this.attack}] [DEF: ${this.defense}] [RANGE: ${this.range}]`;
        if (this.battleLock) {
            this.border.clear();
            this.border.lineStyle(4, 0xff0000, 0.3);
            this.border.drawRect(-this.range * CONSTANT.GRID_SIZE, -this.range * CONSTANT.GRID_SIZE, CONSTANT.GRID_SIZE * (this.range * 2 + 1), CONSTANT.GRID_SIZE * (this.range * 2 + 1));
        }
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
