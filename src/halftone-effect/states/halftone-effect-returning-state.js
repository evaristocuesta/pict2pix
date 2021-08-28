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
            this.#particlesArray[i].setFromOrigin();
            this.#particlesArray[i].setTo(this.#particlesArray[i].getOriginalX() * this.#config.separation, this.#particlesArray[i].getOriginalY() * this.#config.separation);
        }
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            this.halftoneEffect.setState(HalftoneEffectStateFactory.createHalftoneEffectState('going', this.#config, this.#particlesArray));            
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++) {
                const time = this.#accumulatedTime / this.#config.transitionTime;
                const x = -this.#particlesArray[i].getDx() * (Math.sqrt(1 - time * time) - 1) + this.#particlesArray[i].getFromX();
                const y = -this.#particlesArray[i].getDy() * (Math.sqrt(1 - time * time) - 1) + this.#particlesArray[i].getFromY();
                this.#particlesArray[i].setPos(x, y);
            }
        }
    }
}