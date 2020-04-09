console.debug("Starting script...");

var listItems;

window.onload = function () {
    let buttonAdd = this.document.getElementById("todoButtonAdd");
    let buttonReset = this.document.getElementById("todoButtonReset");
    let textBox = this.document.getElementById("todoText");

    textBox.addEventListener("focus", (e) => e.target.className = "active")
    textBox.addEventListener("focusout", (e) => e.target.className = "inactive")

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
    let ul = document.getElementById("todoList");
    let input = document.getElementById("todoText");

    if (input.value.length > 0) {
        let li = document.createElement("li");
        let textNode = document.createTextNode(input.value);
        li.appendChild(textNode);
        ul.appendChild(li);
        input.value = "";

        listItems = document.querySelectorAll("#todoList > li");
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener("click", liClickHandler);
        }
    }
    else {
        showErrorMsg("There is nothing to add...");
    }

    input.focus();
}
let resetList = () => {
    let answer = confirm("All list-items will be deleted permanently!\nDo you want to continue?");
    if (answer) {
        document.getElementById("todoList").innerHTML = '';
    }
}
let showErrorMsg = (str) => {
    let error = document.querySelector(".error");
    error.innerHTML = str;
    error.style.visibility = 'visible';
    setTimeout(function () { error.style.visibility = 'hidden'; }, 4000);
}
let liClickHandler = (e) => {
    let li = e.target;
    if (li.style.textDecoration != "line-through") {
        li.style.textDecoration = "line-through";
    }
    else {
        li.style.textDecoration = "none";
    }
}