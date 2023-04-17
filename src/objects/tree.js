import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";


function getRandomInt(max) {return Math.floor(Math.random() * max);}

export class Tree extends CollisionSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = getRandomInt(10);
        this.sprite.texture = spritesheet.textures["tree_" + x];
    }
}