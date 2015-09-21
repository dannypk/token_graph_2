/**
 * Created by daniel.pacurici on 21.09.2015.
 */
module.exports = {
    setStart: setStart,
    canMove: canMove,
    move: move,
    play: play
};

function setStart(graph, startingVertex) {
    graph.currentNode = startingVertex;
    graph.visited.push(startingVertex);
}

function canMove(graph) {
    var hasAvailablePath = graph.nodes[graph.currentNode].filter(function (node) {
        return graph.visited.indexOf(node) < 0;
    });
    return hasAvailablePath.length > 0;
}

function move(graph, nextVertex) {
    if (canMove(graph, nextVertex)) {
        graph.currentNode = nextVertex;
        graph.visited.push(nextVertex);
        graph.isWinning = !graph.isWinning;
    }
}

function play(){
    return [1,2,3];
}
/*
function play(graph, path, nextVertex) {
    path = path || [];
    var currentNode = nextVertex || graph.currentNode;
    while (canMove(graph)) {
        for (var neighbour in graph.nodes[graph.currentNode]) {
            path.push(graph.currentNode);
            play(graph, path, neighbour);
        }
    }
    if(graph.isWinning)   return path;
    else return false;
}*/