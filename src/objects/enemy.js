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
