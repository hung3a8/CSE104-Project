import * as PIXI from '../../include/pixi.mjs';
import { CONSTANT } from '../constant.js';
import { BaseContainer } from './base.js';

export const container = new BaseContainer({
    x: 0,
    y: CONSTANT.GAME_HEIGHT,
    width: CONSTANT.INFO_WIDTH,
    height: CONSTANT.INFO_HEIGHT,
})
