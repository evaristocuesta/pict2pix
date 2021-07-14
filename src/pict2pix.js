import ParticleFactory from "./particle-factory";
import Particle from "./particle";

export default class Pict2Pix {
    #canvas;
    #ctx;
    #lastTime = 0;
    #deltaTime = 0;
    #particlesArray = [];
    #numberOfParticles = 3000;
    #mappedImage = [];
    
    constructor(configPic2Pix) {
        this.#numberOfParticles = configPic2Pix.numberOfParticles || 3000;
        this.#canvas = document.createElement('canvas');
        this.#canvas.width = configPic2Pix.image.width || configPic2Pix.image.naturalWidth;
        this.#canvas.height = configPic2Pix.image.height || configPic2Pix.image.naturalHeight;
        configPic2Pix.image.replaceWith(this.#canvas);
        this.#ctx = this.#canvas.getContext('2d');

        this.#ctx.drawImage(configPic2Pix.image, 0, 0, this.#canvas.width, this.#canvas.height);
        const pixels = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.mapImage(pixels);

        requestAnimationFrame(this.loop.bind(this));
        Particle.mappedImage = this.#mappedImage;
        Particle.maxWidth = this.#canvas.width;
        Particle.maxHeight = this.#canvas.height;
        Particle.verticalSpeed = configPic2Pix.verticalSpeed ?? 1;
        Particle.horizontalSpeed = configPic2Pix.horizontalSpeed ?? 1;
        const factory = new ParticleFactory();
        for (let i = 0; i < this.#numberOfParticles; i++){
            this.#particlesArray.push(factory.createParticle(configPic2Pix.particleType ?? 'straight-particle'));
        }
    }

    mapImage(pixels) {
        let min = 654654;
        let max = -654654;
        for (let y = 0; y < this.#canvas.height; y++){
            let row = [];
            for (let x = 0; x < this.#canvas.width; x++){
                const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
                const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
                const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
                const brightness = this.calculateRelativeBrightness(red, green, blue);
                if (brightness < min) {
                    min = brightness;
                }
                if (brightness > max) {
                    max = brightness;
                }
                const cell = [
                    brightness,
                    'rgb(' + red + ',' + green + ',' + blue + ')'
                ];
                row.push(cell);
            }
            this.#mappedImage.push(row);
        }
    }

    calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }

    update(deltaTime) {
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].update(deltaTime);
        }
    }

    draw() {
        this.#ctx.globalAlpha = 0.01;
        this.#ctx.fillStyle = 'rgb(0, 0, 0)';
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
        for (let i = 0; i < this.#particlesArray.length; i++){
            this.#particlesArray[i].draw(this.#ctx);
        }
    }

    loop(timeStamp) {
        this.#deltaTime = timeStamp - this.#lastTime;
        this.#lastTime = timeStamp;

        this.update(this.#deltaTime);

        this.draw();

        requestAnimationFrame(this.loop.bind(this))
    }
}