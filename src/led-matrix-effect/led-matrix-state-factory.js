import LedMatrixGoingPointState from './led-matrix-going-point-state';
import LedMatrixGoingHorizontalState from './led-matrix-going-horizontal-state';
import LedMatrixGoingVerticalState from './led-matrix-going-vertical-state';
import LedMatrixEffectReturningState from './led-matrix-effect-returning-state';
import LedMatrixEffectIdleState from './led-matrix-effect-idle-state';

export default class LedMatrixStateFactory {
    static #states = {
            'point': (config, particles) => new LedMatrixGoingPointState(config, particles),
            'horizontal': (config, particles) => new LedMatrixGoingHorizontalState(config, particles),
            'vertical': (config, particles) => new LedMatrixGoingVerticalState(config, particles),
            'returning': (config, particles) => new LedMatrixEffectReturningState(config, particles),
            'idle': (config, particles) => new LedMatrixEffectIdleState(config, particles)
    }

    static createLedMatrixState(state, config, particles) {
        let key;
        if (state === 'random') {
            key = LedMatrixStateFactory.getRandomState();
        }
        else {
            key = state;
        }
        return LedMatrixStateFactory.#states[key]?.(config, particles) ?? new LedMatrixGoingPointState(config, particles);
    }

    static getRandomState() {
        const pos = Math.floor(Math.random() * 3); // Only the the three first are random states
        return Object.keys(LedMatrixStateFactory.#states)[pos];
    }

}