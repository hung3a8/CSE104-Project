import * as PIXI from '../include/pixi.mjs';
import { CONSTANT } from './constant.js';
import * as FontFaceObserver from '../include/fontfaceobserver.js';
import { setup, gameLoop } from './loop.js';

const mainCanvas = document.getElementById('game-canvas');
export const app = new PIXI.Application({
    width: CONSTANT.GRID_WIDTH * CONSTANT.GRID_SIZE,
    height: CONSTANT.GRID_HEIGHT * CONSTANT.GRID_SIZE,
    view: mainCanvas,
    backgroundColor: 0x000000,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
});

const font = new window.FontFaceObserver('BitPotion', {});
font.load().then(() => {
    document.body.appendChild(app.view);
    setup();
    app.ticker.add((delta) => gameLoop(delta));
});
