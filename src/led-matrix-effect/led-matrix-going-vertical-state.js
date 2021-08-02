import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";

export default class LedMatrixGoingVerticalState extends LedMatrixEffectBaseState {
    
    #config;
    #particlesArray;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].setTarget(0, this.#particlesArray[i].getOriginalY());
        }
    }

    update(deltaTime) {
        let finished = true;
        for (let i = 0; i < this.#particlesArray.length; i++){
            let particleIdle = this.#particlesArray[i].update(deltaTime, 2);
            finished = finished && particleIdle;
        }
        if (finished) {
            this.ledMatrixEffect.setState(factory.createLedMatrixState('returning', this.#config, this.#particlesArray));            
        }
    }
}