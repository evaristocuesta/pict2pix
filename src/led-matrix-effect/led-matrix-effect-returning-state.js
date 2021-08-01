import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixEffectIdleState from "./led-matrix-effect-idle-state";

export default class LedMatrixEffectReturningState extends LedMatrixEffectBaseState {
    
    #config;

    constructor(config) {
        super();
        this.#config = config;
    }

    update(deltaTime, particlesArray) {
        let finished = true;
        for (let i = 0; i < particlesArray.length; i++){
            let particleIdle = particlesArray[i].update(deltaTime, 1);
            finished = finished && particleIdle;
        }
        if (finished) {
            this.ledMatrixEffect.setState(new LedMatrixEffectIdleState(this.#config));
        }
    }
}