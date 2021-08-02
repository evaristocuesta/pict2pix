import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixStateFactory from "./led-matrix-state-factory";

export default class LedMatrixGoingHorizontalState extends LedMatrixEffectBaseState {
    
    #config;
    #particlesArray;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].setTarget(this.#particlesArray[i].getOriginalX(), 0);
        }
    }

    update(deltaTime) {
        let finished = true;
        for (let i = 0; i < this.#particlesArray.length; i++){
            let particleIdle = this.#particlesArray[i].update(deltaTime, 2);
            finished = finished && particleIdle;
        }
        if (finished) {
            for (let i = 0; i < this.#particlesArray.length; i++){
                this.#particlesArray[i].setPos(this.#particlesArray[i].getOriginalX(), this.#config.image.height - 1);
            }
            this.ledMatrixEffect.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));            
        }
    }
}