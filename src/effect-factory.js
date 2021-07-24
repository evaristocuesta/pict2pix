import ShootingStars from "./shooting-stars-effect";

export default class EffectFactory {
    #effects;

    constructor()
    {
        this.#effects = {
            'straight-particle': (config) => new ShootingStars(config),
            'twisted-particle': (config) => new ShootingStars(config)
        }
    }

    createParticle(config) {
        return this.#effects[config.particleType]?.(config) ?? new ShootingStars(config);
    }
}