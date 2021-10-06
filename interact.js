var activeVertex = [];
canvas.addEventListener("mousedown", function (ev) {
    // console.log(ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop)
    var clickedVertex = findVertex(ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop);
    // console.log(clickedVertex);
    if (clickedVertex.length > 0) {
        clickedVertex[5] = true;
        if (activeVertex.length == 0) {
            activeVertex = clickedVertex;
        }
        else if (activeVertex == clickedVertex) {
            clickedVertex[2] = !clickedVertex[2];
            activeVertex = [];
        }
        else {
            makeEdgeBetween(activeVertex, clickedVertex);
            activeVertex[5] = clickedVertex[5] = false;
            activeVertex = [];
        }
    }
    else {
        addVertex(ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop, false);
        totalNumberOfVertices++;
    }
    ctx.clearRect(0, 0, width, height);
    drawEdges(edges);
    drawVertices(vertices);
});
document.addEventListener("keydown", function (kev) {
    // console.log(kev.key)
    if (kev.key == " ") {
        if (num == 0)
            play();
        else
            pause();
    }
});
function findVertex(x, y) {
    for (var i = 0; i < vertices.length; i++) {
        var vertex = vertices[i];
        // console.log(vertex[0], vertex[1], x, y, defaultRadius);
        if (vertex[0] >= x - defaultRadius && vertex[0] <= x + defaultRadius && vertex[1] >= y - defaultRadius && vertex[1] <= y + defaultRadius)
            return vertex;
    }
    return [];
}
