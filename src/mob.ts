import { Actor, CollisionType, Color, Engine, Input, vec } from "excalibur";
import { Game } from "./main";

export class Mob extends Actor {

    public accel = 5;
    public frict = 0.85;
    public maxSpeed = 30;
    public move = vec(0,0);

    constructor(x: number, y: number) {
        super({
            name: 'player',
            radius: 16,
            color: Color.Red,
            pos: vec(x, y),
            collisionType: CollisionType.Active
        });
        Game.add(this);
    }

    private _commitMovement(delta: number){
        this.vel.x += (this.accel * delta) * this.move.x;
        this.vel.y += (this.accel * delta) * this.move.y;
        
        this.vel.clampMagnitude(this.maxSpeed * delta);

        if (this.move.x === 0) this.vel.x *= this.frict;
        if (this.move.y === 0) this.vel.y *= this.frict;
    }

    public update(engine: Engine, delta: number) {
        super.update(engine, delta);

        this._commitMovement(delta);
    }

}