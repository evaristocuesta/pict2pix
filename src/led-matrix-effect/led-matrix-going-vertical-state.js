import LedMatrixEffectBaseState from "./led-matrix-effect-base-state";
import LedMatrixStateFactory from "./led-matrix-state-factory";

export default class LedMatrixGoingVerticalState extends LedMatrixEffectBaseState {
    
    #config;
    #particlesArray;
    #accumulatedTime = 0;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        const pos = -1 * this.#config.ledSize / 2;
        for (let i = 0; i < this.#particlesArray.length; i++) {
            this.#particlesArray[i].setTransitionTime(this.#config.transitionTime);
            this.#particlesArray[i].setFromPos();
            this.#particlesArray[i].setTo(pos, this.#particlesArray[i].getOriginalY());
        }
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            for (let i = 0; i < this.#particlesArray.length; i++){
                this.#particlesArray[i].setPos(this.#config.maxWidth - 1, this.#particlesArray[i].getOriginalY());
            }
            this.ledMatrixEffect.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));            
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++){
                this.#particlesArray[i].update(this.#accumulatedTime, this.#config.transitionTime);
            }
        }
    }
}