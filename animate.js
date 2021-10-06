// let t0 = performance.now();
var canvas = document.getElementsByTagName("canvas")[0];
// document.body.appendChild(canvas);
var width = innerWidth - 20;
var height = innerHeight - 30;
var ctx = canvas.getContext("2d");
// class vertex{
//     x: number;
//     y: number;
//     isFixed: boolean;
//     prevX: number;
//     prevY: number;
// }
// let a= new vertex();
ctx.fillStyle = "#51ff0d";
ctx.strokeStyle = "blue";
function changeNumberOfVertices() {
    //
}
var numberOfFixedVertices = 0;
var totalNumberOfVertices = 0;
// let numberOfVerticesPerLine = totalNumberOfVertices / numberOfFixedVertices==0?1:;
var vertices = [];
var edges = [];
//defaults
var defaultRadius = 10;
var defaultEdgeStrength = 1; // width and elasticity 1 for 10% of length can be stretched
var defaultWeightOfVertex = 1; // 1 what? apples?? door hinges per elon musk??
var minSeperation = 20; // for visibility
// addVertex(width / 2 - Math.random() + .5, height / 2, true);
// addVertex(width / 2, height / 3, false);
// addVertex(width / 2, 0, false);
// addVertex(4 * width / 6, height / 4, false);
// addVertex(5 * width / 6, height / 4, false);
(function start() {
    // let i = 0;
    // let leftOffset = 200;
    // let topOffset = 50;
    // let seperationX = (width - 2 * leftOffset) / (numberOfFixedVertices - 1);
    // if (seperationX < 20) seperationX = minSeperation;
    // let seperationY = (height - topOffset) / (totalNumberOfVertices / numberOfFixedVertices);
    // if (seperationY < 20) seperationY = minSeperation;
    // for (i = 0; i < numberOfFixedVertices; i++) {
    //     let j = 0;
    //     addVertex(leftOffset + i * seperationX, topOffset + j * seperationY, true);
    //     for (j = 0; j < totalNumberOfVertices / numberOfFixedVertices; j++) {
    //         addVertex(leftOffset + i * seperationX, topOffset + j * seperationY);
    //         if (height < topOffset + j * seperationY) height = topOffset + j * seperationY;
    //     }
    // }
    width += 20;
    height += 20;
    canvas.width = width;
    canvas.height = height;
})();
// generateEdges(vertices);
drawEdges(edges);
drawVertices(vertices);
function addVertex(x, y, fixed) {
    if (fixed === void 0) { fixed = false; }
    vertices.push([x, y, fixed, x, y, false]);
}
function drawVertex(x, y, radius) {
    if (radius === void 0) { radius = defaultRadius; }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}
function isFixed(vertex) {
    return vertex[2] == 1;
}
function drawVertices(vertices) {
    ctx.strokeStyle = "#AAAAAA";
    ctx.lineWidth = 2;
    var i = 0;
    for (i = 0; i < vertices.length; i++) {
        ctx.fillStyle = "#c8362e";
        if (vertices[i][5] == true)
            ctx.fillStyle = "#FF885e";
        if (vertices[i][2] == true)
            ctx.fillStyle = "gray";
        drawVertex(vertices[i][0], vertices[i][1]);
    }
}
// function generateEdges(vertices: Array<any>) {
//     let prevVertices = [];
//     for (let i = 0; i < numberOfFixedVertices; i++) {
//         prevVertices.shift();
//         prevVertices.push(vertices[i * numberOfVerticesPerLine]);
//         for (let j = 1; j < numberOfVerticesPerLine; j++) {
//             let currentVertex = vertices[i * numberOfVerticesPerLine + j];
//             if (prevVertices.length >= numberOfVerticesPerLine) {
//                 makeEdgeBetween(prevVertices.shift(), currentVertex);
//             }
//             makeEdgeBetween(prevVertices[prevVertices.length - 1], currentVertex);
//             prevVertices.push(currentVertex);
//         }
//     }
// }
function makeEdgeBetween(vertexA, vertexB, edgeStrength) {
    if (edgeStrength === void 0) { edgeStrength = defaultEdgeStrength; }
    var edgeLength = (vertexA[0] - vertexB[0]) * (vertexA[0] - vertexB[0]);
    edgeLength += (vertexA[1] - vertexB[1]) * (vertexA[1] - vertexB[1]);
    edgeLength = Math.sqrt(edgeLength);
    edges.push([vertexA, vertexB, edgeLength]);
}
function drawEdges(edges) {
    ctx.fillStyle = "#ACD3DE";
    ctx.strokeStyle = "#ACD3DE";
    ctx.lineWidth = 3;
    for (var i = 0; i < edges.length; i++) {
        ctx.beginPath();
        ctx.moveTo(edges[i][1][0], edges[i][1][1]);
        ctx.lineTo(edges[i][0][0], edges[i][0][1]);
        ctx.stroke();
    }
}
function deleteEdgeContaining(vertex) {
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        if (edge[0] == vertex || edge[1] == vertex) {
            edges.splice(i, 1);
            i--;
        }
    }
}
console.log("    ^~^");
console.log("  oRaNge");
// console.log(performance.now() - t0);
