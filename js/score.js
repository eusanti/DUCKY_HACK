class Score {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.pos = {
            x: posX,
            y: posY
        }
        this.points=0
        this.draw()
    }

    draw() {
        this.ctx.font = '20px sans-serif';
        this.ctx.fillText(this.points + " Points", this.pos.x, this.pos.y);
    }
}

