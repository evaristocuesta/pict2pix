export default class DotHalftoneParticle {
    
    #config;
    #color;
    #x;
    #y;
    #radio;
    static #END_ANGLE = Math.PI*2;

    constructor(config, props) {
        this.#config = config;
        this.#color = props.color;
        this.#x = props.x;
        this.#y = props.y;
        this.#radio = props.size / 2;
    }

    update(deltaTime) {

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, this.#radio, 0, DotHalftoneParticle.#END_ANGLE);
        ctx.closePath();
        ctx.fillStyle = this.#color;
        ctx.fill();
    }
}