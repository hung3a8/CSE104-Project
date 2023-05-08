import * as PIXI from '../../include/pixi.mjs';
import { CONSTANT } from '../constant.js';
export class BaseSprite {
    level = 0;
    sprite = null;
    evolutions = [];
    hp = null;
    max_hp = null;
    attack = null;
    defense = null;
    range = null;
    turn = null;  // 1 = player, 0 = enemy.
    battleLock = false;
    container = null;
    col = null;
    row = null;

    // Interactions
    interactions = false;
    description = "";

    constructor(container) {
        this.container = container;
        this.sprite = new PIXI.Sprite();
        this.sprite.object = this;
        this.border = new PIXI.Graphics();
        this.sprite.addChild(this.border);
    }

    get x() { return this.sprite.x; }
    set x(value) { this.sprite.x = value; }
    get y() { return this.sprite.y; }
    set y(value) { this.sprite.y = value; }

    evolve(delta = 1) {
        this.level = Math.min(this.level + delta, this.evolutions.length - 1);
        this.sprite.texture = this.evolutions[this.level];
    }

    inflictDamage(damage) {
        this.hp = Math.max(this.hp - Math.max(damage - this.defense, 0), 0);
        if (this.hp == 0) {
            this.die();
        }
    }

    die() {
        this.container.removeChild(this.sprite);
        this.container.grids[this.row][this.col] = null;
    }


    attackObject(obj) {
        obj.inflictDamage(this.attack);
    }

    playTurn() { return; }  // Override this

    get interactable() {
        return 'interact' in this;
    }

    update() {}
}

export class CollisionSprite extends BaseSprite {
    can_move(to_row, to_col) {
        // Get the object at position (x, y) in container
        if (to_row < 0 || to_row >= this.container.rows || to_col < 0 || to_col >= this.container.cols) {
            return false;
        }
        let obj = this.container.grids[to_row][to_col];
        if (!(obj instanceof CollisionSprite) || obj === null) {
            return true;
        }
        return false;
    }
}
