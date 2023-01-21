import { Color, Engine } from "excalibur";
import { Player } from "./player";

export const Game = new Engine({
    width: 800,
    height: 600,
    backgroundColor: Color.Black
})

const player = new Player(Game.halfDrawWidth, Game.halfDrawHeight);

Game.start();