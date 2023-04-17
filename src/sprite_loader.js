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

        // Enemy
        enemy_0: get_frame(24, 1),
        enemy_1: get_frame(25, 1),
        enemy_2: get_frame(26, 1),
        enemy_3: get_frame(27, 1),
        enemy_4: get_frame(28, 1),
        enemy_5: get_frame(29, 1),
        enemy_6: get_frame(30, 1),
        enemy_7: get_frame(31, 1),
        enemy_8: get_frame(24, 2),
        enemy_9: get_frame(25, 2),
        enemy_10: get_frame(26, 2),
        enemy_11: get_frame(27, 2),
        enemy_12: get_frame(28, 2),
        enemy_13: get_frame(29, 2),
        enemy_14: get_frame(30, 2),
        enemy_15: get_frame(31, 2),

        // Tree
        tree_0: get_frame(0, 1),
        tree_1: get_frame(1, 1),
        tree_2: get_frame(2, 1),
        tree_3: get_frame(3, 1),
        tree_4: get_frame(4, 1),
        tree_5: get_frame(5, 1),
        tree_6: get_frame(6, 1),
        tree_7: get_frame(7, 1),
        tree_8: get_frame(0, 2),
        tree_9: get_frame(1, 2),

        // Heath cards
        health_0: get_frame(19, 16),
        health_1: get_frame(20, 16),
        health_2: get_frame(21, 16),
        health_3: get_frame(22, 16),
        health_4: get_frame(23, 16),
        health_5: get_frame(24, 16),
        health_6: get_frame(25, 16),
        health_7: get_frame(26, 16),
        health_8: get_frame(27, 16),
        health_9: get_frame(28, 16),
        health_10: get_frame(29, 16),

        // Orange house
        orangehouse_0: get_frame(5, 12),
        orangehouse_1: get_frame(6, 12),
        orangehouse_2: get_frame(7, 12),
        orangehouse_3: get_frame(5, 13),
        orangehouse_4: get_frame(6, 13),
        orangehouse_5: get_frame(7, 13),

        // Wooden house
        woodenhouse_0: get_frame(10, 15),
        woodenhouse_1: get_frame(11, 15),
        woodenhouse_2: get_frame(12, 15),
        woodenhouse_3: get_frame(10, 16),
        woodenhouse_4: get_frame(11, 16),
        woodenhouse_5: get_frame(12, 16),

        // Info bars
        "top_bar_corner_left": get_frame(19, 15),
        "top_bar": get_frame(20, 15),
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
