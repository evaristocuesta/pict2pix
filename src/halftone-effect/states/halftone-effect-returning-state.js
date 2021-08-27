import HalftoneEffectStateFactory from "./halftone-effect-state-factory";
import HalftoneEffectBaseState from "./halftone-effect-base-state";

export default class HalftoneEffectReturningState extends HalftoneEffectBaseState {
    #config;
    #particlesArray;
    #accumulatedTime = 0;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        for (let i = 0; i < this.#particlesArray.length; i++) {
            this.#particlesArray[i].setTransitionTime(this.#config.transitionTime);
            this.#particlesArray[i].setFromOrigin();
            this.#particlesArray[i].setTo(this.#particlesArray[i].getOriginalX() * 10, this.#particlesArray[i].getOriginalY() * 10);
        }
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            this.halftoneEffect.setState(HalftoneEffectStateFactory.createHalftoneEffectState('going', this.#config, this.#particlesArray));            
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++){
                this.#particlesArray[i].update(this.#accumulatedTime, this.#config.transitionTime);
            }
        }
    }
}