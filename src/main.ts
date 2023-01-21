import { Color, Engine } from 'excalibur';
import { Player } from './player';
import { Wall } from './wall';

export const Game = new Engine({
    width: 800,
    height: 600,
    backgroundColor: Color.Black,
});

new Player(Game.halfDrawWidth, Game.halfDrawHeight);
new Wall(16,300, 32, 600);
new Wall(300,300, 128, 32);

const diag = new Wall(400,400, 256, 16);

diag.on("postupdate", () => {
    diag.rotation += 0.01;
})


Game.start();
