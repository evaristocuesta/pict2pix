import Particle from "./particle";

export default class StraightParticle extends Particle {
    constructor(){
        super();
        this.x = Math.random() * Particle.maxWidth;
        this.y = Math.random() * Particle.maxHeight;
        this.speed = 0;
        this.size = Math.random() * 2 + 0.2;
        this.color;
    }
    update(deltaTime){
        this.y += (3 - this.speed) * deltaTime * 0.03 * Particle.verticalSpeed;
        this.x += (3 - this.speed) * deltaTime * 0.03 * Particle.horizontalSpeed;
        if (this.y >= Particle.maxHeight && Particle.verticalSpeed > 0){
            this.y = 0;
            this.x = Math.random() * Particle.maxWidth;
        }
        if (this.y < 0 && Particle.verticalSpeed < 0){
            this.y = Particle.maxHeight - 1;
            this.x = Math.random() * Particle.maxWidth;
        }
        if (this.x >= Particle.maxWidth && Particle.horizontalSpeed > 0){
            this.x = 0;
            this.y = Math.random() * Particle.maxHeight;
        }
        if (this.x < 0 && Particle.horizontalSpeed < 0){
            this.x = Particle.maxWidth - 1;
            this.y = Math.random() * Particle.maxHeight;
        }
        let yInt = Math.floor(this.y);
        let xInt = Math.floor(this.x);
        if (yInt >= 0 && yInt < Particle.maxHeight 
            && xInt >= 0 && xInt < Particle.maxWidth){
            this.speed = Particle.mappedImage[yInt][xInt][0];
            this.color = Particle.mappedImage[yInt][xInt][1];
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