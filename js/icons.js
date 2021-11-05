class Icons {
    constructor(ctx, posX, posY, width, height, speedY, lives, points, image) {
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
            y: speedY
        }
        this.lives = lives
        this.points = points

        this.logoImage = image

        this.init()
    }
    init() {
        this.image = new Image()
        this.image.src = this.logoImage
    }

    draw() {
        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.width, this.size.height)
    }

    move() {
        this.pos.y += this.speed.y
    }
}

