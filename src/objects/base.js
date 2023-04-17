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
}

export class CollisionSprite extends BaseSprite {
    constructor(container) {
        super(container);
    }

    can_move(to_x, to_y) {
        // Get the object at position (x, y) in container
    }
}
