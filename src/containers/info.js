import * as PIXI from '../../include/pixi.mjs';
import { CONSTANT } from '../constant.js';
import { spritesheet } from '../sprite_loader.js';
import { BaseContainer } from './base.js';

class TextInfo extends BaseContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height});
        this.player = player;
        this.text = new PIXI.Text(``, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }
}

class HitPointInfo extends TextInfo {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(`HP: ${this.player.hp}/${this.player.max_hp}`, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = `HP: ${this.player.hp}/${this.player.max_hp}`;
    }
}

class LevelInfo extends TextInfo {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(`LEVEL: ${this.player.level}`, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = `Level: ${this.player.level}`;
    }
}

class AttackInfo extends TextInfo {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(`ATK: ${this.player.attack}`, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = `ATK: ${this.player.attack}`;
    }
}

class DefenseInfo extends TextInfo {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(`DEF: ${this.player.defense}`, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = `DEF: ${this.player.defense}`;
    }
}


class RangeInfo extends TextInfo {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(`RANGE: ${this.player.range}`, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = `RANGE: ${this.player.range}`;
    }
}


class InBattleInfo extends TextInfo {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(``, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = `Battle: ${this.player.inBattle() ? 1 : 0}`;
    }
}


export class DescriptionContainer extends TextInfo {
    description = "";
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
        this.text = new PIXI.Text(this.description, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0xff0000,
            wordWrap: true,
            wordWrapWidth: 1000,
        });
        this.addChild(this.text);
    }

    update() {
        this.text.text = this.player.cursor.getDescription();
    }
}

class ItemContainer extends BaseContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height});
        this.player = player;
        this.sprite = new PIXI.Sprite(spritesheet.textures[""]);

        let g = new PIXI.Graphics();
        g.beginFill(0x00000);
        // set the line style to have a width of 5 and set the color to red
        g.lineStyle(4, 0xFF0000);
        // draw a rectangle
        g.drawRect(this.x, this.y, 64, 64);
        // make the container interactive...
        g.interactive = true;
        g.cursor = 'pointer';
        //g.on('pointerover', DisplayInfo);
        //g.on('pointerout', StopDisplayInfo);

        this.addChild(g);
        this.addChild(this.sprite);
    }
}

function DisplayInfo(){
    console.log("display info");
    let info = new PIXI.Graphics();
    info.beginFill(0x00000);
    info.lineStyle(4, 0xFF0000);
    info.drawRect(0, 0, 200, 200);
    this.addChild(info);
}

function StopDisplayInfo(){
    console.log("stop display info");
    this.removeChild(this.children[0]);
}

class HelmetContainer extends ItemContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
    }
    update() {
        this.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(spritesheet.textures[this.player.helmet]);
        this.addChild(this.sprite);      
    }
}

class ArmorContainer extends ItemContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
    }
    update() {
        this.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(spritesheet.textures[this.player.armor]);
        this.addChild(this.sprite);
    }
}

class WeaponContainer extends ItemContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
    }
    update() {
        this.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(spritesheet.textures[this.player.weapon]);
        this.addChild(this.sprite);
    }
}

class ShieldContainer extends ItemContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
    }
    update() {
        this.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(spritesheet.textures[this.player.shield]);
        this.addChild(this.sprite);
    }
}

class BootsContainer extends ItemContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
    }
    update() {
        this.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(spritesheet.textures[this.player.boots]);
        this.addChild(this.sprite);
    }
}
class AccessoryContainer extends ItemContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height, player});
    }
    update() {
        this.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(spritesheet.textures[this.player.accessory]);
        this.addChild(this.sprite);
    }
}
export class InfoContainer extends BaseContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height});
        this.player = player;
        this.hit_point_info = new HitPointInfo({x: 48, y: 48, width: 200, height: 50, player: this.player});
        this.level_info = new LevelInfo({x: 48, y: 80, width: 200, height: 50, player: this.player});
        this.attack_info = new AttackInfo({x: 242, y: 48, width: 200, height: 50, player: this.player});
        this.defense_info = new DefenseInfo({x: 242, y: 80, width: 200, height: 50, player: this.player});
        this.range_info = new RangeInfo({x: 380, y: 48, width: 200, height: 50, player: this.player});
        this.in_battle_info = new InBattleInfo({x: 380, y: 80, width: 200, height: 50, player: this.player});
        this.description = new DescriptionContainer({x: 1000, y: 48, width: 200, height: 50, player: this.player});

        this.background = new PIXI.Sprite(spritesheet.textures["info_background"]);

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 16, this.width, this.height);
        this.addChild(graphics);

        this.addChild(this.hit_point_info);
        this.addChild(this.level_info);
        this.addChild(this.attack_info);
        this.addChild(this.defense_info);
        this.addChild(this.range_info);
        this.addChild(this.description);
        this.addChild(this.in_battle_info);
    
        this.helmet = new HelmetContainer({x: 576, y: 48, width: 64, height: 64, player: this.player});
        this.armor = new ArmorContainer({x: 656, y: 48, width: 64, height: 64, player: this.player});
        this.weapon = new WeaponContainer({x: 736, y: 48, width: 64, height: 64, player: this.player});
        this.shield = new ShieldContainer({x: 816, y: 48, width: 64, height: 64, player: this.player});
        this.accessory = new AccessoryContainer({x: 896, y: 48, width: 64, height: 64, player: this.player});

        this.addChild(this.helmet);
        this.addChild(this.armor);
        this.addChild(this.weapon);
        this.addChild(this.shield);
        this.addChild(this.accessory);

        // Border
        const top_bar_corner_left = new PIXI.Sprite(spritesheet.textures["top_bar_corner_left"]);
        top_bar_corner_left.x = -16;
        // create top bar corner right using flipX of top bar corner left
        const top_bar_corner_right = new PIXI.Sprite(spritesheet.textures["top_bar_corner_left"]);
        top_bar_corner_right.scale.x = -1;
        top_bar_corner_right.x = CONSTANT.GRID_WIDTH * 64 + 16;
        this.addChild(top_bar_corner_left);
        this.addChild(top_bar_corner_right);
        for (let i = 0; i < CONSTANT.GRID_WIDTH - 1; i++) {
            const top_bar = new PIXI.Sprite(spritesheet.textures["top_bar"]);
            top_bar.x = (i + 1) * 64 - 16;
            this.addChild(top_bar);
        }
        const left_vertical_bar = new PIXI.Sprite(spritesheet.textures["top_bar"]);
        left_vertical_bar.rotation = Math.PI * 3 / 2;
        left_vertical_bar.anchor.set(0.5, 0.5);
        const right_vertical_bar = new PIXI.Sprite(spritesheet.textures["top_bar"]);
        right_vertical_bar.rotation = Math.PI / 2;
        right_vertical_bar.anchor.set(0.5, 0.5);
        left_vertical_bar.x = 16;
        left_vertical_bar.y = 96;
        right_vertical_bar.x = CONSTANT.GRID_WIDTH * 64 - 16;
        right_vertical_bar.y = 96;
        this.addChild(left_vertical_bar);
        this.addChild(right_vertical_bar);
    }
}


export class InteractionContainer extends BaseContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height});
        this.player = player;
        this.interaction = new PIXI.Text(``, {
            fontFamily: 'BitPotion',
            fontSize: 48,
            fill: 0x38d973,
            align: 'center',
        });
        this.addChild(this.interaction);
    }

    update() {
        if (this.player.interaction) {
            this.interaction.text = this.player.interaction;
        } else {
            this.interaction.text = "";
        }
    }
}
