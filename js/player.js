class Player {
  constructor(ctx, posX, posY, duck_width, duck_height) {
    this.ctx = ctx
    this.posX = posX
    this.posY = posY
    this.duck_width = duck_width
    this.duck_height = duck_height
    this.image = undefined
    this.bullets = []
    this.buffed = false
    this.init()
  }

  init() {
    this.image = new Image()
    this.image.src = 'images/duck.png'
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.duck_width , this.duck_height )
  }

  moveLeft() {
    if (this.posX > 30) {
      this.posX -= 10
    }
  }

  moveRight() {
    if (this.posX <= 420) {
      this.posX += 10
    }
  }

  shoot() {
    this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.duck_width, this.duck_height))
  }

  shootDoble() {
    this.bullets.push(new Bullet(this.ctx, this.posX - 40, this.posY, this.duck_width, this.duck_height))
    this.bullets.push(new Bullet(this.ctx, this.posX + 40, this.posY, this.duck_width, this.duck_height))
  }

}