import EffectFactory from "./effect-factory";

export default class Pict2Pix {
    #canvas;
    #ctx;
    #reqAnim;
    #lastTime = 0;
    #deltaTime = 0;
    #effect;
    #config;
    running = false;
    
    constructor(config) {
        this.#config = config;
        this.#canvas = document.createElement('canvas');
        this.#canvas.width = this.#config.image.width || this.#config.image.naturalWidth;
        this.#canvas.height = this.#config.image.height || this.#config.image.naturalHeight;
        this.#ctx = this.#canvas.getContext('2d');

        this.#effect = EffectFactory.createParticle(config);
    }

    update(deltaTime) {
        this.#effect.update(deltaTime);
    }

    draw() {
        this.#effect.draw(this.#ctx);
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