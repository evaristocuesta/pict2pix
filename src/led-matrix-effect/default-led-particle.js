export default class DefaultLedParticle {

    #config;
    #x;
    #y;
    #color;

    constructor(config, props) {
        this.#config = config;
        this.#x = props.x;
        this.#y = props.y;
        this.#color = props.color;
    }

    update(deltaTime) {

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, 2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.#color;
        ctx.fill();
    }

}