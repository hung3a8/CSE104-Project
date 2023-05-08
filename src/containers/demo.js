import * as PIXI from "../../include/pixi.mjs";
import { CONSTANT } from "../constant.js";
import { GameContainer } from "./base.js";

export const container = new GameContainer({
    rows: 32,
    cols: 32,
});

export const bgcontainer = new GameContainer({
    rows: 32,
    cols: 32,
});
