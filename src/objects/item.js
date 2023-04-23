import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { CollisionSprite } from "./base.js";

function getRandomInt(max) {return Math.floor(Math.random() * max);}
function weightedRand(spec) {
    let i, sum=0, r=Math.random();
    for (i in spec) {
        sum += spec[i];
        if (r <= sum) return i;
    }
}
export class ItemSprite extends CollisionSprite{
    constructor(container) {
        super(container);
        this.description = "[Item] ";
        this.interactions = true;
        this.max_hp = 0;
        this.hp = 0;
        this.defense = 0;
        this.attack = 0;
        this.range = 0;
    }
    interact(player) {
        player.defense += this.defense;
        player.max_hp += this.max_hp;
        player.hp += this.max_hp;
        player.attack += this.attack;
        player.range += this.range;
        this.container.removeChildAtPosition(this.row, this.col);
    }
    updateDescription() {
        this.description += "\n";
        if(this.max_hp !== 0){this.description += "["+(this.max_hp > 0 ? "+" : "")+this.max_hp+" max HP]";}
        if(this.hp !== 0){this.description += "["+(this.hp > 0 ? "+" : "")+this.hp+" HP]";}
        if(this.defense !== 0){this.description += "["+(this.defense > 0 ? "+" : "")+this.defense+" DEF]";}
        if(this.attack !== 0){this.description += "["+(this.attack > 0 ? "+" : "")+this.attack+" ATK]";}
        if(this.range !== 0){this.description += "["+(this.range > 0 ? "+" : "")+this.range+" RANGE]";}
    }
}

let helmetDropRate = {0: 0.4, 1: 0.3, 2: 0.15, 3: 0.1, 4: 0.05};
let helmetMax_hp = [3, 5, 7, 10, 15];
let helmetDefense = [0, 1, 1, 2, 3];
export class Helmet extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = weightedRand(helmetDropRate);
        this.sprite.texture = spritesheet.textures["helmet_"+x];
        this.string = "helmet_"+x;
        this.max_hp = helmetMax_hp[x];
        this.defense = helmetDefense[x];
        this.description += "Helmet " + x;
        this.updateDescription();
    }
    interact(player) {
        super.interact(player);
        player.helmet = this.string;
    }
}

let armorDropRate = {0: 0.5, 1: 0.2, 2: 0.15, 3: 0.1, 4: 0.05};
let armorMax_hp = [5, 7, 10, 20, 30];
let armorDefense = [1, 2, 3, 5, 7];
let armorRange = [0, 0, 0, -1, -1];
export class Armor extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = weightedRand(armorDropRate);
        this.sprite.texture = spritesheet.textures["armor_"+x];
        this.string = "armor_"+x;
        this.max_hp = armorMax_hp[x];
        this.defense = armorDefense[x];
        this.range = armorRange[x];
        this.description += "Armor " + x;
        this.updateDescription();
    }
    interact(player) {
        super.interact(player);
        player.armor = this.string;
    }
}

let knifeDropRate = {0: 0.4, 1: 0.3, 2: 0.15, 3: 0.1, 4: 0.05};
let knifeAttack = [1, 2, 3, 4, 5];
let knifeRange = [0, 0, 0, 1, 1];
export class Knife extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = weightedRand(knifeDropRate);
        this.sprite.texture = spritesheet.textures["knife_"+x];
        this.string = "knife_"+x;
        this.attack = knifeAttack[x];
        this.range = knifeRange[x];
        this.description += "Knife " + x;
        this.updateDescription();
    }
    interact(player) {
        super.interact(player);
        player.weapon = this.string;
    }
}

let broadswordDropRate = {0: 0.5, 1: 0.2, 2: 0.15, 3: 0.1, 4: 0.05};
let broadswordAttack = [3, 5, 8, 12, 17];
let broadswordRange = [0, -1, -1, -1, -1];
let broadswordDefense = [0, -1, -2, -3, -4];
export class Broadsword extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = weightedRand(broadswordDropRate);
        this.sprite.texture = spritesheet.textures["broadsword_"+x];
        this.string = "broadsword_"+x;
        this.attack = broadswordAttack[x];
        this.range = broadswordRange[x];
        this.defense = broadswordDefense[x];
        this.description += "Broadsword " + x;
        this.updateDescription();
    }
    interact(player) {
        super.interact(player);
        player.weapon = this.string;
    }
}

let roundshieldDropRate = {0: 0.4, 1: 0.3, 2: 0.2, 3: 0.1};
let roundshieldDefense = [1, 2, 3, 4];
export class Roundshield extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = weightedRand(roundshieldDropRate);
        this.sprite.texture = spritesheet.textures["roundshield_"+x];
        this.string = "roundshield_"+x;
        this.defense = roundshieldDefense[x];
        this.description += "Roundshield " + x;
        this.updateDescription();
    }
    interact(player) {
        super.interact(player);
        player.shield = this.string;
    }
}

let ringDropRate = {0: 0.5, 1: 0.35, 2: 0.1, 3: 0.05};
let ringMax_hp = [3, 5, 8, 10];
let ringDefense = [1, 1, 2, 3];
let ringAttack = [1, 1, 2, 3];

export class Ring extends ItemSprite {
    constructor(container) {
        super(container);
        this.container = container;
        let x = weightedRand(ringDropRate);
        this.sprite.texture = spritesheet.textures["ring_"+x];
        this.string = "ring_"+x;
        this.max_hp = ringMax_hp[x];
        this.defense = ringDefense[x];
        this.attack = ringAttack[x];
        this.description += "Ring " + x;
        this.updateDescription();
    }
    interact(player) {
        super.interact(player);
        player.accessory = this.string;
    }
}
