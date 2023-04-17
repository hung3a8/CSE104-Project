import * as PIXI from '../include/pixi.mjs';

const DEFAULT_TILE_SIZE = { x: 0, y: 0, w: 64, h: 64 };
const DEFAULT_ANCHOR = { x: 0, y: 0 };

function get_frame(col, row, tileSize = DEFAULT_TILE_SIZE, anchor = DEFAULT_ANCHOR) {
    return {
        frame: {
            x: tileSize.w * col,
            y: tileSize.h * row,
            w: tileSize.w,
            h: tileSize.h,
        },
        spriteSourceSize: {
            x: 0,
            y: 0,
            w: tileSize.w,
            h: tileSize.h,
        },
        sourceSize: {
            w: tileSize.w,
            h: tileSize.h,
        },
        anchor: {
            x: anchor.x,
            y: anchor.y,
        },
    };
}

export const atlasData = {
    frames: {
        player_0: get_frame(25, 0),
        player_1: get_frame(26, 0),
        player_2: get_frame(27, 0),
        player_3: get_frame(28, 0),
        player_4: get_frame(29, 0),
        player_5: get_frame(30, 0),
    },
    meta: {
        image: 'sprites/tilesheet.png',
        format: 'RGBA8888',
        size: { w: 1536, h: 704 },
    },
};

export const spritesheet = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasData.meta.image),
    atlasData,
);

await spritesheet.parse();
