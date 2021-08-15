import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixStateFactory from "./led-matrix-state-factory";

export default class LedMatrixGoingPointState extends LedMatrixEffectBaseState {
    
    #config;
    #particlesArray;
    #accumulatedTime = 0;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        const x = Math.random() * this.#config.maxWidth;
        const y = Math.random() * this.#config.maxHeight;
        for (let i = 0; i < this.#particlesArray.length; i++) {
            this.#particlesArray[i].setTransitionTime(this.#config.transitionTime);
            this.#particlesArray[i].setFromPos();
            this.#particlesArray[i].setTo(x, y);
        }
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            this.ledMatrixEffect.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));                        
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++){
                this.#particlesArray[i].update(this.#accumulatedTime, this.#config.transitionTime);
            }
        }
    }
}