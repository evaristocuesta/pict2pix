import Particle from "./particle";

export default class StraightParticle extends Particle {
    constructor(config){
        super(config);
        this.x = Math.random() * this.config.maxWidth;
        this.y = Math.random() * this.config.maxHeight;
        this.speed = 0;
        this.size = Math.random() * 2 + 0.2;
        this.color;
    }
    update(deltaTime){
        this.y += (3 - this.speed) * deltaTime * 0.03 * this.config.verticalSpeed;
        this.x += (3 - this.speed) * deltaTime * 0.03 * this.config.horizontalSpeed;
        if (this.y >= this.config.maxHeight && this.config.verticalSpeed > 0){
            this.y = 0;
            this.x = Math.random() * this.config.maxWidth;
        }
        if (this.y < 0 && this.config.verticalSpeed < 0){
            this.y = this.config.maxHeight - 1;
            this.x = Math.random() * this.config.maxWidth;
        }
        if (this.x >= this.config.maxWidth && this.config.horizontalSpeed > 0){
            this.x = 0;
            this.y = Math.random() * this.config.maxHeight;
        }
        if (this.x < 0 && this.config.horizontalSpeed < 0){
            this.x = this.config.maxWidth - 1;
            this.y = Math.random() * this.config.maxHeight;
        }
        let yInt = Math.floor(this.y);
        let xInt = Math.floor(this.x);
        if (yInt >= 0 && yInt < this.config.maxHeight 
            && xInt >= 0 && xInt < this.config.maxWidth){
            this.speed = this.config.mappedImage[yInt][xInt][0];
            this.color = this.config.mappedImage[yInt][xInt][1];
        }
    }
    draw(ctx){
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}