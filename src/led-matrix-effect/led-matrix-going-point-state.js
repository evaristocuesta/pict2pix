import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixStateFactory from "./led-matrix-state-factory";

export default class LedMatrixGoingPointState extends LedMatrixEffectBaseState {
    
    #config;
    #particlesArray;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        const x = Math.random() * this.#config.image.width;
        const y = Math.random() * this.#config.image.height;
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].setTarget(x, y);
        }
    }

    update(deltaTime) {
        let finished = true;
        for (let i = 0; i < this.#particlesArray.length; i++){
            let particleIdle = this.#particlesArray[i].update(deltaTime, 2);
            finished = finished && particleIdle;
        }
        if (finished) {
            this.ledMatrixEffect.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));            
        }
    }
}