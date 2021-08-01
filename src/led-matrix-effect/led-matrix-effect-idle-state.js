import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixEffectGoingState from "./led-matrix-effect-going-state";

export default class LedMatrixEffectIdleState extends LedMatrixEffectBaseState {
    
    #accumulatedTime = 0;
    #config;
    #particlesArray;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > 8000) {
            this.ledMatrixEffect.setState(new LedMatrixEffectGoingState(this.#config, this.#particlesArray));
        }
    }
}