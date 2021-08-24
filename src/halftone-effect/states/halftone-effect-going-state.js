import HalftoneEffectStateFactory from "./halftone-effect-state-factory";
import HalftoneEffectBaseState from "./halftone-effect-base-state";

export default class HalftoneEffectGoingState extends HalftoneEffectBaseState {
    #config;
    #particlesArray;
    #accumulatedTime = 0;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
        for (let i = 0; i < this.#particlesArray.length; i++) {
            this.#particlesArray[i].setTransitionTime(this.#config.transitionTime);
            this.#particlesArray[i].setFrom(this.#particlesArray[i].getOriginalX() * 5, this.#particlesArray[i].getOriginalY() * 5);
            this.#particlesArray[i].setToOrigin();
        }
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            for (let i = 0; i < this.#particlesArray.length; i++) {
                this.#particlesArray[i].setPos(this.#particlesArray[i].getOriginalX(), this.#particlesArray[i].getOriginalY());
            }
            this.halftoneEffect.setState(HalftoneEffectStateFactory.createHalftoneEffectState('idle', this.#config, this.#particlesArray));            
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++){
                this.#particlesArray[i].update(this.#accumulatedTime, this.#config.transitionTime);
            }
        }
    }
}