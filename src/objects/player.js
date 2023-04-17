import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { keyboard } from "../utils/keyboard.js";
import { BaseSprite, CollisionSprite } from "./base.js";


export class Player extends CollisionSprite {
    constructor(container) {
        super(container);
        this.container = container;
        this.level = 0;

        this.evolutions = [
            spritesheet.textures["player_0"],
            spritesheet.textures["player_1"],
            spritesheet.textures["player_2"],
            spritesheet.textures["player_3"],
            spritesheet.textures["player_4"],
            spritesheet.textures["player_5"],
        ];

        this.sprite.texture = this.evolutions[this.level];

        this.hp = 100;
        this.max_hp = 100;
        this.attack = 10;
        this.defense = 2;

        this.action = {
            left: keyboard("ArrowLeft", this),
            right: keyboard("ArrowRight", this),
            up: keyboard("ArrowUp", this),
            down: keyboard("ArrowDown", this),
            evolve: keyboard("e", this),
            kms: keyboard("k", this),
        };

        this.action.left.press = this.left_press;
        this.action.right.press = this.right_press;
        this.action.up.press = this.up_press;
        this.action.down.press = this.down_press;
        this.action.evolve.press = this.evolve_press;
        this.action.kms.press = this.kms_press;
    }

    evolve_press() {
        this.object.evolve();
    }

    kms_press() {
        this.object.hp = Math.max(this.object.hp - 10, 0);
    }

    left_press() {
        if (this.object.x > 0 && this.object.can_move(this.object.row, this.object.col - 1)) {
            this.object.x -= 64;
            this.object.container.grids[this.object.row][this.object.col] = null;
            this.object.col -= 1;
            this.object.container.grids[this.object.row][this.object.col] = this.object;
            // console.table(this.object.container.grids);
        }
    }

    right_press() {
        if (this.object.x < this.object.container.width - CONSTANT.GRID_SIZE && this.object.can_move(this.object.row, this.object.col + 1)) {
            this.object.x += 64;
            this.object.container.grids[this.object.row][this.object.col] = null;
            this.object.col += 1;
            this.object.container.grids[this.object.row][this.object.col] = this.object;
            // console.table(this.object.container.grids);
        }
    }

    up_press() {
        if (this.object.y > 0 && this.object.can_move(this.object.row - 1, this.object.col)) {
            this.object.y -= 64;
            this.object.container.grids[this.object.row][this.object.col] = null;
            this.object.row -= 1;
            this.object.container.grids[this.object.row][this.object.col] = this.object;
            // console.table(this.object.container.grids);
        }
    }

    down_press() {
        if (this.object.y < this.object.container.height - CONSTANT.GRID_SIZE && this.object.can_move(this.object.row + 1, this.object.col)) {
            this.object.y += 64;
            this.object.container.grids[this.object.row][this.object.col] = null;
            this.object.row += 1;
            this.object.container.grids[this.object.row][this.object.col] = this.object;
            // console.table(this.object.container.grids);
        }
    }
}


export class HitPoint extends BaseSprite {
    constructor(container) {
        super(container);
        this.container = container;
        this.level = 0;

        this.evolutions = [
            spritesheet.textures["health_0"],
            spritesheet.textures["health_1"],
            spritesheet.textures["health_2"],
            spritesheet.textures["health_3"],
            spritesheet.textures["health_4"],
            spritesheet.textures["health_5"],
            spritesheet.textures["health_6"],
            spritesheet.textures["health_7"],
            spritesheet.textures["health_8"],
            spritesheet.textures["health_9"],
            spritesheet.textures["health_10"],
        ];

        this.sprite.texture = spritesheet.textures["health_0"];
        this.x = 0;
        this.y = 0;
    }
}
