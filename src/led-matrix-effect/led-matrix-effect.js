import ParticleFactory from "../particle-factory";
import LedMatrixStateFactory from "./led-matrix-state-factory";

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
        const imageData = this.reduceImage(this.#config.image);
        this.createParticlesFromImage(imageData, config);
        this.setState(LedMatrixStateFactory.createLedMatrixState('returning', this.#config, this.#particlesArray));
    }

    setState(state) {
        this.#state = state;
        this.#state.setLedMatrixEffect(this);
    }

    createParticlesFromImage(imageData, config) {
        const factor = this.#config.ledSize / 4;
        const shift = this.#config.ledSize / 2;
        for (var y = 0; y < imageData.height; y++) {
            const posY = y * 4;
            const row = posY * imageData.width;
            for (var x = 0; x < imageData.width; x++) {
                const posX = x * 4;
                if (imageData.data[row + posX + 3] > 128) {
                    let color = "rgb(" + imageData.data[row + posX]
                        + "," + imageData.data[row + posX + 1]
                        + "," + imageData.data[row + posX + 2] + ")";
                    let particle = ParticleFactory.createParticle(config, { x: posX * factor + shift, y: posY * factor + shift, color: color, ledSize: this.#config.ledSize });
                    this.#particlesArray.push(particle);
                }
            }
        }
    }

    reduceImage(image) {
        const tempCanvas = document.createElement('canvas');
        const smallWidth = image.width / this.#config.ledSize;
        const smallHeight = image.height / this.#config.ledSize;
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