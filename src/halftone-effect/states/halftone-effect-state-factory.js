import HalftoneEffectGoingState from "./halftone-effect-going-state";
import HalftoneEffectIdleState from "./halftone-effect-idle-state";
import HalftoneEffectReturningState from "./halftone-effect-returning-state";

export default class HalftoneEffectStateFactory {
    static #states = {
            'going': (config, particles) => new HalftoneEffectGoingState(config, particles), 
            'idle': (config, particles) => new HalftoneEffectIdleState(config, particles), 
            'returning': (config, particles) => new HalftoneEffectReturningState(config, particles)
    }

    static createHalftoneEffectState(state, config, particles) {
        return HalftoneEffectStateFactory.#states[state]?.(config, particles) ?? new HalftoneEffectGoingPointState(config, particles);
    }
}