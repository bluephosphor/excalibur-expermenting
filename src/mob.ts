import { Actor, CollisionType, Color, Engine, ImageSource, Sprite, vec } from 'excalibur';
import { Game } from './main';

export type State = (engine: Engine, delta: number) => void;

export class Mob extends Actor {
    public accel = 5;
    public frict = 0.85;
    public maxSpeed = 30;
    public move = vec(0, 0);
    public initState: boolean;
    public sprite: Sprite | undefined;
    public state: State;

    constructor(x: number, y: number) {
        super({
            name: 'mob',
            radius: 16,
            color: Color.Red,
            pos: vec(x, y),
            collisionType: CollisionType.Active,
        });
        this.initState = false;
        this.state = this.defaultState;
        Game.add(this);
    }

    public setState(state: State) {
        this.initState = true;
        this.state = state;
    }

    public setSprite(img: ImageSource) {
        img.load();
        this.sprite = new Sprite({
            image: img,
            sourceView: {
                x: 0,
                y: 0,
                width: 32,
                height: 32,
            },
            destSize: {
                width: 64,
                height: 64,
            },
        });
        this.graphics.use(this.sprite);
    }

    public defaultState(engine: Engine, delta: number) {
        if (this.initState) {
            this.accel = 5;
            this.frict = 0.85;
            this.maxSpeed = 30;
            this.initState = false;
        }
        this.commitMovement(engine, delta);
    }

    public commitMovement(engine: Engine, delta: number) {
        if (this.move.x === 0) {
            this.vel.x *= this.frict;
        } else {
            this.vel.x += this.accel * delta * this.move.x;
            if (this.sprite)
                this.sprite.scale.x = Math.sign(this.vel.x);
        }

        if (this.move.y === 0) {
            this.vel.y *= this.frict;
        } else {
            this.vel.y += this.accel * delta * this.move.y;
        }
        this.vel.clampMagnitude(this.maxSpeed * delta);
    }

    public update(engine: Engine, delta: number) {
        this.state(engine, delta);
        super.update(engine, delta);
    }
}
