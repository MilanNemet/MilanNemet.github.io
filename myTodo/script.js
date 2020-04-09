window.onload = function () {
    let button = this.document.getElementById("inputButton");
    button.addEventListener("mousedown", setStyleDown)
    button.addEventListener("mouseup", setStyleUp)
}

let setStyleDown = (e) => {
    e.style.color = "white";
    e.style.background = "black";
}
let setStyleUp = (e) => {
    e.style.color = "black";
    e.style.background = "white";
}