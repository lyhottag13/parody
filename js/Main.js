const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;

const GRAVITY = 0.001;
const FRICTION = -0.001;

canvas.style.background = "white";

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

// canvas.height = WINDOW_HEIGHT;
// canvas.width = WINDOW_WIDTH;


class Sprite {
    constructor(xpos, ypos, speedX, speedY, spritePath) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.speedX = speedX;
        this.speedY = speedY;
        this.spritePath = spritePath;
    }
    drawImage(context) {
        context.drawImage(this.spritePath, this.xpos, this.ypos, 32, 32);    
    }
    update(delta) {
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        this.speedY += GRAVITY * delta;
        
        this.xpos += this.speedX * delta;
        this.ypos += this.speedY * delta;
        
        if (this.ypos >= 70) {
            this.spritePath = image2;
            this.ypos = 70;
            this.speedX += FRICTION * delta;
            if (this.speedX <= 0) {
                this.speedX = 0;
            }
        }
        
        this.drawImage(context);
    }
    bounce() {
        this.speedY = -this.speedY * .5;
    }
}

const image1 = new Image();
const image2 = new Image();


image1.src = "resources/images/flying.png";
image2.src = "resources/images/floored.png";

const sprite = new Sprite(10, 50, 0.09, -0.3, image1);

sprite.drawImage(context);

let lastTime = 0;

function updateCanvas(timestamp) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    sprite.update(delta);
    requestAnimationFrame(updateCanvas);
}

requestAnimationFrame(updateCanvas);