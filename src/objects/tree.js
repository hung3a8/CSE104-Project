import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";


function getRandomInt(max) {return Math.floor(Math.random() * max);}

export class Tree extends CollisionSprite {
    constructor(container) {
        super(container);
        this.container = container;
        this.description = "Just a tree. Nothing to see here.";
        let x = getRandomInt(9);
        this.sprite.texture = spritesheet.textures["tree_" + x];
    }
}
