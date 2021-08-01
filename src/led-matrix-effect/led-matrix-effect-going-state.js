import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixEffectReturningState from "./led-matrix-effect-returning-state";

export default class LedMatrixEffectGoingState extends LedMatrixEffectBaseState {
    
    #config;

    constructor(config) {
        super();
        this.#config = config;
    }

    update(deltaTime, particlesArray) {
        let finished = true;
        for (let i = 0; i < particlesArray.length; i++){
            let particleIdle = particlesArray[i].update(deltaTime, 2);
            finished = finished && particleIdle;
        }
        if (finished) {
            for (let i = 0; i < particlesArray.length; i++){
                particlesArray[i].setTargetToOrigin();
            }
            this.ledMatrixEffect.setState(new LedMatrixEffectReturningState(this.#config));            
        }
    }
}