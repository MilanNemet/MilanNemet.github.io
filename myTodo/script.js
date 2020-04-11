console.debug("Starting script...");

window.onload = function () {
    initSubmits();
    initTextBox();
}

let initSubmits = () => {
    let inputSubmits = this.document.querySelectorAll("input[type=submit]");
    inputSubmits.forEach(
        item => {
            item.addEventListener("mousedown", setStyleDown);
            item.addEventListener("mouseup", setStyleUpOrOut);
            item.addEventListener("mouseout", setStyleUpOrOut);
            if (item.id == "ButtonNewList") item.addEventListener("click", insertNewList);
            else if (item.id == "ButtonDeleteList") item.addEventListener("click", deleteList);
            else if (item.id == "todoButtonAdd") item.addEventListener("click", insertNewListItem);
            else if (item.id == "todoButtonReset") item.addEventListener("click", resetList);
            else item.addEventListener("click", handlePaging)
        }
    );
}
let initTextBox = () => {
    let textBox = this.document.getElementById("todoText");
    textBox.addEventListener("focus", (e) => e.target.className = "active");
    textBox.addEventListener("focusout", (e) => e.target.className = "inactive");
    textBox.addEventListener('keypress', insertNewListItem);
}

let setStyleDown = (e) => {
    e.target.style.backgroundColor = "#EEE";
    e.target.style.boxShadow = "0 0 1px 1px inset #666";
}
let setStyleUpOrOut = (e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.boxShadow = "0 0 1px 1px #666";
}

let insertNewList = () => {
    let todoLists;
    let indexerElement = document.getElementById("indexer");
    let listsContainer = document.getElementById("listsContainer");
    let listType = document.getElementById("list_type").value;
    let newList = document.createElement(listType);
    newList.className = "todoList";

    listsContainer.appendChild(newList);
    todoLists = document.getElementsByClassName("todoList");

    for (var i = 0; i < todoLists.length-1; i++) {
        todoLists[i].style.display = "none";
    }
    indexerElement.innerHTML = todoLists.length;
}
let deleteList = () => {
    let indexerElement = document.getElementById("indexer");
    let index = parseInt(indexerElement.innerHTML) - 1;
    let todoLists = document.getElementsByClassName("todoList");

    if (todoLists.length < 2) return;
    else if (!confirm("This list will be deleted permanently!\nDo you want to continue?")) return;
    else todoLists[index].remove();

    if (index) {
        goToPage(index-1, indexerElement, todoLists, false);
    }
    else {
        goToPage(0, indexerElement, todoLists, false);
    }
}

let insertNewListItem = (e) => {
    let keyCode = e.which || e.keyCode;
    if (keyCode != 13 && e.button != 0) {
        return;
    }

    let listIndex = document.getElementById("indexer").innerHTML;
    let todoLists = document.getElementsByClassName("todoList");
    let input = document.getElementById("todoText");

    if (input.value.length < 1) {
        showErrorMsg("There is nothing to add...");
        return;
    }
    let li = document.createElement("li");

    let textNode = document.createTextNode(input.value);
    li.appendChild(textNode);

    let ins = document.createElement("ins");

    let bin = document.createElement("span");
    bin.className = "material-icons";
    bin.textContent = "delete";

    let tick = document.createElement("span");
    tick.className = "material-icons";
    tick.textContent = "check_circle_outline";

    ins.appendChild(bin);
    ins.appendChild(tick);
    li.appendChild(ins);

    todoLists[listIndex-1].appendChild(li);
    input.value = "";

    let listItems = todoLists[listIndex - 1].querySelectorAll("li");
    let lastListItem = listItems[listItems.length - 1];
    lastListItem.firstChild.addEventListener("click", liClickHandler);
    input.focus();
}
let removeListItem = (e) => {

}
let resetList = () => {
    let answer = confirm("All these list-items will be deleted permanently!\nDo you want to continue?");
    let i = parseInt(document.getElementById("indexer").innerHTML)-1;
    if (answer) {
        document.getElementsByClassName("todoList")[i].innerHTML = '';
    }
}

let handlePaging = (e) => {
    let sender = e.target;
    let id = sender.id;

    let indexerElement = document.getElementById("indexer");
    let todoLists = document.getElementsByClassName("todoList");

    switch (id) {
        case "todoListFirst":
            goToPage(0, indexerElement, todoLists);
            break;
        case "todoListPrev":
            goToPage(indexer.innerHTML-2, indexerElement, todoLists);;
            break;
        case "todoListNext":
            goToPage(indexer.innerHTML, indexerElement, todoLists);;
            break;
        case "todoListLast":
            goToPage(todoLists.length-1, indexerElement, todoLists);;
            break;
        default:
            console.error("Paging failed on line 106!");
            throw new DOMException("Paging failed on line 106!", "NotImplementedException");
            break;
    }
}
let goToPage = (where, indexer, todos, option = true) => {
    where = parseInt(where);
    let len = todos.length;
    if ((todos.length < 2 || where < 0 || where >= len) && option) return;
    indexer.innerHTML = where+1;
    for (var i = 0; i < len; i++) {
        if (i == where) todos[i].style.display = "block";
        else todos[i].style.display = "none";
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