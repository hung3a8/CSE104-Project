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

        cursor: get_frame(29, 14),

        // Enemy
        enemy_0: get_frame(24, 0),
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
        tree_7: get_frame(3, 2),
        tree_8: get_frame(4, 2),

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

        // Dirt
        dirt_0: get_frame(1, 0),
        dirt_1: get_frame(2, 0),
        dirt_2: get_frame(3, 0),
        dirt_3: get_frame(4, 0),

        // Grass
        grass_0: get_frame(5, 0),
        grass_1: get_frame(6, 0),
        grass_2: get_frame(7, 0),

        // Item - Helmet
        helmet_0: get_frame(32, 0),
        helmet_1: get_frame(33, 0),
        helmet_2: get_frame(34, 0),
        helmet_3: get_frame(35, 0),
        helmet_4: get_frame(36, 0),

        // Item - Armor
        armor_0: get_frame(32, 1),
        armor_1: get_frame(33, 1),
        armor_2: get_frame(34, 1),
        armor_3: get_frame(35, 1),
        armor_4: get_frame(36, 1),

        // Item - Knife
        knife_0: get_frame(32, 6),
        knife_1: get_frame(33, 6),
        knife_2: get_frame(34, 6),
        knife_3: get_frame(35, 6),
        knife_4: get_frame(36, 6),

        // Item - Broadsword
        broadsword_0: get_frame(32, 8),
        broadsword_1: get_frame(33, 8),
        broadsword_2: get_frame(34, 8),
        broadsword_3: get_frame(35, 8),
        broadsword_4: get_frame(36, 8),

        // Item - Round shield
        roundshield_0: get_frame(37, 2), 
        roundshield_1: get_frame(38, 2),
        roundshield_2: get_frame(39, 2),
        roundshield_3: get_frame(40, 2),

        // Item - Ring
        ring_0: get_frame(43, 6),
        ring_1: get_frame(44, 6),
        ring_2: get_frame(45, 6),
        ring_3: get_frame(46, 6),

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
