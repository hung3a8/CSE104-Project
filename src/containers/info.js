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

export class InfoContainer extends BaseContainer {
    constructor({x, y, width, height, player}) {
        super({x, y, width, height});
        this.player = player;
        this.hit_point_info = new HitPointInfo({x: 32, y: 48, width: 200, height: 50, player: this.player});
        this.level_info = new LevelInfo({x: 32, y: 80, width: 200, height: 50, player: this.player});
        this.attack_info = new AttackInfo({x: 256, y: 48, width: 200, height: 50, player: this.player});
        this.defense_info = new DefenseInfo({x: 256, y: 80, width: 200, height: 50, player: this.player});
        this.addChild(this.hit_point_info);
        this.addChild(this.level_info);
        this.addChild(this.attack_info);
        this.addChild(this.defense_info);

        const top_bar_corner_left = new PIXI.Sprite(spritesheet.textures["top_bar_corner_left"]);
        // create top bar corner right using flipX of top bar corner left
        const top_bar_corner_right = new PIXI.Sprite(spritesheet.textures["top_bar_corner_left"]);
        top_bar_corner_right.scale.x = -1;
        top_bar_corner_right.x = CONSTANT.GRID_WIDTH * 64;
        this.addChild(top_bar_corner_left);
        this.addChild(top_bar_corner_right);
        for (let i = 0; i < CONSTANT.GRID_WIDTH - 2; i++) {
            const top_bar = new PIXI.Sprite(spritesheet.textures["top_bar"]);
            top_bar.x = (i + 1) * 64;
            this.addChild(top_bar);
        }
    }

    update() {
        this.hit_point_info.update();
        this.level_info.update();
        this.attack_info.update();
        this.defense_info.update();
    }
}
