import LedMatrixGoingPointState from './led-matrix-going-point-state';

export default class LedMatrixStateFactory {
    #states;

    constructor()
    {
        this.#states = {
            'point': (config, particles) => new LedMatrixGoingPointState(config, particles)
        }
    }

    createLedMatrixState(config, particles) {
        return this.#states[config.type]?.(config, particles) ?? new LedMatrixGoingPointState(config, particles);
    }
}