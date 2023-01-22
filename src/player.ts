import { Color, Engine, Input, vec } from 'excalibur';
import { Mob } from './mob';

export class Player extends Mob {
    private _tpCounter = 0;

    constructor(x: number, y: number) {
        super(x, y);
        this._setName('Player');
        this.setState(this.defaultState);
    }

    public processInput(engine: Engine) {
        const controllerX =
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) -
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowLeft));
        const controllerY =
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) -
            Number(engine.input.keyboard.isHeld(Input.Keys.ArrowUp));

        this.move = vec(controllerX, controllerY).normalize();
        if (controllerX === 0) this.move.x = 0;
        if (controllerY === 0) this.move.y = 0;
    }

    public defaultState(engine: Engine, delta: number): void {
        if (this.initState) {
            this.color = Color.Cyan;
            this.accel = 5;
            this.frict = 0.85;
            this.maxSpeed = 30;
            this.initState = false;
        }

        this.processInput(engine);
        this.commitMovement(engine, delta);

        if (engine.input.keyboard.wasPressed(Input.Keys.Z))
            this.setState(this.teleportState);
    }

    public teleportState(engine: Engine, delta: number): void {
        if (this.initState) {
            this.color = Color.fromHex('#1a1a1a');
            this.accel = 10;
            this.frict = 1;
            this.maxSpeed = 100;
            this._tpCounter = 15;
            this.initState = false;
        }

        this.processInput(engine);
        this.commitMovement(engine, delta);

        this._tpCounter--;
        if (this._tpCounter <= 0) this.setState(this.defaultState);
    }
}
