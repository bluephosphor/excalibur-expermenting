import { Actor, CollisionType, Color, Engine, Physics, vec } from 'excalibur';
import { Player } from './player';

Physics.useRealisticPhysics();

export const Game = new Engine({
    width: 800,
    height: 600,
    backgroundColor: Color.Black,
});

const wall = new Actor({
    x: 320,
    y: 480,
    width: 640,
    height: 32,
    color: Color.White,
    collisionType: CollisionType.Fixed,
});
Game.add(wall);

const player = new Player(Game.halfDrawWidth, Game.halfDrawHeight);

Game.start();
