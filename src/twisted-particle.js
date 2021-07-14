import StraightParticle from "./straight-particle";

export default class TwistedParticle extends StraightParticle {
    #angle = 0;

    update(deltaTime) {
        super.update(deltaTime);
        this.#angle += this.speed / 20;
        this.y += Math.sin(this.#angle);
        this.x += Math.cos(this.#angle);
    }
}