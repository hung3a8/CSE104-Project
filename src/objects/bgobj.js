import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { BaseSprite } from "./base.js";

function getRandomInt(max) {return Math.floor(Math.random() * max);}

export class Grass extends BaseSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = getRandomInt(3);
        this.sprite.texture = spritesheet.textures["grass_" + x];
    }
}

export class Dirt extends BaseSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = getRandomInt(4);
        this.sprite.texture = spritesheet.textures["dirt_" + x];
    }
}