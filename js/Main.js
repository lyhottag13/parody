const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const background = document.getElementById("background");
const backgroundContext = background.getContext("2d");

context.imageSmoothingEnabled = false;
backgroundContext.imageSmoothingEnabled = false;

const GRAVITY = 0.0014;
const FRICTION = -0.0003;

background.style.background = "white";
canvas.style.background = "white";

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

// background.height = WINDOW_HEIGHT;
// background.width = WINDOW_WIDTH;

const image1 = new Image();
const image2 = new Image();
const image3 = new Image();
const image4 = new Image();

class Sprite {
    constructor(xpos, ypos, xvel, yvel, image, height, width) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.xvel = xvel;
        this.yvel = yvel;
        this.image = image;
        this.height = height;
        this.width = width;
    }
    update(delta) {
        context.clearRect(0, 0, 32, 32);
        context.drawImage(image3, 0, 0);
        this.yvel += GRAVITY * delta;
        this.ypos += this.yvel * delta;
        this.xpos += this.xvel * delta;
        
        if (this.ypos >= 300) {
            setTimeout(() => {
                document.getElementById("you").style.opacity = 1;
            }, 2000);
            context.clearRect(0, 0, 32, 32);
            context.drawImage(image4, 0, 0);
            this.ypos = 300;
            this.xvel += FRICTION * delta;
            if (this.xvel <= 0) {
                this.xvel = 0;
            }
        }
        backgroundContext.drawImage(this.image, this.xpos, this.ypos, 128, 128);
    }
}

image1.src = "resources/images/guy.png";
image2.src = "resources/images/background.png";
image3.src = "resources/images/flying.png";
image4.src = "resources/images/floored.png";

let guy;

image1.onload = () => {
    context.drawImage(image1, 0, 0);
    guy = new Sprite(40, 130, 0.25, -0.4, canvas, 32, 32);
}
let lastTime = 0;

image2.onload = () => {
    backgroundContext.drawImage(image2, 0, 0, 512, 512);
    backgroundContext.drawImage(canvas, 40, 130, 128, 128);
}

let isFirstRun = true;
function updateCanvas(timestamp) {
    backgroundContext.clearRect(0, 0, 512, 512);
    backgroundContext.drawImage(image2, 0, 0, 512, 512);
    if (isFirstRun) {
        lastTime = timestamp;
        isFirstRun = false;
    }
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    guy.update(delta);

    requestAnimationFrame(updateCanvas);
}

document.addEventListener("click", () => {
    requestAnimationFrame(updateCanvas);

})
