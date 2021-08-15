export default class DefaultLedParticle {

    #config;
    #x;
    #y;
    #originalX;
    #originalY;
    #fromX;
    #fromY;
    #toX;
    #toY;
    #color;
    #dx;
    #dy;
    #transitionTime;
    #realTransitionTime;

    constructor(config, props) {
        this.#config = config;
        this.#x = 0;
        this.#y = 0;
        this.#originalX = props.x;
        this.#originalY = props.y;
        this.setFromOrigin();
        this.setToOrigin();
        this.#color = props.color;
    }

    #calculateDistance() {
        this.#dx = this.#toX - this.#fromX;
        this.#dy = this.#toY - this.#fromY;
    }

    setTransitionTime(transitionTime) {
        this.#transitionTime = transitionTime;
        const max = Math.floor(this.#transitionTime - (this.#transitionTime / 10));
        const min = Math.floor(this.#transitionTime / 2);
        this.#realTransitionTime = Math.floor(Math.random() * (max - min) + min);
    }

    setFrom(x, y) {
        this.#fromX = x;
        this.#fromY = y;
        this.#calculateDistance();
    }

    setTo(x, y) {
        this.#toX = x;
        this.#toY = y;
        this.#calculateDistance();
    }

    setFromPos() {
        this.#fromX = this.#x;
        this.#fromY = this.#y;
        this.#calculateDistance();
    }

    setFromOrigin() {
        this.#fromX = this.#originalX;
        this.#fromY = this.#originalY;
        this.#calculateDistance();
    }

    setToOrigin() {
        this.#toX = this.#originalX;
        this.#toY = this.#originalY;
        this.#calculateDistance();
    }

    setPos(x, y) {
        this.#x = x;
        this.#y = y;
    }
    
    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getOriginalX() {
        return this.#originalX;
    }

    getOriginalY() {
        return this.#originalY;
    }

    getTargetX() {
        return this.#toX;
    }

    getTargetY() {
        return this.#toY;
    }

    update(accumulatedTime) {
        const time = accumulatedTime / this.#realTransitionTime;
        if (accumulatedTime <= this.#realTransitionTime) {
            this.#x = this.#dx * time + this.#fromX;
            this.#y = this.#dy * time + this.#fromY;
        }
        else {
            this.#x = this.#toX;
            this.#y = this.#toY;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, 2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.#color;
        ctx.fill();
    }

}