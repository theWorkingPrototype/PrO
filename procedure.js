
var gravity = 9.8; // = 500 pixels/ second ^ 2  (approximating 50 pixels to 1 m)
// 10 is in m/s^2 very slow for 1000m(pixelss) so increasing it while maintaining relatable display
var dt = 1/10; // in seconds
var maxNumberOfEdgeUpdates = 30;
var totalMinimumAllowedLengthError = 1e-10;
var running = 0;
var canSlack = false;

function update(){
    if(running)window.requestAnimationFrame(update);
    ctx.clearRect(0, 0, width + 20, height + 20);
    updateFrame(vertices, edges);
    drawEdges(edges);
    drawVertices(vertices);
}

function play() {
    if (running != 0) {
        console.error("AlreadyPlaying");
        return;
    }
    running=1;
    window.requestAnimationFrame(update);
}
function pause() {
    if (running)
        running = 0;
}
var changes = 0;
function updateFrame(vertices, edges) {
    updateVertices(vertices);
    var i = 0;
    for (i = 0; i < maxNumberOfEdgeUpdates; i++) {
        changes = 0;
        updateEdges(edges);
        if (Math.abs(changes) <= totalMinimumAllowedLengthError)
            break;
    }
    if (i == maxNumberOfEdgeUpdates)
        console.log("PerformancePeak");
}
function updateVertices(vertices) {
    for (var i = 0; i < vertices.length; i++) {
        var vertex = vertices[i];
        if (!vertex.isFixed) {
            var newx = vertex.x, newy = vertex.y;
            newx += (vertex.x - vertex.prevX);
            newy += (vertex.y - vertex.prevY);
            newy += 0.5 * gravity * dt * dt;
            vertex.prevX = vertex.x;
            vertex.prevY = vertex.y;
            if (newx > 2 * Math.max(height, width) || newy > 2 * Math.max(height, width) || newx < -Math.max(height, width) || newy < -Math.max(height, width)) {
                deleteEdgeContaining(vertex);
                vertices.splice(i, 1);
                i--;
            }
            vertex.x = newx;
            vertex.y = newy;
        }
    }
}
function updateEdges(edges) {
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        var edgeCenterX = (edge.vertexA.x + edge.vertexB.x) / 2;
        var edgeCenterY = (edge.vertexA.y + edge.vertexB.y) / 2;
        var edgeDirX = edge.vertexA.x - edge.vertexB.x; // edgeDir is directional from B to A
        var edgeDirY = edge.vertexA.y - edge.vertexB.y; // so we add length/2 from mid to get A
        var N = Math.sqrt(edgeDirX * edgeDirX + edgeDirY * edgeDirY);
        var deltaL = N - edge.length;
        if (canSlack && deltaL < 0)
            continue;
        changes += deltaL;
        edgeDirX /= N; // if a vertex is fixed then u would think we are pushing all error to open vertex 
        edgeDirY /= N; // and yes we are but by doing this multiple times we fix that
        // we can add condition to check if only one of them is free but itll just slow down cause we have to do multiple times anyways
        if (!edge.vertexA.isFixed) {
            edge.vertexA.x = edgeCenterX + edgeDirX * edge.length / 2;
            edge.vertexA.y = edgeCenterY + edgeDirY * edge.length / 2;
        }
        if (!edge.vertexB.isFixed) {
            edge.vertexB.x = edgeCenterX - edgeDirX * edge.length / 2;
            edge.vertexB.y = edgeCenterY - edgeDirY * edge.length / 2;
        }
    }
}
