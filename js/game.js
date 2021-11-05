const game = {
    title: 'DuckyHack',
    author: 'Eunice y Bego',
    license: undefined,
    version: '1.0.0',
    desciption: 'DuckyHack sin Copyright',
    canvasDOM: undefined,
    ctx: undefined,
    canvasSize: { width: 500, height: 700 },
    background: undefined,
    player: undefined,
    bullet: undefined,
    scoreBoard: undefined,
    icons: [],
    enemie: [],
    mosca: [],
    help: [],
    logoImages: ['images/JS.png', 'images/css.png', 'images/HTML.png', 'images/HTML.png'],
    intervalId: undefined,
    FPS: 50,
    framesCounter: 0,
    secondsCounter: 0,

    init() {//inicia los metodos 
        this.setContext()
        this.setDimensions()
        this.setListeners()
        this.createPlayer()
        this.createScoreBoard()
        this.start()
    },

    reset() {
        console.log("reset")
        this.icons = []
        this.enemie = []
        this.mosca = []
        this.help = []
        this.points = 0
        this.clearScreen()
        this.createPlayer()
        this.createScoreBoard()
        this.start()
    },

    start() {//esta dentro de init con lo cual se ejecuta todo lo que este dentro
        this.createIcons()
        sounds.music.play();
        sounds.music.volume = 0.5;
        sounds.music.loop = true;

        this.intervalId = setInterval(() => {
            if (this.framesCounter && this.framesCounter % (this.FPS * 2) === 0)
                this.createEnemie()

            if (this.framesCounter && this.framesCounter % (this.FPS * 3) === 0)
                this.createMosca()

            if (this.framesCounter && this.framesCounter % (this.FPS * 6) === 0)
                this.createHelp()

            this.clearScreen()
            this.drawAll()
            this.moveAll()
            this.isCollisionBullet()
            this.isCollisionEnemie()
            this.isCollisionBulletMosca()
            this.isCollisionBulletEnemie()
            this.isCollisionHelp()
            this.isCollisionMosca()
            this.action()

            if (this.icons.some(icon => {
                return icon.pos.y + icon.size.height >= this.player.posY
            })) {
                this.gameOver()
            }

            if (this.isCollisionEnemie() || this.isCollisionMosca()) {
                this.gameOver()
            }

            if (this.isCollisionHelp()) {
                console.log("colision")
                this.player.shootDoble()
            }

            if (this.icons.length === 0) {
                this.gameWin()
            }

            this.framesCounter++;

        }, 1000 / this.FPS)
    },

    setContext() {
        this.canvasDOM = document.querySelector("#myCanvas")//coge la etiqueta y se asigna a la variable this.canvasDOM
        this.ctx = this.canvasDOM.getContext("2d")//crea el escenario en dos dimensiones X e Y
    },

    setDimensions() {//dimensiones del canvas
        this.canvasDOM.setAttribute("width", this.canvasSize.width)//asignamos un ancho al escenario
        this.canvasDOM.setAttribute("height", this.canvasSize.height)//asignamos un alto al escenario
    },

    drawAll() {
        // this.drawBackground()//pinta el rectangulo gris dentro de drawall
        //console.log('ho')
        this.drawBackground()
        this.drawPlayer()
        this.drawBullets()//pinta las bajas dentro de drawall
        this.drawIcons()//pinta los obstaculos
        this.drawScoreBoard()
        this.drawEnemie()
        this.drawMosca()
        this.drawHelp()
    },

    drawBackground() {//pinta rectangulo gris
        this.image = new Image()
        this.image.src = 'images/Backg.png'
        this.ctx.drawImage(this.image, 0, 0, this.canvasSize.width, this.canvasSize.height)
    },

    drawPlayer() {//entra el player y en draw()
        this.player.draw()
    },

    drawIcons() {
        this.icons.forEach(icons => icons.draw())
    },

    drawBullets() {
        this.player.bullets.forEach(bullet => bullet.draw())
    },

    drawScoreBoard() {
        this.scoreBoard.draw()
    },

    drawEnemie() {
        this.enemie.forEach(enemie => enemie.draw())
    },

    drawMosca() {
        this.mosca.forEach(mosca => mosca.draw())
    },

    drawHelp() {
        this.help.forEach(help => help.draw())
    },

    moveAll() {
        this.icons.forEach(icon => icon.move())
        this.enemie.forEach(enemie => enemie.move())
        this.mosca.forEach(mosca => mosca.move())
        this.help.forEach(help => help.move())
    },

    createPlayer() {
        this.player = new Player(ctx = this.ctx, posX = game.canvasSize.width / 2 - 20,
            posY = game.canvasSize.height - 100, duck_width = game.canvasSize.width / 9, duck_heigh = game.canvasSize.height / 9)
    },

    createIcons() {
        for (let i = 0; i < 4; i++) {
            let posY = 30 + 60 * i
            let lives = 4 - i
            let points = 10 * (lives)
            let currentImage = this.logoImages[i]
            for (let j = 0; j < 8; j++) {
                let posX = 15 + 60 * j
                this.icons.push(new Icons(this.ctx, posX, posY, 50, 50, 0.5, lives, points, currentImage))
            }
        }
    },

    createScoreBoard() {
        this.scoreBoard = new Score(this.ctx, 350, 40)
    },

    createEnemie() {
        this.enemie.push(new Enemie(ctx, 0, 10, 50, 50, 3, 4, 2))
    },

    createMosca() {
        this.mosca.push(new Mosca(ctx, 450, 10, 50, 50, 7, 5, 1))
    },

    createHelp() {
        this.help.push(new Help(ctx, 300, 10, 50, 50, 2))
    },

    setListeners() {
        document.onkeydown = e => {// ejecuta un js cuando aprieta una tecla
            // e.key === 'ArrowLeft' ? this.player.moveLeft() : null// cuando presiona la tecla se mueve a la izq
            // e.key === 'ArrowRight' ? this.player.moveRight() : null// cuando presiona la tecla se mueve a la derch
            e.key === ' ' ? this.player.shoot() : null// cuando presiona la tecla space dispara
            e.key === 'ArrowLeft' && (this.leftPressed = true)// cuando presiona la tecla se mueve a la izq
            e.key === 'ArrowRight' ? this.rightPressed = true : null// cuando presiona la tecla se mueve a la derch
            // e.key === ' ' ? this.spacePressed = true : null// cuando presiona la tecla space dispara
        }
        document.onkeyup = e => {// ejecuta un js cuando aprieta una tecla

            e.key === 'ArrowLeft' && (this.leftPressed = false)// cuando presiona la tecla se mueve a la izq
            e.key === 'ArrowRight' ? this.rightPressed = false : null// cuando presiona la tecla se mueve a la derch
            // e.key === ' ' ? this.spacePressed = false : null// cuando presiona la tecla space dispara
        }
    },

    action() {
        this.leftPressed && this.player.moveLeft();
        this.rightPressed && this.player.moveRight();
    },

    isCollisionBullet() {
        return this.player.bullets.some(bullet => {
            return this.icons.some((icon, i) => {
                if (bullet.bullet_pos_X < icon.pos.x + icon.size.width &&
                    bullet.bullet_pos_X + bullet.size.width > icon.pos.x &&
                    bullet.bullet_pos_Y < icon.pos.y + icon.size.height &&
                    bullet.bullet_pos_Y + bullet.size.height > icon.pos.y
                ) {
                    sounds.damage.preload = "auto";
                    sounds.damage.load();
                    sounds.damage.play();
                    sounds.damage.loop = false;
                    sounds.damage.volume = 0.2;

                    if (icon.lives <= 1) {
                        this.desaparecerIcon(i)
                        this.scoreBoard.points += icon.points

                    } else {
                        icon.lives--;
                        this.scoreBoard.points += icon.points
                    }
                    this.desaparecerBullet()
                    return true

                } else {
                    return false
                }
            })
        })
    },

    isCollisionBulletMosca() {
        return this.player.bullets.some(bullet => {
            return this.mosca.some((mosca, i) => {
                if (bullet.bullet_pos_X < mosca.pos.x + mosca.size.width &&
                    bullet.bullet_pos_X + mosca.size.width > mosca.pos.x &&
                    bullet.bullet_pos_Y < mosca.pos.y + mosca.size.height &&
                    bullet.bullet_pos_Y + bullet.size.height > mosca.pos.y
                ) {
                    if (mosca.lives <= 1) {
                        this.desaparecerMosca(i)
                    }
                    else {
                        mosca.lives--;
                    }
                    this.desaparecerBullet()
                    return true
                } else {
                    return false
                }
            })
        })
    },

    isCollisionBulletMosca() {
        return this.player.bullets.some(bullet => {
            return this.mosca.some((mosca, i) => {
                if (bullet.bullet_pos_X < mosca.pos.x + mosca.size.width &&
                    bullet.bullet_pos_X + mosca.size.width > mosca.pos.x &&
                    bullet.bullet_pos_Y < mosca.pos.y + mosca.size.height &&
                    bullet.bullet_pos_Y + bullet.size.height > mosca.pos.y
                ) {
                    if (mosca.lives <= 1) {
                        this.desaparecerMosca(i)
                    }
                    else {
                        mosca.lives--;
                    }
                    this.desaparecerBullet()
                    return true
                } else {
                    return false
                }

            })
        })
    },

    isCollisionBulletEnemie() {
        return this.player.bullets.some(bullet => {
            return this.enemie.some((enemie, i) => {
                if (bullet.bullet_pos_X < enemie.pos.x + enemie.size.width &&
                    bullet.bullet_pos_X + enemie.size.width > enemie.pos.x &&
                    bullet.bullet_pos_Y < enemie.pos.y + enemie.size.height &&
                    bullet.bullet_pos_Y + bullet.size.height > enemie.pos.y
                ) {
                    if (enemie.lives <= 1) {
                        this.desaparecerEnemie(i)
                    }
                    else {
                        enemie.lives--;
                    }
                    this.desaparecerBullet()
                    return true
                } else {
                    return false
                }
            })
        })
    },

    isCollisionEnemie() {
        return this.enemie.some(enemie => {
            return (
                this.player.posX < enemie.pos.x + enemie.size.width &&
                this.player.posX + this.player.duck_width > enemie.pos.x &&
                this.player.posY + 10 < enemie.pos.y + enemie.size.height &&
                this.player.posY + this.player.duck_height > enemie.pos.y
            )
        })
    },

    isCollisionMosca() {
        return this.mosca.some(mosca => {
            return (
                this.player.posX < mosca.pos.x + mosca.size.width &&
                this.player.posX + this.player.duck_width > mosca.pos.x &&
                this.player.posY + 10 < mosca.pos.y + mosca.size.height &&
                this.player.posY + this.player.duck_height > mosca.pos.y
            )
        })
    },

    isCollisionHelp() {
        return this.help.some(help => {
            return (
                this.player.posX < help.pos.x + help.size.width &&
                this.player.posX + this.player.duck_width > help.pos.x &&
                this.player.posY + 10 < help.pos.y + help.size.height &&
                this.player.posY + this.player.duck_height > help.pos.y
            )
        })
    },

    desaparecerIcon(i) {
        this.icons.splice(i, 1)
    },

    desaparecerBullet() {
        this.player.bullets.splice(0, 1)
    },

    desaparecerMosca() {
        this.mosca.splice(0, 1)
    },

    desaparecerEnemie() {
        this.enemie.splice(0, 1)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },

    gameOver() {
        clearInterval(this.intervalId)
        this.drawGameover()
        sounds.music.pause();
        sounds.music.currentTime = 0;
        document.getElementById('start').disabled = false;
        document.getElementById('start').textContent = 'Restart';
    },

    drawGameover() {
        this.image = new Image()
        this.image.src = 'images/overeu.png'
        this.image.onload = () => this.ctx.drawImage(this.image, 0, 0, this.canvasSize.width, this.canvasSize.height)
        sounds.music.pause();
        sounds.music.currentTime = 0;
        sounds.gameOver.play();
        sounds.gameOver.volume = 0.5;
    },

    gameWin() {
        clearInterval(this.intervalId)
        this.drawGameWin()
        sounds.music.pause();
        sounds.music.currentTime = 0;
        sounds.gameWin.play();
        sounds.gameWin.volume = 0.5;
        document.getElementById('start').disabled = false;
        document.getElementById('start').textContent = 'Restart';

    },

    drawGameWin() {
        this.image = new Image()
        this.image.src = 'images/perdido.png'
        this.image.onload = () => this.ctx.drawImage(this.image, 0, 0, this.canvasSize.width, this.canvasSize.height)
    },
}










