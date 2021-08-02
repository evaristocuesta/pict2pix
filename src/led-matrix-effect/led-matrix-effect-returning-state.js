import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";

export default class LedMatrixEffectReturningState extends LedMatrixEffectBaseState {
    
    #config;
    #particlesArray;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].setTargetToOrigin();
        }
    }

    update(deltaTime) {
        let finished = true;
        for (let i = 0; i < this.#particlesArray.length; i++){
            let particleIdle = this.#particlesArray[i].update(deltaTime, 1);
            finished = finished && particleIdle;
        }
        if (finished) {
            this.ledMatrixEffect.setState(factory.createLedMatrixState('idle', this.#config, this.#particlesArray));
        }
    }
}