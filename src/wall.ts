import { Actor, CollisionType, Color, vec } from "excalibur";
import { Game } from "./main";

export class Wall extends Actor {
    constructor(x: number, y: number, width: number, height: number){
        super({
            pos: vec(x,y),
            width: width,
            height: height,
            color: Color.White,
            collisionType: CollisionType.Fixed,
        });
        Game.add(this);
    }
}