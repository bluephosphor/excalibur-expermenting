import { Engine, Input, vec } from 'excalibur';
import { Mob } from './mob';

export class Player extends Mob {
    private _processInput(engine: Engine) {
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

    public update(engine: Engine, delta: number): void {
        this._processInput(engine);
        super.update(engine, delta);
    }
}
