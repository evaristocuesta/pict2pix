import HalftoneEffectStateFactory from "./halftone-effect-state-factory";
import HalftoneEffectBaseState from "./halftone-effect-base-state";

export default class HalftoneEffectIdleState extends HalftoneEffectBaseState {
    #config;
    #particlesArray;
    #accumulatedTime = 0;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.idleTime) {
            this.halftoneEffect.setState(HalftoneEffectStateFactory.createHalftoneEffectState('returning', this.#config, this.#particlesArray));            
        }
    }
}