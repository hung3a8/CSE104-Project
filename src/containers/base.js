import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from "../constant.js";

export class BaseContainer extends PIXI.Container {
    width = null;
    height = null;

    constructor({
        x = 0,
        y = 0,
        width = 0,
        height = 0,
    }) {
        super();
        this.position.x = x;
        this.position.y = y;
        this.width = width;
        this.height = height;
    }

    get x() { return this.sprite.x; }
    set x(value) { this.sprite.x = value; }
    get y() { return this.sprite.y; }
    set y(value) { this.sprite.y = value; }
}


export class GameContainer extends BaseContainer {
    rows = null;
    cols = null;
    static GRID_SIZE = CONSTANT.GRID_SIZE;

    constructor({
        rows = 0,
        cols = 0,
    }) {
        super({ x: 0, y: 0, width: GameContainer.GRID_SIZE * cols, height: GameContainer.GRID_SIZE * rows });
        this.rows = rows;
        this.cols = cols;
        this.grids = Array.from(Array(rows), () => new Array(cols).fill(null));
    }

    addChildAtPosition(child, row, col) {
        super.addChild(child);
        child.x = col * GameContainer.GRID_SIZE;
        child.y = row * GameContainer.GRID_SIZE;
        this.grids[row][col] = child;
    }
}
