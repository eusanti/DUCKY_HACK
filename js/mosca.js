class Mosca {
    constructor(ctx, posX, posY, width, height, speedX, speedY, lives) {
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
            x: speedX,
            y: speedY
        }
        this.lives = lives

        this.init()
    }

    init() {
        this.image = new Image()
        this.image.src = 'images/fly.png'
    }

    draw() {
        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.width - 10, this.size.height - 10)
    }

    move() {
        this.pos.y += this.speed.y
        this.pos.x += this.speed.x
        if (this.pos.x >= 500 || this.pos.x <= 0) {
            this.speed.x *= -1
        }
    }
}