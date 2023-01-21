import { Actor, Color, Engine, Input, vec, Vector } from 'excalibur';
import { Game } from './main';
import { lerp } from './util';

export class Player extends Actor {
    
    public maxSpeed: number;
    public accel = 5;
    public frict = 0.85;

    constructor(x: number, y: number) {
        super({
            name: 'player',
            width: 32,
            height: 32,
            color: Color.Red,
            pos: vec(x, y),
        });
        this.maxSpeed = 30;
        this.motion.inertia = 10;
        Game.add(this);
    }

    public update(engine: Engine, delta: number) {
        super.update(engine, delta);
        
        const controllerX = Number(engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) - Number(engine.input.keyboard.isHeld(Input.Keys.ArrowLeft));
        const controllerY = Number(engine.input.keyboard.isHeld(Input.Keys.ArrowDown))  - Number(engine.input.keyboard.isHeld(Input.Keys.ArrowUp));

        const di = vec(controllerX, controllerY).normalize();
        if (controllerX === 0) di.x = 0;
        if (controllerY === 0) di.y = 0;

        this.vel.x += (this.accel * delta) * di.x;
        this.vel.y += (this.accel * delta) * di.y;
        
        this.vel.clampMagnitude(this.maxSpeed * delta);

        if (controllerX === 0) this.vel.x *= this.frict;
        if (controllerY === 0) this.vel.y *= this.frict;
    }
}
