export default class DefaultLedParticle {

    #config;
    #x;
    #y;
    #originalX;
    #originalY;
    #maxDistance;
    #color;
    #minForce;

    constructor(config, props) {
        this.#config = config;
        this.#x = 0;
        this.#y = 0;
        this.#originalX = props.x;
        this.#originalY = props.y;
        this.#color = props.color;
        this.#maxDistance = Math.sqrt(Math.pow(this.#config.image.width, 2) + Math.pow(this.#config.image.height, 2));
        this.#minForce = ((Math.random() * 6) + 3) * 0.001;
    }

    setPos(x, y) {
        this.#x = x;
        this.#y = y;
    }

    update(deltaTime) {
        const dx = this.#originalX - this.#x;
        const dy = this.#originalY - this.#y;
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const force = (this.#maxDistance - distance) / this.#maxDistance;
        this.#x += force * dx * deltaTime * this.#minForce;
        this.#y += force * dy * deltaTime * this.#minForce;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, 2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.#color;
        ctx.fill();
    }

}