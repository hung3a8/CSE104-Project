import * as PIXI from '../../include/pixi.mjs';
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

    triggerBattle() {
        this.battleLock = true;
    }

    playTurn() { return; }  // Override this

    get interactable() {
        return this.interactions;
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