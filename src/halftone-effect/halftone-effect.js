import ParticleFactory from "../particle-factory";
import { mapImage, reduceImage } from "../utils/image-utils";
import HaltoneEffectStateFactory from "./states/halftone-effect-state-factory";

export default class HalftoneEffect {

    #config;
    #particlesArray = [];
    #state;

    constructor(config) {
        this.#config = config;
        this.#config.maxWidth = this.#config.image.width;
        this.#config.maxHeight = this.#config.image.height;
        this.#config.dotSize = config.dotSize ? (config.dotSize >= 4 ? config.dotSize : 4) : 4;
        this.#config.transitionTime = config.transitionTime ?? 8000;
        this.#config.idleTime = config.idleTime ?? 4000;
        this.#config.color = config.color ?? 'rgb(30, 30, 30)';
        this.#config.separation = config.separation ? (config.separation >= 1 ? config.separation : 10) : 10;
        const imageData = reduceImage(this.#config.image, this.#config.dotSize);
        this.#config.mappedImage = mapImage(imageData, imageData.width, imageData.height);
        this.createParticlesFromMappedImage();
        this.setState(HaltoneEffectStateFactory.createHalftoneEffectState('going', this.#config, this.#particlesArray));
    }

    setState(state) {
        this.#state = state;
        this.#state.setHalftoneEffect(this);
    }

    createParticlesFromMappedImage() {
        const shift = this.#config.dotSize / 2;
        for (var y = 0; y < this.#config.mappedImage.length; y++) {
            for (var x = 0; x < this.#config.mappedImage[y].length; x++) {
                if (this.#config.mappedImage[y][x].alpha > 128) {
                    let particle = ParticleFactory.createParticle(this.#config, { 
                        x: x * this.#config.dotSize + shift, 
                        y: y * this.#config.dotSize + shift, 
                        color: this.#config.color, 
                        size: this.#config.dotSize * (2.55 - this.#config.mappedImage[y][x].brightness) / 2
                    });
                    this.#particlesArray.push(particle);
                }
            }
        }
    }

    update(deltaTime) {
        this.#state.update(deltaTime);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(ctx);
        }
    }
}