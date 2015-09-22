/**
 * Created by daniel.pacurici on 21.09.2015.
 */
module.exports = {
    setStart: setStart,
    canMove: canMove,
    move: move,
    play: play,
    goBack: goBack
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

function goBack(path) {
    path.pop();
    return path;
}

function getPath(graph, currentNodes, currentVertex) {
    return graph.nodes[currentVertex].filter(function (node) {
        return currentNodes.indexOf(node) < 0;
    });
}

function play(graph, currentNodes, nextVertex) {
    currentNodes = currentNodes || [];
    currentVertex = nextVertex || graph.currentNode;
    currentNodes.push(currentVertex);

    var paths = getPath(graph, currentNodes, currentVertex);

    if (paths.length > 0) {
        for (var path in paths) {
            play(graph, currentNodes, paths[path]);
        }
    }

    var winning = currentNodes.slice();
    var previousNode = currentNodes.pop();
    var isEnd = getPath(graph, winning, previousNode);
    if (!isEnd.length > 0 && winning.length % 2 === 1)
        console.log(winning);
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

/*
 function play(graph, currentNodes, nextVertex) {
 currentNodes = currentNodes || [];
 currentVertex = nextVertex || graph.currentNode;
 currentNodes.push(currentVertex);

 var paths = canMove(graph);

 if (paths.length > 0) {
 for (var path in paths) {
 if (currentNodes.indexOf(paths[path]) === -1)
 play(graph, currentNodes, paths[path]);
 }
 }

 console.log(currentNodes);
 return currentNodes;
 }
 */