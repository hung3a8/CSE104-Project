import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";

export class OrangeHouse extends CollisionSprite {
    constructor(container, id) {
        super(container);
        this.container = container;
        this.sprite.texture = spritesheet.textures["orangehouse_" + id];
    }
}

export class WoodenHouse extends CollisionSprite {
    constructor(container, id) {
        super(container);
        this.container = container;
        this.sprite.texture = spritesheet.textures["woodenhouse_" + id];
    }
}