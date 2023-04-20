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

    update() {
        for (let child of this.children) {
            if (child.update) {
                child.update();
            }
            else if (child.object && child.object.update) {
                child.object.update();
            }
        }
    }
}


export class GameContainer extends BaseContainer {
    rows = null;
    cols = null;
    turn = 1;  // 1 for player, 0 for enemy
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

    update() {
        // console.log(this.children);
        for (let child of this.children) {
            if (child.object.update) child.object.update();
        }
    }

    nextTurn() {
        this.turn = Math.abs(this.turn - 1);
        console.log("Turn: " + this.turn);
        if (this.turn == 1) {
            return;
        } else {
            for (let child of this.children) {
                if (child.object.turn == this.turn) {
                    child.object.playTurn();
                }
            }
            this.nextTurn();
        }
    }

    setPlayer(player, row, col) {
        this.player = player;
        this.addChildAtPosition(player.sprite, row, col);
    }

    getChildAtPosition(row, col) {
        return this.grids[row][col];
    }

    addChildAtPosition(child, row, col) {
        super.addChild(child);
        child.x = col * GameContainer.GRID_SIZE;
        child.y = row * GameContainer.GRID_SIZE;
        child.object.row = row;
        child.object.col = col;
        this.grids[row][col] = child.object;
    }
}
