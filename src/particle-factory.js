import DefaultLedParticle from "./led-matrix-effect/default-led-particle";
import StraightParticle from "./shooting-stars-effect/straight-particle";
import TwistedParticle from "./shooting-stars-effect/twisted-particle";
import DotHalftoneParticle from "./halftone-effect/dot-halftone-particle";

export default class ParticleFactory {
    static #particles = {
            'straight-particle': (config) => new StraightParticle(config),
            'twisted-particle': (config) => new TwistedParticle(config),
            'led-matrix': (config, props) => new DefaultLedParticle(config, props),
            'halftone': (config, props) => new DotHalftoneParticle(config, props)
    }

    static createParticle(config, props) {
        return this.#particles[config.particleType]?.(config, props) ?? new StraightParticle();
    }
}