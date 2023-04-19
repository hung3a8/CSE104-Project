import * as PIXI from '../../include/pixi.mjs';

export class BaseSprite {
    level = 0;
    sprite = null;
    evolutions = [];
    hp = null;
    max_hp = null;
    attack = null;
    defense = null;
    container = null;
    col = null;
    row = null;

    // Interactions
    interactions = {};
    description = "";

    constructor(container) {
        this.container = container;
        this.sprite = new PIXI.Sprite();
        this.sprite.object = this;  // Two way reference
    }

    get x() { return this.sprite.x; }
    set x(value) { this.sprite.x = value; }
    get y() { return this.sprite.y; }
    set y(value) { this.sprite.y = value; }

    evolve(delta = 1) {
        this.level = Math.min(this.level + delta, this.evolutions.length - 1);
        this.sprite.texture = this.evolutions[this.level];
    }

    get interactable() {
        return this.interactions.length > 0;
    }
}

export class CollisionSprite extends BaseSprite {
    constructor(container) {
        super(container);
    }

    can_move(to_col, to_row) {
        // Get the object at position (x, y) in container
        if (to_col < 0 || to_col >= this.container.cols || to_row < 0 || to_row >= this.container.rows) {
            return false;
        }
        let obj = this.container.grids[to_col][to_row];
        if (!(obj instanceof CollisionSprite)) {
            return true;
        }
        return false;
    }
}
