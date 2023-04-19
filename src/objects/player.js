import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from '../constant.js';
import { spritesheet } from "../sprite_loader.js";
import { keyboard } from "../utils/keyboard.js";
import { BaseSprite, CollisionSprite } from "./base.js";


export class Player extends CollisionSprite {
    constructor(container) {
        super(container);

        this.evolutions = [
            spritesheet.textures["player_0"],
            spritesheet.textures["player_1"],
            spritesheet.textures["player_2"],
            spritesheet.textures["player_3"],
            spritesheet.textures["player_4"],
            spritesheet.textures["player_5"],
        ];

        this.sprite.texture = this.evolutions[this.level];
        this.description = "This is you.";
        // Initial stats
        this.hp = 100;
        this.max_hp = 100;
        this.attack = 10;
        this.defense = 2;
        this.range = 2;

        this.cursor = null;

        this.action = {
            test_function: keyboard("t", this),
            evolve: keyboard("e", this),
            kms: keyboard("k", this),
        };

        // this.action.left.press = this.left_press;
        // this.action.right.press = this.right_press;
        // this.action.up.press = this.up_press;
        // this.action.down.press = this.down_press;
        this.action.test_function.press = this.test_function_press;
        this.action.evolve.press = this.evolve_press;
        this.action.kms.press = this.kms_press;
    }

    evolve_press() {
        this.object.evolve();
    }

    kms_press() {
        this.object.hp = Math.max(this.object.hp - 10, 0);
    }

    interact(row, col) {
        if (this.checkInRange(row, col)) {
            let obj = this.container.grids[row][col];
            if (obj instanceof CollisionSprite && obj.interactable) {
                obj.interact(this);
            } else {
                for (let pos of this.getMovablePositions()) {
                    if (pos[0] == row && pos[1] == col) {
                        this.container.grids[this.row][this.col] = null;
                        this.row = row;
                        this.col = col;
                        this.container.grids[this.row][this.col] = this;
                        this.x = this.col * CONSTANT.GRID_SIZE;
                        this.y = this.row * CONSTANT.GRID_SIZE;
                        console.table(this.container.grids);
                        break;
                    }
                }
            }
        }
    }

    test_function_press() {
        this.object.getMovablePositions();
        console.log(this.object.cursor);
        console.log(this.object.getCursorPosition());
    }

    setCursor(cursor) {
        this.cursor = cursor;
    }

    getCursorPosition() {
        if (this.cursor) {
            return this.cursor.getPosition();
        }
        return null, null;
    }

    getMovablePositions() {
        const _res = [];
        for (let i = -1; i >= -this.range; i--) {
            if (this.can_move(this.row + i, this.col)) {
                _res.push([this.row + i, this.col]);
            } else break;
        }
        for (let i = 1; i <= this.range; i++) {
            if (this.can_move(this.row + i, this.col)) {
                _res.push([this.row + i, this.col]);
            } else break;
        }
        for (let i = -1; i >= -this.range; i--) {
            if (this.can_move(this.row, this.col + i)) {
                _res.push([this.row, this.col + i]);
            } else break;
        }
        for (let i = 1; i <= this.range; i++) {
            if (this.can_move(this.row, this.col + i)) {
                _res.push([this.row, this.col + i]);
            } else break;
        }
        return _res;
    }

    checkInRange(row, col) {
        if (Math.abs(this.row - row) <= this.range && Math.abs(this.col - col) <= this.range) {
            return true;
        }
        return false;
    }

    // left_press() {
    //     if (this.object.x > 0 && this.object.can_move(this.object.row, this.object.col - 1)) {
    //         this.object.x -= 64;
    //         this.object.container.grids[this.object.row][this.object.col] = null;
    //         this.object.col -= 1;
    //         this.object.container.grids[this.object.row][this.object.col] = this.object;
    //         // console.table(this.object.container.grids);
    //     }
    // }

    // right_press() {
    //     if (this.object.x < this.object.container.width - CONSTANT.GRID_SIZE && this.object.can_move(this.object.row, this.object.col + 1)) {
    //         this.object.x += 64;
    //         this.object.container.grids[this.object.row][this.object.col] = null;
    //         this.object.col += 1;
    //         this.object.container.grids[this.object.row][this.object.col] = this.object;
    //         // console.table(this.object.container.grids);
    //     }
    // }

    // up_press() {
    //     if (this.object.y > 0 && this.object.can_move(this.object.row - 1, this.object.col)) {
    //         this.object.y -= 64;
    //         this.object.container.grids[this.object.row][this.object.col] = null;
    //         this.object.row -= 1;
    //         this.object.container.grids[this.object.row][this.object.col] = this.object;
    //         // console.table(this.object.container.grids);
    //     }
    // }

    // down_press() {
    //     if (this.object.y < this.object.container.height - CONSTANT.GRID_SIZE && this.object.can_move(this.object.row + 1, this.object.col)) {
    //         this.object.y += 64;
    //         this.object.container.grids[this.object.row][this.object.col] = null;
    //         this.object.row += 1;
    //         this.object.container.grids[this.object.row][this.object.col] = this.object;
    //         // console.table(this.object.container.grids);
    //     }
    // }
}


export class PlayerCursor extends BaseSprite {
    constructor(container, player) {
        super(container);
        this.player = player;
        this.x = player.x;
        this.y = player.y;
        this.row = player.row;
        this.col = player.col;
        this.sprite.texture = spritesheet.textures["cursor"];

        this.tint = {
            normal: 0xffffff,
            interactable: 0x00ff00,
            not_interactable: 0xff0000,
        }

        this.sprite.tint = 0xffffff;

        this.action = {
            left: keyboard("ArrowLeft", this),
            right: keyboard("ArrowRight", this),
            up: keyboard("ArrowUp", this),
            down: keyboard("ArrowDown", this),
            back_to_player: keyboard(" ", this),
            interact: keyboard("Enter", this),
        };

        this.action.left.press = this.left_press;
        this.action.right.press = this.right_press;
        this.action.up.press = this.up_press;
        this.action.down.press = this.down_press;
        this.action.back_to_player.press = this.back_to_player_press;
        this.action.interact.press = this.interact_press;
    }

    update() {
        if (this.player.checkInRange(this.row, this.col)) {
            if (this.container.grids[this.row][this.col] && this.container.grids[this.row][this.col].interactable) {
                this.sprite.tint = this.tint.interactable;
            } else if (this.container.grids[this.row][this.col] && !this.container.grids[this.row][this.col].interactable) {
                this.sprite.tint = this.tint.not_interactable;
            } else {
                this.sprite.tint = this.tint.interactable;  // Movable actually
            }
        } else {
            this.sprite.tint = this.tint.normal;
        }
    }

    getDescription() {
        if (this.container.getChildAtPosition(this.row, this.col)) {
            return this.container.getChildAtPosition(this.row, this.col).description;
        }
        return "";
    }

    getPosition() {
        return [this.row, this.col];
    }

    left_press() {
        if (this.object.x > 0) {
            this.object.x -= 64;
            this.object.col -= 1;
        }
    }

    right_press() {
        if (this.object.x < this.object.container.width - CONSTANT.GRID_SIZE) {
            this.object.x += 64;
            this.object.col += 1;
        }
    }

    up_press() {
        if (this.object.y > 0) {
            this.object.y -= 64;
            this.object.row -= 1;
        }
    }

    down_press() {
        if (this.object.y < this.object.container.height - CONSTANT.GRID_SIZE) {
            this.object.y += 64;
            this.object.row += 1;
        }
    }

    back_to_player_press() {
        this.object.x = this.object.player.x;
        this.object.y = this.object.player.y;
        this.object.row = this.object.player.row;
        this.object.col = this.object.player.col;
    }

    interact_press() {
        this.object.player.interact(this.object.row, this.object.col);
    }
}
