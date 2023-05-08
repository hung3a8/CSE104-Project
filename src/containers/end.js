import * as PIXI from "../../include/pixi.mjs";
import { BaseContainer } from "./base.js";

export class EndContainer extends BaseContainer {
    constructor({
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        gameContainer = null,
    }) {
        super({ x, y, width, height });
        this.gameContainer = gameContainer;

        // Create text in the middle name Start
        const style = new PIXI.TextStyle({
            fontFamily: 'BitPotion',
            fontSize: 128,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'],
            stroke: '#000000',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });

        const startText = new PIXI.Text('F5 To Play Again', style);
        startText.anchor.set(0.5);
        startText.x = this.width / 2;
        startText.y = this.height / 2 + 128;
        this.addChild(startText);

        // Create game name above the start button named "WeirdRPG"
        const gameNameStyle = new PIXI.TextStyle({
            fontFamily: 'BitPotion',
            fontSize: 256,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'],
            stroke: '#000000',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });

        const gameNameText = new PIXI.Text('The End', gameNameStyle);
        gameNameText.anchor.set(0.5);
        gameNameText.x = this.width / 2;
        gameNameText.y = this.height / 2 - 128;
        this.addChild(gameNameText);
    }

    setToGame(toGameFunction) {
        this.toGameFunction = toGameFunction;
    }
}
