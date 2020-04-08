var sections;
var links;

window.onload = function () {

    sections = document.querySelectorAll("section");
    links = document.querySelectorAll("nav > a");

    initSources(links, "click", handleEvent);
}

var initSources = function (sources, event, handler) {
    for (var i = 0; i < sources.length; i++) {
        links[i].addEventListener(event, handler);
    }
}

var handleEvent = function (event) {

    var elementId = event.target.id;
    var index = elementId[elementId.length - 1];

    for (var i = 0; i < sections.length; i++) {
        if (i+1 == index) {
            sections[i].style.display = "inline-block";
            links[i].className = "active";
        }
        else {
            sections[i].style.display = "none";
            links[i].className = "passive";
        }
    }
}