import ParticleFactory from "../particle-factory";
import LedMatrixStateFactory from "./led-matrix-state-factory";

export default class LedMatrixEffect {
    
    #config;
    #particlesArray = [];
    #state;
    
    constructor(config) {
        this.#config = config;
        this.#config.speed = config.speed ? (config.speed >= 1 && config.speed <= 10 ? config.speed : 8) : 8;
        this.#config.transitionTime = config.transitionTime ?? 8000;
        const imageData = this.reduceImage(this.#config.image);
        
        this.createParticlesFromImage(imageData, config);
        this.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));
    }

    setState(state) {
        this.#state = state;
        this.#state.setLedMatrixEffect(this);
    }

    createParticlesFromImage(imageData, config) {
        for (var y = 0; y < imageData.height; y++) {
            for (var x = 0; x < imageData.width; x++) {
                if (imageData.data[(y * 4 * imageData.width) + (x * 4) + 3] > 128) {
                    let color = "rgb(" + imageData.data[(y * 4 * imageData.width) + (x * 4)]
                        + "," + imageData.data[(y * 4 * imageData.width) + (x * 4) + 1]
                        + "," + imageData.data[(y * 4 * imageData.width) + (x * 4) + 2] + ")";
                    let particle = ParticleFactory.createParticle(config, { x: x * 4, y: y * 4, color: color });
                    this.#particlesArray.push(particle);

                }
            }
        }
    }

    reduceImage(image) {
        const tempCanvas = document.createElement('canvas');
        const smallWidth = image.width / 4;
        const smallHeight = image.height / 4;
        tempCanvas.width = smallWidth;
        tempCanvas.height = smallHeight;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(image, 0, 0, smallWidth, smallHeight);
        const imageData = tempCtx.getImageData(0, 0, smallWidth, smallHeight);
        return imageData;
    }

    update(deltaTime) {
        this.#state.update(deltaTime);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.#config.image.width, this.#config.image.height);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(ctx);
        }
    }
}