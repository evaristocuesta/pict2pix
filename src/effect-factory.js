import ShootingStars from "./shooting-stars-effect/shooting-stars-effect";
import LedMatrixEffect from "./led-matrix-effect/led-matrix-effect";
import HalftoneEffect from "./halftone-effect/halftone-effect";

export default class EffectFactory {
    static #effects = {
            'straight-particle': (config) => new ShootingStars(config),
            'twisted-particle': (config) => new ShootingStars(config),
            'led-matrix': (config) => new LedMatrixEffect(config),
            'halftone': (config) => new HalftoneEffect(config)
    }

    static createParticle(config) {
        return this.#effects[config.particleType]?.(config) ?? new ShootingStars(config);
    }
}