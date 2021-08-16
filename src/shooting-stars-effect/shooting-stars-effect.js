import ParticleFactory from "../particle-factory";
import { mapImage } from "../utils/image-utils";

export default class ShootingStars {

    #config;
    #particlesArray = [];

    constructor(config) {
        this.#config = config;

        let canvas = document.createElement('canvas');
        canvas.width = this.#config.image.width;
        canvas.height = this.#config.image.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.#config.image, 0, 0, this.#config.image.width, this.#config.image.height);
        const pixels = ctx.getImageData(0, 0, this.#config.image.width, this.#config.image.height);

        this.#config.numberOfParticles = this.#config.numberOfParticles || 3000;
        this.#config.maxWidth = this.#config.image.width;
        this.#config.maxHeight = this.#config.image.height;
        this.#config.mappedImage = mapImage(pixels, this.#config.maxWidth, this.#config.maxHeight);
        this.#config.verticalSpeed = config.verticalSpeed ?? 1;
        this.#config.horizontalSpeed = config.horizontalSpeed ?? 1;

        for (let i = 0; i < this.#config.numberOfParticles; i++){
            this.#particlesArray.push(ParticleFactory.createParticle(config));
        }
    }

    update(deltaTime) {
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].update(deltaTime);
        }
    }

    draw(ctx) {
        ctx.globalAlpha = 0.01;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(ctx);
        }
    }
}