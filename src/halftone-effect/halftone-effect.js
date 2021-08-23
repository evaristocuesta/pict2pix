import ParticleFactory from "../particle-factory";
import { mapImage, reduceImage } from "../utils/image-utils";

export default class HalftoneEffect {

    #config;
    #particlesArray = [];

    constructor(config) {
        this.#config = config;
        this.#config.maxWidth = this.#config.image.width;
        this.#config.maxHeight = this.#config.image.height;
        const imageData = reduceImage(this.#config.image, this.#config.particleSize);
        const mappedImage = mapImage(imageData, imageData.width, imageData.height);
        this.createParticlesFromMappedImage(mappedImage, imageData.width, imageData.height);
    }

    createParticlesFromMappedImage(mappedImage) {
        console.log(mappedImage);
        const shift = this.#config.particleSize / 2;
        for (var y = 0; y < mappedImage.length; y++) {
            for (var x = 0; x < mappedImage[y].length; x++) {
                if (mappedImage[y][x].alpha > 128) {
                    let particle = ParticleFactory.createParticle(this.#config, { 
                        x: x * this.#config.particleSize + shift, 
                        y: y * this.#config.particleSize + shift, 
                        color: 'rgb(30, 30, 30)', 
                        size: this.#config.particleSize * (2.55 - mappedImage[y][x].brightness) / 2
                    });
                    this.#particlesArray.push(particle);
                }
            }
        }
    }

    update(deltaTime) {
        
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(ctx);
        }
    }
}