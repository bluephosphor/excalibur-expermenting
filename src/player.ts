import { Actor, Color, Engine, Input, vec, Vector } from 'excalibur';
import { Game } from './main';

export class Player extends Actor {
    
    public maxSpeed: number;

    constructor(x: number, y: number) {
        super({
            name: 'player',
            width: 32,
            height: 32,
            color: Color.Red,
            pos: vec(x, y)
        });
        this.maxSpeed = 30;
        Game.add(this);
    }

    public update(engine: Engine, delta: number) {
        super.update(engine, delta);
        
        const controllerX = Number(engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) - Number(engine.input.keyboard.isHeld(Input.Keys.ArrowLeft));
        const controllerY = Number(engine.input.keyboard.isHeld(Input.Keys.ArrowDown))  - Number(engine.input.keyboard.isHeld(Input.Keys.ArrowUp));

        const di = new Vector(controllerX, controllerY).normalize();

        this.vel = new Vector(
            (controllerX === 0) ?  0 : (this.maxSpeed * delta) * di.x,
            (controllerY === 0) ?  0 : (this.maxSpeed * delta) * di.y
        )
    }
}
