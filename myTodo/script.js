console.debug("Starting script...");

window.onload = function () {
    let button = this.document.getElementById("todoButton");
    button.addEventListener("mousedown", setStyleDown)
    button.addEventListener("mouseup", setStyleUpOrOut)
    button.addEventListener("mouseout", setStyleUpOrOut)
    button.addEventListener("click", insertNewListItem)
}

let setStyleDown = (e) => {
    e.target.style.backgroundColor = "#EEE";
    e.target.style.boxShadow = "0 0 1px 1px inset #666";
}
let setStyleUpOrOut = (e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.boxShadow = "0 0 1px 1px #666";
}
let insertNewListItem = () => {
    let ul = document.getElementById("todoList")
    let input = document.getElementById("todoText");

    let li = document.createElement("li");
    let textNode = document.createTextNode(input.value)
    li.appendChild(textNode);
    ul.appendChild(li);
    input.value = "";
}