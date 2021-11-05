class Bullet {
  constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight) {
    this.ctx = ctx;

    this.bullet_pos_X = playerPosX + playerWidth / 2;
    this.bullet_pos_Y = playerPosY;// PREGUNTAR SI TIENE QUE VER
    this.playerHeight = playerHeight

    this.gameWidth = 500
    this.gameHeight = 700

    this.size = {
      width: 20,
      height: 20
    }

    this.speed = {
      x: 0,//pongo 0 para que las balas vayan rectas
      y: 8
    }

    this.gravity = this.gameHeight / 100;
    this.init()
  }

  init() {
    this.image = new Image()
    this.image.src = 'images/duck.png'
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    //this.ctx.fillRect(this.bullet_pos_X, this.bullet_pos_Y, 20, 20)
    this.ctx.drawImage(this.image, this.bullet_pos_X, this.bullet_pos_Y, 20, 20)
    // this.ctx.arc(this.bullet_pos_X, this.bullet_pos_Y, this.radius, 0, Math.PI * 2);
    // this.ctx.fill();
    this.ctx.closePath();

    this.move()
  }

  move() {
    this.bullet_pos_Y -= this.speed.y;

  }
}