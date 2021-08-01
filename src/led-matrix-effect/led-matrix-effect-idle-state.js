import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixEffectGoingState from "./led-matrix-effect-going-state";

export default class LedMatrixEffectIdleState extends LedMatrixEffectBaseState {
    
    #accumulatedTime = 0;
    #config;

    constructor(config) {
        super();
        this.#config = config;
    }

    update(deltaTime, particlesArray) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > 8000) {
            const x = Math.random() * this.#config.image.width;
            const y = Math.random() * this.#config.image.height;
            for (let i = 0; i < particlesArray.length; i++){
                particlesArray[i].setTarget(x, y);
            }
            this.ledMatrixEffect.setState(new LedMatrixEffectGoingState(this.#config));
        }
    }
}