import ParticleFactory from "./particle-factory";

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
        this.#config.mappedImage = this.mapImage(pixels);
        this.#config.verticalSpeed = config.verticalSpeed ?? 1;
        this.#config.horizontalSpeed = config.horizontalSpeed ?? 1;

        const factory = new ParticleFactory();
        for (let i = 0; i < this.#config.numberOfParticles; i++){
            this.#particlesArray.push(factory.createParticle(config));
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

    mapImage(pixels) {
        let mappedImage = [];
        for (let y = 0; y < this.#config.maxHeight; y++){
            let row = [];
            for (let x = 0; x < this.#config.maxWidth; x++){
                const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
                const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
                const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
                const brightness = this.calculateRelativeBrightness(red, green, blue);
                const cell = [
                    brightness,
                    'rgb(' + red + ',' + green + ',' + blue + ')'
                ];
                row.push(cell);
            }
            mappedImage.push(row);
        }
        return mappedImage;
    }

    calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }
}