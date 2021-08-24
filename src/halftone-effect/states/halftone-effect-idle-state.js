import HalftoneEffectStateFactory from "./halftone-effect-state-factory";
import HalftoneEffectBaseState from "./halftone-effect-base-state";

export default class HalftoneEffectIdleState extends HalftoneEffectBaseState {
    #config;
    #particlesArray;
    #accumulatedTime = 0;

    constructor(config, particles) {
        super();
        this.#config = config;
        this.#particlesArray = particles;
    }

    update(deltaTime) {
        this.#accumulatedTime += deltaTime;
        if (this.#accumulatedTime > this.#config.transitionTime) {
            // for (let i = 0; i < this.#particlesArray.length; i++){
            //     this.#particlesArray[i].setPos(this.#particlesArray[i].getOriginalX(), this.#particlesArray[i].getOriginalY());
            // }
            this.halftoneEffect.setState(HalftoneEffectStateFactory.createHalftoneEffectState('going', this.#config, this.#particlesArray));            
        }
        else {
            for (let i = 0; i < this.#particlesArray.length; i++){
                //this.#particlesArray[i].update(this.#accumulatedTime, this.#config.transitionTime);
            }
        }
    }
}