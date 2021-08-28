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
            this.#particlesArray[i].setFrom(this.#particlesArray[i].getOriginalX() * this.#config.separation, this.#particlesArray[i].getOriginalY() * this.#config.separation);
            this.#particlesArray[i].setToOrigin();
        }
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            this.halftoneEffect.setState(HalftoneEffectStateFactory.createHalftoneEffectState('idle', this.#config, this.#particlesArray));            
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++){
                const time = this.#accumulatedTime / this.#config.transitionTime - 1;
                const x = this.#particlesArray[i].getDx() * Math.sqrt(1 - time * time * time * time) + this.#particlesArray[i].getFromX();
                const y = this.#particlesArray[i].getDy() * Math.sqrt(1 - time * time * time * time) + this.#particlesArray[i].getFromY();
                this.#particlesArray[i].setPos(x, y);
            }
        }
    }
}