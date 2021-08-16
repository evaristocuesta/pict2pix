import ParticleFactory from "../particle-factory";
import LedMatrixStateFactory from "./led-matrix-state-factory";
import { mapImage, reduceImage } from "../utils/image-utils";

export default class LedMatrixEffect {
    
    #config;
    #particlesArray = [];
    #state;
    
    constructor(config) {
        this.#config = config;
        this.#config.maxWidth = this.#config.image.width;
        this.#config.maxHeight = this.#config.image.height;
        this.#config.transitionTime = config.transitionTime ?? 2000;
        this.#config.idleTime = config.idleTime ?? 5000;
        this.#config.ledSize = config.ledSize ? (config.ledSize >= 4 ? config.ledSize : 4) : 4;
        const imageData = reduceImage(this.#config.image, this.#config.ledSize);
        const mappedImage = mapImage(imageData, imageData.width, imageData.height);
        this.createParticlesFromMappedImage(mappedImage, imageData.width, imageData.height);
        this.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));
    }

    setState(state) {
        this.#state = state;
        this.#state.setLedMatrixEffect(this);
    }

    createParticlesFromMappedImage(mappedImage) {
        const shift = this.#config.ledSize / 2;
        for (var y = 0; y < mappedImage.length; y++) {
            for (var x = 0; x < mappedImage[y].length; x++) {
                if (mappedImage[y][x].alpha > 128) {
                    let color = mappedImage[y][x].color;
                    let particle = ParticleFactory.createParticle(this.#config, { 
                        x: x * this.#config.ledSize + shift, 
                        y: y * this.#config.ledSize + shift, 
                        color: color, 
                        ledSize: this.#config.ledSize 
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