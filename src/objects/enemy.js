import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";

export class Enemy extends CollisionSprite {
    constructor(container) {
        super(container);
        this.container = container;
        this.level = 0;

        this.sprite.texture = spritesheet.textures["enemy_0"];

        this.hp = 10;
        this.max_hp = 10;
        this.attack = 5;
        this.defense = 1;
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
}