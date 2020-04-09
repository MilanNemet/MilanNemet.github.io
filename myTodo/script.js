console.debug("Starting script...");

window.onload = function () {
    let buttonAdd = this.document.getElementById("todoButtonAdd");
    let buttonReset = this.document.getElementById("todoButtonReset");

    buttonAdd.addEventListener("mousedown", setStyleDown);
    buttonAdd.addEventListener("mouseup", setStyleUpOrOut);
    buttonAdd.addEventListener("mouseout", setStyleUpOrOut);
    buttonAdd.addEventListener("click", insertNewListItem);

    buttonReset.addEventListener("mousedown", setStyleDown);
    buttonReset.addEventListener("mouseup", setStyleUpOrOut);
    buttonReset.addEventListener("mouseout", setStyleUpOrOut);
    buttonReset.addEventListener("click", resetList);
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

    if (input.value.length > 0) {
        let li = document.createElement("li");
        let textNode = document.createTextNode(input.value)
        li.appendChild(textNode);
        ul.appendChild(li);
        input.value = "";
    }
}
let resetList = () => {
    let answer = confirm("All list-items will be deleted permanently!\nDo you want to continue?");
    if (answer) {
        document.getElementById("todoList").innerHTML = '';
    }
}