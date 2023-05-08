import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { keyboard } from "../utils/keyboard.js";
import { BaseSprite, CollisionSprite} from "./base.js";
import { arrayEquals } from "../utils/arrays.js";

export class Player extends CollisionSprite {
    constructor(container) {
        super(container);

        this.evolutions = [
            spritesheet.textures["player_0"],
            spritesheet.textures["player_1"],
            spritesheet.textures["player_2"],
            spritesheet.textures["player_3"],
            spritesheet.textures["player_4"],
            spritesheet.textures["player_5"],
        ];

        this.sprite.texture = this.evolutions[this.level];
        this.description = "This is you.";
        // Initial stats
        this.hp = 100;
        this.max_hp = 100;
        this.attack = 10;
        this.defense = 2;
        this.range = 2;
        this.turn = 1;

        this.xp_cap = [
            20,
            50,
            100,
            200,
            350,
        ]

        this.statsGain = [
            {hp: 10, attack: 1, defense: 0, range: 0},
            {hp: 15, attack: 1, defense: 0, range: 0},
            {hp: 17, attack: 1, defense: 1, range: 1},
            {hp: 20, attack: 2, defense: 0, range: 0},
            {hp: 25, attack: 2, defense: 0, range: 1},
        ]

        this.xp = 0;

        // Initial items
        this.helmet = "";
        this.armor = "";
        this.weapon = "";
        this.shield = "";
        this.accessory = "";
        this.boot = "";

        this.battles = [];

        this.cursor = null;

        this.action = {
            test_function: keyboard("t", this),
            evolve: keyboard("e", this),
            kms: keyboard("k", this),
        };

        this.action.test_function.press = this.test_function_press;
        this.action.evolve.press = this.evolve_press;
        this.action.kms.press = this.kms_press;
    }

    evolve_press() {
        this.object.evolve();
    }

    add_xp(xp) {
        this.xp += xp;
        if (this.xp >= this.xp_cap[this.level]) {
            console.log("Level up!");
            console.log('old stats', this.max_hp, this.attack, this.defense, this.range);
            const new_stats = this.statsGain[this.level];
            if(this.level === this.xp_cap.length) {return;}
            this.evolve();
            this.max_hp += new_stats.hp;
            this.attack += new_stats.attack;
            this.defense += new_stats.defense;
            this.range += new_stats.range;
            console.log('new stats', this.max_hp, this.attack, this.defense, this.range);
        }
    }

    kms_press() {
        this.object.hp = Math.max(this.object.hp - 10, 0);
    }

    interact(row, col) {
        if (this.checkInRange(row, col)) {
            let obj = this.container.grids[row][col];
            if (obj && obj.interactable) {
                obj.interact(this);
                this.container.nextTurn();
            } else {
                for (let pos of this.getMovablePositions()) {
                    if (pos[0] == row && pos[1] == col) {
                        this.container.grids[this.row][this.col] = null;
                        this.row = row;
                        this.col = col;
                        this.container.grids[this.row][this.col] = this;
                        this.x = this.col * CONSTANT.GRID_SIZE;
                        this.y = this.row * CONSTANT.GRID_SIZE;
                        // console.table(this.container.grids);
                        this.container.nextTurn();
                        break;
                    }
                }

                for (let enemy of this.battles) {
                    if (!enemy.checkInRange(this.row, this.col)) {
                        enemy.outOfBattle();
                    }
                }
            }
        }
    }

    test_function_press() {
        this.object.getMovablePositions(true);
        for (let enemy of this.object.battles) {
            console.log(enemy.checkInRange(1, 4));
        }
    }

    setCursor(cursor) {
        this.cursor = cursor;
    }

    getCursorPosition() {
        if (this.cursor) {
            return this.cursor.getPosition();
        }
        return null, null;
    }

    getEnemyRange() {
        let _res = [];
        const hasKnown = new Map();
        for (let enemy of this.battles) {
            for (let pos of enemy.getRange()) {
                if (!hasKnown[JSON.stringify(pos)]) {
                    hasKnown.set(JSON.stringify(pos), true);
                    _res.push(pos);
                }
            }
        }
        return _res;
    }

    getMovablePositions(log=false) {
        const _res = [];
        for (let i = -1; i >= -this.range; i--) {
            if (this.can_move(this.row + i, this.col)) {
                _res.push([this.row + i, this.col]);
            } else break;
        }
        for (let i = 1; i <= this.range; i++) {
            if (this.can_move(this.row + i, this.col)) {
                _res.push([this.row + i, this.col]);
            } else break;
        }
        for (let i = -1; i >= -this.range; i--) {
            if (this.can_move(this.row, this.col + i)) {
                _res.push([this.row, this.col + i]);
            } else break;
        }
        for (let i = 1; i <= this.range; i++) {
            if (this.can_move(this.row, this.col + i)) {
                _res.push([this.row, this.col + i]);
            } else break;
        }

        const hold = [];

        if (this.battles.length > 0) {
            for (let pos of _res) {
                // if (log) console.log("check", pos);
                let failed = true;
                for (let enemy of this.battles) {
                    if (enemy.checkInRange(pos[0], pos[1])) {
                        failed = false;
                        break;
                    }
                }
                if (failed) {
                    // if (log) console.log("remove", pos);
                    hold.push(pos);
                } else {
                    // if (log) console.log("keep", pos);
                }
            }
        }

        const actual_res = [];

        for (let pos of _res) {
            let failed = false;
            for (let tmp of hold) {
                if (pos[0] == tmp[0] && pos[1] == tmp[1]) {
                    failed = true;
                    break;
                }
            }
            if (!failed) {
                actual_res.push(pos);
            }
        }

        return actual_res;
    }

    isMovable(row, col) {
        for (let pos of this.getMovablePositions()) {
            if (pos[0] == row && pos[1] == col) {
                return true;
            }
        }
        return false;
    }

    addBattle(enemy) {
        this.battles.push(enemy);
    }

    inBattle() {
        return this.battles.length > 0;
    }

    update() {
        super.update();
        this.border.clear();
        this.border.lineStyle(4, 0x00ff00, 0.3);
        this.border.drawRect(-this.range * CONSTANT.GRID_SIZE, -this.range * CONSTANT.GRID_SIZE, CONSTANT.GRID_SIZE * (this.range * 2 + 1), CONSTANT.GRID_SIZE * (this.range * 2 + 1));
    }

    checkInRange(row, col) {
        if (Math.abs(this.row - row) <= this.range && Math.abs(this.col - col) <= this.range) {
            return true;
        }
        return false;
    }
}


export class PlayerCursor extends BaseSprite {
    constructor(container, player) {
        super(container);
        this.player = player;
        this.x = player.x;
        this.y = player.y;
        this.row = player.row;
        this.col = player.col;
        this.sprite.texture = spritesheet.textures["cursor"];

        this.tint = {
            normal: 0xffffff,
            interactable: 0x00ff00,
            not_interactable: 0xff0000,
        }

        this.sprite.tint = 0xffffff;

        this.action = {
            left: keyboard("ArrowLeft", this),
            right: keyboard("ArrowRight", this),
            up: keyboard("ArrowUp", this),
            down: keyboard("ArrowDown", this),
            back_to_player: keyboard(" ", this),
            interact: keyboard("Enter", this),
        };

        this.action.left.press = this.left_press;
        this.action.right.press = this.right_press;
        this.action.up.press = this.up_press;
        this.action.down.press = this.down_press;
        this.action.back_to_player.press = this.back_to_player_press;
        this.action.interact.press = this.interact_press;
    }

    update() {
        super.update();
        if (this.player.checkInRange(this.row, this.col) && this.player.turn == this.container.turn) {
            if (this.container.grids[this.row][this.col] && this.container.grids[this.row][this.col].interactable) {
                this.sprite.tint = this.tint.interactable;
                return;
            } else if (this.container.grids[this.row][this.col] && !this.container.grids[this.row][this.col].interactable) {
                this.sprite.tint = this.tint.not_interactable;
                return;
            } else if (this.player.isMovable(this.row, this.col)) {
                this.sprite.tint = this.tint.interactable;
                return;
            }
        }

        this.sprite.tint = this.tint.normal;
    }

    getDescription() {
        if (this.container.getChildAtPosition(this.row, this.col)) {
            return this.container.getChildAtPosition(this.row, this.col).description;
        }
        return "";
    }

    getPosition() {
        return [this.row, this.col];
    }

    left_press() {
        if (this.object.x > 0) {
            this.object.x -= 64;
            this.object.col -= 1;
        }
    }

    right_press() {
        if (this.object.x < this.object.container.width - CONSTANT.GRID_SIZE) {
            this.object.x += 64;
            this.object.col += 1;
        }
    }

    up_press() {
        if (this.object.y > 0) {
            this.object.y -= 64;
            this.object.row -= 1;
        }
    }

    down_press() {
        if (this.object.y < this.object.container.height - CONSTANT.GRID_SIZE) {
            this.object.y += 64;
            this.object.row += 1;
        }
    }

    back_to_player_press() {
        this.object.x = this.object.player.x;
        this.object.y = this.object.player.y;
        this.object.row = this.object.player.row;
        this.object.col = this.object.player.col;
    }

    interact_press() {
        if (this.object.player.turn == this.object.container.turn) {
            this.object.player.interact(this.object.row, this.object.col);
        }
    }
}
