import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";

function getRandomInt(max) {return Math.floor(Math.random() * max);}

export class ItemSprite extends CollisionSprite{
    constructor(container) {
        super(container);
        this.description = "[Item] ";
        this.interactions = true;
    }
}

export class Helmet extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        this.description += "A helmet.";
        this.sprite.texture = spritesheet.textures["helmet_0"];
    }
    interact(player) {
        player.defense += 1;
        console.log(player.defense);
        this.container.removeChildAtPosition(this.row, this.col);
    }
}

