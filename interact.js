var activeVertex;
var windVelocityX = 0;
var windVelocityY = 0;
canvas.addEventListener("mousedown", function (ev) {
    // console.log(ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop)
    var clickedVertex = findVertex(ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop);
    // console.log(clickedVertex);
    if (clickedVertex) {
        clickedVertex.isSelected = true;
        if (!activeVertex) {
            activeVertex = clickedVertex;
        }
        else if (activeVertex == clickedVertex) {
            clickedVertex.isFixed = !clickedVertex.isFixed;
            activeVertex = null;
        }
        else {
            makeEdgeBetween(activeVertex, clickedVertex);
            activeVertex.isSelected = clickedVertex.isSelected = false;
            activeVertex = null;
        }
    }
    else {
        if (activeVertex) {
            activeVertex.isSelected = false;
            activeVertex = null;
        }
        addVertex(ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop);
    }
    ctx.clearRect(0, 0, width, height);
    drawEdges(edges);
    drawVertices(vertices);
    maxNumberOfEdgeUpdates = 50 * edges.length + 1;
    if (maxNumberOfEdgeUpdates > 1000)
        maxNumberOfEdgeUpdates = 1000;
});
document.addEventListener("keydown", function (kev) {
    // console.log(kev.key)
    if (kev.key == " ") {
        btnClick();
    }
});
var btn = document.getElementsByClassName("btn")[0];
function btnClick() {
    if (running) {
        pause();
        btn.classList.remove("pausebtn");
        btn.classList.add("playbtn");
        btn.innerHTML = "<i class=\"fa fa-play\"></i>";
    }
    else {
        play();
        btn.classList.remove("playbtn");
        btn.classList.add("pausebtn");
        btn.innerHTML = "<i class=\"fa fa-pause\"></i>";
    }
}
