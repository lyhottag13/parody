const bear = document.getElementById("bear");
bear.style.left = "500px";

let holdingLeft = false;
let holdingRight = false;

document.addEventListener("keydown", action => {
    switch (action.key) {
        case "a":
            holdingLeft = true;
            break;
        case "d":
            holdingRight = true;
            break;
    }
});
document.addEventListener("keyup", action => {
    switch (action.key) {
        case "a":
            holdingLeft = false;
            break;
        case "d":
            holdingRight = false;
            break;
    }
});
setInterval(() => {
    if (holdingLeft) {
        bear.style.left = (Number.parseInt(bear.style.left.replace("px", "")) - 10) + "px";
    }
    if (holdingRight) {
        bear.style.left = (Number.parseInt(bear.style.left.replace("px", "")) + 10) + "px";
    }
}, 20);