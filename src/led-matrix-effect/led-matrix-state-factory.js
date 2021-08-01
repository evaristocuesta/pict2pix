import LedMatrixGoingPointState from './led-matrix-going-point-state';
import LedMatrixGoingHorizontalState from './led-matrix-going-horizontal-state';
import LedMatrixGoingVerticalState from './led-matrix-going-vertical-state';

export default class LedMatrixStateFactory {
    #states;

    constructor()
    {
        this.#states = {
            'point': (config, particles) => new LedMatrixGoingPointState(config, particles),
            'horizontal': (config, particles) => new LedMatrixGoingHorizontalState(config, particles),
            'vertical': (config, particles) => new LedMatrixGoingVerticalState(config, particles)
        }
    }

    createLedMatrixState(config, particles) {
        let key;
        if (config.type === 'random') {
            key = this.getRandomState();
        }
        else {
            key = config.type;
        }
        return this.#states[key]?.(config, particles) ?? new LedMatrixGoingPointState(config, particles);
    }

    getRandomState() {
        const pos = Math.floor(Math.random() * Object.keys(this.#states).length);
        return Object.keys(this.#states)[pos];
    }

}