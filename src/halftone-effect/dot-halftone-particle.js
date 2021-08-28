export default class DotHalftoneParticle {
    
    #config;
    #color;
    #x;
    #y;
    #originalX;
    #originalY;
    #toX;
    #toY;
    #fromX;
    #fromY;
    #dx;
    #dy;
    #transitionTime;
    #radio;
    static #END_ANGLE = Math.PI*2;

    constructor(config, props) {
        this.#config = config;
        this.#color = props.color;
        this.#originalX = props.x;
        this.#originalY = props.y;
        this.setFromOrigin();
        this.setToOrigin();
        this.#radio = props.size / 2;
    }

    #calculateDistance() {
        this.#dx = this.#toX - this.#fromX;
        this.#dy = this.#toY - this.#fromY;
    }

    setTransitionTime(transitionTime) {
        this.#transitionTime = transitionTime;
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

    setPosOrigin() {
        this.#x = this.#originalX;
        this.#y = this.#originalY;
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

    getFromX() {
        return this.#fromX;
    }

    getFromY() {
        return this.#fromY;
    }

    getDx() {
        return this.#dx;
    }

    getDy() {
        return this.#dy;
    }

    getOriginalX() {
        return this.#originalX;
    }

    getOriginalY() {
        return this.#originalY;
    }

    draw(ctx) {
        if (this.#x < this.#config.maxWidth && this.#y < this.#config.maxHeight) {
            ctx.beginPath();
            ctx.arc(this.#x, this.#y, this.getRadio(this.#x, this.#y), 0, DotHalftoneParticle.#END_ANGLE);
            ctx.closePath();
            ctx.fillStyle = this.#color;
            ctx.fill();
        }
    }

    getRadio(x, y) {
        const posX = Math.floor((x - (this.#config.dotSize / 2)) / this.#config.dotSize);
        const posY = Math.floor((y - (this.#config.dotSize / 2)) / this.#config.dotSize);
        if (posY < this.#config.mappedImage.length && posX < this.#config.mappedImage[0].length) {
            const brightness = this.#config.mappedImage[posY][posX].brightness;
            return this.#config.dotSize * (2.55 - brightness) / 4;
        }
        else {
            return 0;
        }
    }
}