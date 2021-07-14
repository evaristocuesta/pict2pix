import StraightParticle from "./straight-particle";
import TwistedParticle from "./twisted-particle";

export default class ParticleFactory {
    #particles;

    constructor()
    {
        this.#particles = {
            'straight-particle': (props) => new StraightParticle(),
            'twisted-particle': (props) => new TwistedParticle()
        }
    }

    createParticle(type, props) {
        return this.#particles[type]?.(props) ?? new StraightParticle();
    }
}