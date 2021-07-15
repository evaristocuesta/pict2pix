import ParticleFactory from "./particle-factory";

export default class Pict2Pix {
    #canvas;
    #ctx;
    #reqAnim;
    #lastTime = 0;
    #deltaTime = 0;
    #particlesArray = [];
    #config;
    running = false;
    
    constructor(config) {
        this.#config = config;
        this.#canvas = document.createElement('canvas');
        this.#canvas.width = this.#config.image.width || this.#config.image.naturalWidth;
        this.#canvas.height = this.#config.image.height || this.#config.image.naturalHeight;
        this.#ctx = this.#canvas.getContext('2d');

        this.#ctx.drawImage(this.#config.image, 0, 0, this.#canvas.width, this.#canvas.height);
        const pixels = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#config.numberOfParticles = this.#config.numberOfParticles || 3000;
        this.#config.mappedImage = this.mapImage(pixels);
        this.#config.maxWidth = this.#canvas.width;
        this.#config.maxHeight = this.#canvas.height;
        this.#config.verticalSpeed = config.verticalSpeed ?? 1;
        this.#config.horizontalSpeed = config.horizontalSpeed ?? 1;

        const factory = new ParticleFactory();
        for (let i = 0; i < this.#config.numberOfParticles; i++){
            this.#particlesArray.push(factory.createParticle(config));
        }
    }

    mapImage(pixels) {
        let mappedImage = [];
        for (let y = 0; y < this.#canvas.height; y++){
            let row = [];
            for (let x = 0; x < this.#canvas.width; x++){
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

    start() {
        if (!this.running) {
            this.#lastTime = 0;
            this.#config.image.style.display = "none";
            this.#config.image.parentNode.insertBefore(this.#canvas, this.#config.image);
            this.#reqAnim = requestAnimationFrame(this.loop.bind(this));
            this.running = true;
        }
    }

    stop() {
        if (this.running) {
            this.#config.image.style.display = "initial";
            this.#config.image.parentNode.removeChild(this.#canvas);
            window.cancelAnimationFrame(this.#reqAnim);
            this.running = false;
        }
    }

    loop(timeStamp) {
        if (!this.#lastTime) {
            this.#lastTime = timeStamp;
        }
        this.#deltaTime = timeStamp - this.#lastTime;
        this.#lastTime = timeStamp;

        this.update(this.#deltaTime);

        this.draw();

        this.#reqAnim = requestAnimationFrame(this.loop.bind(this))
    }
}