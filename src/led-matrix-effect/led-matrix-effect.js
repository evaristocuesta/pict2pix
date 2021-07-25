import ParticleFactory from "../particle-factory";

export default class LedMatrixEffect {
    
    #config;
    #particlesArray = [];
    
    constructor(config) {
        this.#config = config;

        const imageData = this.reduceImage(this.#config.image);
        
        this.createParticlesFromImage(imageData, config);
    }

    createParticlesFromImage(imageData, config) {
        const factory = new ParticleFactory();
        for (var y = 0; y < imageData.height; y++) {
            for (var x = 0; x < imageData.width; x++) {
                if (imageData.data[(y * 4 * imageData.width) + (x * 4) + 3] > 128) {
                    let color = "rgb(" + imageData.data[(y * 4 * imageData.width) + (x * 4)]
                        + "," + imageData.data[(y * 4 * imageData.width) + (x * 4) + 1]
                        + "," + imageData.data[(y * 4 * imageData.width) + (x * 4) + 2] + ")";
                    let particle = factory.createParticle(config, { x: x * 4, y: y * 4, color: color });
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
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].update(deltaTime);
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.#config.image.width, this.#config.image.height);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(ctx);
        }
    }
}