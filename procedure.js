var frameRate = 30;
var gravity = 10;
var verticesPrevFrame = [];
var dt = 1 / frameRate; // in seconds
var numberOfEdgeUpdates = 7500;
var num = 0;
function play() {
    if (num != 0) {
        console.error("AlreadyPlaying");
        return;
    }
    num = setInterval(function () {
        ctx.clearRect(0, 0, width + 20, height + 20);
        drawEdges(edges);
        drawVertices(vertices);
        updateFrame(vertices, edges);
    }, 1);
    // }, 1000 / frameRate);
}
function pause() {
    clearInterval(num);
    num = 0;
}
function updateFrame(vertices, edges) {
    updateVertices(vertices);
    var k = numberOfEdgeUpdates;
    for (var i = 0; i < k; i++) {
        updateEdges(edges);
    }
}
function updateVertices(vertices) {
    for (var i = 0; i < vertices.length; i++) {
        var vertex = vertices[i];
        if (!isFixed(vertex)) {
            // console.log(vertex);
            var newx = vertex[0], newy = vertex[1];
            newx += (vertex[0] - vertex[3]);
            newy += (vertex[1] - vertex[4]);
            newy += gravity * dt * dt;
            vertex[3] = vertex[0];
            vertex[4] = vertex[1];
            if (newx > 2 * width || newy > 2 * height || newx < -width || newy < -height) {
                deleteEdgeContaining(vertex);
                vertices.splice(i, 1);
                i--;
            }
            vertex[0] = newx;
            vertex[1] = newy;
            // console.log(vertex);
        }
    }
}
function updateEdges(edges) {
    edges.forEach(function (edge) {
        var edgeCenterX, edgeCenterY;
        var edgeDirX, edgeDirY;
        var edgeLength = edge[2];
        edgeCenterX = (edge[0][0] + edge[1][0]) / 2;
        edgeCenterY = (edge[0][1] + edge[1][1]) / 2;
        edgeDirX = edge[0][0] - edge[1][0];
        edgeDirY = edge[0][1] - edge[1][1];
        var N = edgeDirX * edgeDirX + edgeDirY * edgeDirY;
        N = Math.sqrt(N);
        edgeDirX /= N;
        edgeDirY /= N;
        if (edge[0][2] == 0) {
            edge[0][0] = edgeCenterX + edgeDirX * edgeLength / 2;
            edge[0][1] = edgeCenterY + edgeDirY * edgeLength / 2;
        }
        if (edge[1][2] == 0) {
            edge[1][0] = edgeCenterX - edgeDirX * edgeLength / 2;
            edge[1][1] = edgeCenterY - edgeDirY * edgeLength / 2;
        }
    });
}
