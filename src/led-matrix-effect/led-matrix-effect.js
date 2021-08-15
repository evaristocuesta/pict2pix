import ParticleFactory from "../particle-factory";
import LedMatrixStateFactory from "./led-matrix-state-factory";

export default class LedMatrixEffect {
    
    #config;
    #particlesArray = [];
    #state;
    #factor;
    
    constructor(config) {
        this.#config = config;
        this.#config.maxWidth = this.#config.image.width;
        this.#config.maxHeight = this.#config.image.height;
        this.#config.transitionTime = config.transitionTime ?? 2000;
        this.#config.idleTime = config.idleTime ?? 5000;
        this.#factor = this.#config.maxWidth * this.#config.maxHeight / 5000;
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
                const posX = x * 4;
                const posY = y * 4;
                const row = posY * imageData.width;
                if (imageData.data[row + posX + 3] > 128) {
                    let color = "rgb(" + imageData.data[row + posX]
                        + "," + imageData.data[row + posX + 1]
                        + "," + imageData.data[row + posX + 2] + ")";
                    let particle = ParticleFactory.createParticle(config, { x: posX + 2, y: posY + 2, color: color });
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
        ctx.clearRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(ctx);
        }
    }
}