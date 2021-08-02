import LedMatrixStateFactory from "./led-matrix-state-factory";
import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";

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
            const factory = new LedMatrixStateFactory();
            this.ledMatrixEffect.setState(factory.createLedMatrixState(this.#config.type, this.#config, this.#particlesArray));
        }
    }
}