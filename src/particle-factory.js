import StraightParticle from "./shooting-stars-effect/straight-particle";
import TwistedParticle from "./shooting-stars-effect/twisted-particle";

export default class ParticleFactory {
    #particles;

    constructor()
    {
        this.#particles = {
            'straight-particle': (config) => new StraightParticle(config),
            'twisted-particle': (config) => new TwistedParticle(config)
        }
    }

    createParticle(config) {
        return this.#particles[config.particleType]?.(config) ?? new StraightParticle();
    }
}