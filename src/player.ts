import { Color, Engine, Input, ImageSource, vec } from 'excalibur';
import { Mob } from './mob';
import { lerp } from './util';

export class Player extends Mob {
    private _tpCounter = 0;

    constructor(x: number, y: number) {
        super(x, y);
        this._setName('Player');
        this.setState(this.defaultState);
        this.setSprite(new ImageSource('/spr_ghost_strip8.png'));
    }

    public processInput(engine: Engine) {
        const controllerX =
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) -
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowLeft));
        const controllerY =
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) -
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowUp));

        this.move = vec(controllerX, controllerY).normalize();
        if (controllerY === 0) this.move.y = 0;
        if (controllerX === 0) this.move.x = 0;
    }

    public defaultState(engine: Engine, delta: number): void {
        if (this.initState) {
            this.color = Color.Cyan;
            this.accel = 3;
            this.frict = 0.85;
            this.maxSpeed = 30;
            this.initState = false;
        }
        if (this.sprite)
            this.sprite.opacity = lerp(this.sprite.opacity, 1, 0.4);
        this.processInput(engine);
        this.commitMovement(engine, delta);

        if (engine.input.keyboard.wasPressed(Input.Keys.Z))
            this.setState(this.teleportState);
    }

    public teleportState(engine: Engine, delta: number): void {
        if (this.initState) {
            this.color = Color.fromHex('#2a2a2a');
            this.accel = 10;
            this.frict = 1;
            this.maxSpeed = 80;
            this._tpCounter = 15;
            this.initState = false;
        }
        if (this.sprite)
            this.sprite.opacity = lerp(this.sprite.opacity, 0, 0.4);
        this.processInput(engine);
        this.commitMovement(engine, delta);

        this._tpCounter--;
        if (
            this._tpCounter <= 0 ||
            engine.input.keyboard.wasPressed(Input.Keys.Z)
        )
            this.setState(this.defaultState);
    }
}
