import HalftoneEffectGoingState from "./halftone-effect-going-state";
import HalftoneEffectIdleState from "./halftone-effect-idle-state";

export default class HalftoneEffectStateFactory {
    static #states = {
            'going': (config, particles) => new HalftoneEffectGoingState(config, particles), 
            'idle': (config, particles) => new HalftoneEffectIdleState(config, particles)
    }

    static createHalftoneEffectState(state, config, particles) {
        let key;
        if (state === 'random') {
            key = HalftoneEffectStateFactory.getRandomState();
        }
        else {
            key = state;
        }
        return HalftoneEffectStateFactory.#states[key]?.(config, particles) ?? new HalftoneEffectGoingPointState(config, particles);
    }

    static getRandomState() {
        const pos = Math.floor(Math.random() * 3); // Only the the three first are random states
        return Object.keys(HalftoneEffectStateFactory.#states)[pos];
    }

}