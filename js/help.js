class Help {
    constructor(ctx, posX, posY, width, height, speedX,) {
        this.ctx = ctx
        this.pos = {
            x: posX,
            y: posY
        }
        this.size = {
            width: width,
            height: height
        }
        this.speed = {
            x: speedX
        }
        this.init()
    }
    init() {
        this.image = new Image()
        this.image.src = 'images/bonus.png'
    }
    draw() {
        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.width, this.size.height)
    }
    move() {
        this.pos.y += this.speed.x
    }
}