import ShootingStars from "./shooting-stars-effect/shooting-stars-effect";
import LedMatrixEffect from "./led-matrix-effect/led-matrix-effect";

export default class EffectFactory {
    #effects;

    constructor()
    {
        this.#effects = {
            'straight-particle': (config) => new ShootingStars(config),
            'twisted-particle': (config) => new ShootingStars(config),
            'led-matrix': (config) => new LedMatrixEffect(config)
        }
    }

    createParticle(config) {
        return this.#effects[config.particleType]?.(config) ?? new ShootingStars(config);
    }
}